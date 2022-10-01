import { OsmosisRoute, SignerMessage, Token } from "@/types"
import {
	Coin,
	coins,
	OfflineDirectSigner,
	OfflineSigner,
	Registry,
} from "@cosmjs/proto-signing"
import { BigNumber } from "bignumber.js"
import {
	SendIbcTokens,
	LockTokens,
	BeginUnlocking,
	JoinPool,
	JoinSwapExternAmountIn,
	ExitPool,
	SwapExactAmountIn,
	MerkledropClaim,
} from "./messages"
import {
	AminoTypes,
	assertIsDeliverTxSuccess,
	createIbcAminoConverters,
	defaultRegistryTypes,
	SigningStargateClient,
} from "@cosmjs/stargate"
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx"
import { osmosis } from "osmojs"
import { bitsongRegistry } from "./registry"
import { createBitsongAminoConverters } from "./amino-types"
import SignerEventEmitter from "./events"

export class TransactionManager extends SignerEventEmitter {
	signer: OfflineSigner | OfflineDirectSigner
	network: Token

	constructor(signer: OfflineSigner | OfflineDirectSigner, network: Token) {
		super()
		this.signer = signer
		this.network = network
	}

	private getNetworkFee = (transactionType: string) => {
		const fees = this.network.fees

		if (transactionType) {
			const fee = fees[transactionType]

			if (fee) {
				return fee
			}
		}

		return fees.default
	}

	private getCoinLookup = (
		denom: string,
		coinLookupDenomType = "chainDenom"
	) => {
		return this.network.coinLookup.find(
			(coin) => coin[coinLookupDenomType] === denom
		)
	}

	private getFees = (transactionType: string) => {
		const { gasEstimate, feeOptions } = this.getNetworkFee(transactionType)
		const fee = feeOptions.find(({ denom }) => denom === this.network.symbol)

		if (fee) {
			const coinLookup = this.getCoinLookup(fee.denom, "viewDenom")

			if (coinLookup) {
				// converting view fee to on chain fee
				const convertedFee = [
					{
						amount: new BigNumber(fee.amount)
							.div(coinLookup.chainToViewConversionFactor)
							.toString(),
						denom: coinLookup.chainDenom,
					},
				]

				return {
					gasEstimate: String(gasEstimate),
					fee: convertedFee,
				}
			}
		}
	}

	public sendIbcTokens(
		senderAddress: string,
		recipientAddress: string,
		transferAmount: Coin,
		sourceChannel: string,
		memo?: string
	) {
		const timeoutTimestamp = Math.floor(new Date().getTime() / 1000) + 600

		const message = SendIbcTokens(
			senderAddress,
			recipientAddress,
			transferAmount,
			"transfer",
			sourceChannel,
			undefined,
			timeoutTimestamp
		)

		return this.createSignBroadcast(
			"SendIbcTokens",
			[message],
			senderAddress,
			memo ?? ""
		)
	}

	public merkledropClaim(
		senderAddress: string, // Owner
		merkledropId: number,
		index: number,
		amount: string,
		proofs: string[],
		memo?: string
	) {
		const message = MerkledropClaim(
			senderAddress,
			merkledropId,
			index,
			amount,
			proofs
		)

		return this.createSignBroadcast(
			"MerkledropClaim",
			[message],
			senderAddress,
			memo ?? ""
		)
	}

	public lockTokens(
		senderAddress: string,
		duration: number,
		coins: Coin[],
		memo?: string
	) {
		const message = LockTokens(senderAddress, duration, coins)

		return this.createSignBroadcast(
			"LockTokens",
			[message],
			senderAddress,
			memo ?? ""
		)
	}

	public joinPool(
		senderAddress: string,
		poolId: string,
		shareOutAmount: string,
		tokenInMaxs: Coin[],
		memo?: string
	) {
		const message = JoinPool(senderAddress, poolId, shareOutAmount, tokenInMaxs)

		return this.createSignBroadcast(
			"JoinPool",
			[message],
			senderAddress,
			memo ?? ""
		)
	}

	public joinSwapExternAmountIn(
		senderAddress: string,
		poolId: string,
		tokenIn: Coin,
		shareOutMinAmount: string,
		memo?: string
	) {
		const message = JoinSwapExternAmountIn(
			senderAddress,
			poolId,
			tokenIn,
			shareOutMinAmount
		)

		return this.createSignBroadcast(
			"JoinSwapExternAmountIn",
			[message],
			senderAddress,
			memo ?? ""
		)
	}

	public exitPool(
		senderAddress: string,
		poolId: string,
		shareInAmount: string,
		tokenOutMins: Coin[],
		memo?: string
	) {
		const message = ExitPool(senderAddress, poolId, shareInAmount, tokenOutMins)

		return this.createSignBroadcast(
			"ExitPool",
			[message],
			senderAddress,
			memo ?? ""
		)
	}

	public swapExactAmountIn(
		senderAddress: string, // Owner
		routes: OsmosisRoute[],
		tokenIn: Coin,
		tokenOutMinAmount: string,
		memo?: string
	) {
		const message = SwapExactAmountIn(
			senderAddress,
			routes,
			tokenIn,
			tokenOutMinAmount
		)

		return this.createSignBroadcast(
			"SwapExactAmountIn",
			[message],
			senderAddress,
			memo ?? ""
		)
	}

	public beginUnlocking(senderAddress: string, id: string, memo?: string) {
		const message = BeginUnlocking(senderAddress, id)

		return this.createSignBroadcast(
			"BeginUnlocking",
			[message],
			senderAddress,
			memo ?? ""
		)
	}

	public createSignBroadcast = async (
		messageType: string,
		messages: SignerMessage<any>[],
		senderAddress: string,
		memo: string
	) => {
		try {
			const feeData = this.getFees(messageType)

			const transactionData = {
				...feeData,
				memo,
				chainId: this.network.chainID,
			}

			const stdFee = {
				amount: coins(
					Number(transactionData.fee ? transactionData.fee[0].amount : 0),
					transactionData.fee ? transactionData.fee[0].denom : this.network.symbol
				),
				gas: transactionData.gasEstimate || "350000",
			}

			const registry = bitsongRegistry()

			osmosis.gamm.v1beta1.load(registry)
			osmosis.lockup.load(registry)

			const aminoTypes = new AminoTypes({
				...createIbcAminoConverters(),
				...createBitsongAminoConverters(),
				...osmosis.gamm.v1beta1.AminoConverter,
				...osmosis.lockup.AminoConverter,
			})

			const client = await SigningStargateClient.connectWithSigner(
				this.network.rpcURL,
				this.signer,
				{
					registry,
					aminoTypes,
				}
			)

			this.emit("onsignerconnected", client)

			const raw = await client.sign(senderAddress, messages, stdFee, memo || "")

			this.emit("ontxsigned", raw)

			const txResult = await client.broadcastTx(
				Uint8Array.from(TxRaw.encode(raw).finish())
			)

			assertIsDeliverTxSuccess(txResult)

			this.emit("ontxbroadcasted", txResult)

			return txResult
		} catch (error) {
			this.emit("onerror", error)
			throw error
		}
	}
}
