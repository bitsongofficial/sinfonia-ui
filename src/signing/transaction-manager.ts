import { OsmosisRoute, SignerMessage, Token } from "@/types"
import {
	Coin,
	coins,
	OfflineDirectSigner,
	OfflineSigner,
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
} from "./messages"
import {
	assertIsDeliverTxSuccess,
	SigningStargateClient,
} from "@cosmjs/stargate"
import { osmosisRegistry } from "./registry"
import { notifyLoading } from "@/common"
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx"

export class TransactionManager {
	signer: OfflineSigner | OfflineDirectSigner
	network: Token

	constructor(signer: OfflineSigner | OfflineDirectSigner, network: Token) {
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

		const client = await SigningStargateClient.connectWithSigner(
			this.network.rpcURL,
			this.signer,
			{
				registry: osmosisRegistry(),
			}
		)

		const raw = await client.sign(senderAddress, messages, stdFee, memo || "")

		notifyLoading(
			"Transaction Broadcasting",
			"Waiting for transaction to be included in the block"
		)

		const txResult = await client.broadcastTx(
			Uint8Array.from(TxRaw.encode(raw).finish())
		)

		assertIsDeliverTxSuccess(txResult)

		return txResult
	}
}
