import { ChainData } from "./../types/chain"
import HttpClient from "./http-client"
import { ChainError, ChainPaginationResponse } from "@/types"
import { Coin } from "@cosmjs/proto-signing"
import { AxiosError } from "axios"
import { DeliverTxResponse } from "@cosmjs/stargate"
import { BlockResponse } from "@cosmjs/launchpad"

export default class ChainClient extends HttpClient {
	public constructor(url: string) {
		super(url)
	}

	protected _handleError = (error: AxiosError<ChainError>) =>
		Promise.reject(error)

	public bankBalances = (address: string) =>
		this.instance.get<ChainPaginationResponse<"balances", Coin[]>>(
			`cosmos/bank/v1beta1/balances/${address}`
		)

	public tx = async (txHash: string): Promise<Partial<DeliverTxResponse>> => {
		try {
			const response = await this.instance.get<{ tx_response: { txhash: string } }>(`cosmos/tx/v1beta1/txs/${txHash}`)

			if (response.status === 200) {
				return {
					transactionHash: response.data.tx_response.txhash,
					code: 200,
				}
			}
		} catch (error) {
			return {
				transactionHash: txHash,
				code: 404,
			}
		}

		return {
			transactionHash: txHash,
			code: 404,
		}
	}

	public supplyByDenom = (denom: string) =>
		this.instance.get<ChainData<"amount", Coin>>(
			`cosmos/bank/v1beta1/supply/by_denom?denom=${denom}`
		)

	public blocks = (block?: string) =>
		this.instance.get<BlockResponse>(`cosmos/base/tendermint/v1beta1/blocks/${block ? block : "latest"}`)
}
