import { ChainData } from "./../types/chain"
import HttpClient from "./http-client"
import { ChainError, ChainPaginationResponse } from "@/types"
import { Coin } from "@cosmjs/proto-signing"
import { AxiosError } from "axios"
import { DeliverTxResponse } from "@cosmjs/stargate"

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
			const response = await this.instance.get<{ txhash: string }>(`txs/${txHash}`)

			if (response.status === 200) {
				return {
					transactionHash: response.data.txhash,
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
			`cosmos/bank/v1beta1/supply/${denom}`
		)
}
