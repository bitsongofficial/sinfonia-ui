import {
	BitsongFantoken,
	BitsongMerkledrop,
	ChainPaginationResponse,
	ChainPaginationParams,
	ChainData,
	ChainResponse,
	CosmWasmCode,
	CosmWasmCodeDetails,
	CosmWasmContractInfo,
	CosmWasmContractState,
	CosmWasmContractHistory,
	CosmWasmContractSmartQuery,
} from "@/types"
import ChainClient from "./chain-client"

export default class BitsongClient extends ChainClient {
	public constructor(url: string) {
		super(url)
	}

	public cosmWasmCodes = () =>
		this.instance.get<ChainResponse<CosmWasmCode[]>>("wasm/code")

	public cosmWasmCode = (codeId: number) =>
		this.instance.get<ChainResponse<CosmWasmCodeDetails>>(`wasm/code/${codeId}`)

	public contracts = (codeId: number) =>
		this.instance.get<ChainResponse<string[] | null>>(
			`wasm/code/${codeId}/contracts`
		)

	public contractInfo = (address: string) =>
		this.instance.get<ChainResponse<CosmWasmContractInfo>>(
			`wasm/contract/${address}`
		)

	public contractState = (address: string) =>
		this.instance.get<ChainResponse<CosmWasmContractState[]>>(
			`wasm/contract/${address}/state`
		)

	public contractHistory = <T = any>(address: string) =>
		this.instance.get<ChainResponse<CosmWasmContractHistory<T>[]>>(
			`wasm/contract/${address}/history`
		)

	public contractSmartQuery = <T = any, K extends object = any>(
		address: string,
		query: K
	) => {
		const queryParam = btoa(JSON.stringify(query))

		return this.instance.get<ChainResponse<CosmWasmContractSmartQuery<T>>>(
			`cosmwasm/wasm/v1/contract/${address}/smart/${queryParam}`
		)
	}

	public fantokens = (params: ChainPaginationParams) =>
		this.instance.get<ChainPaginationResponse<"tokens", BitsongFantoken[]>>(
			"bitsong/fantoken/v1beta1/fantokens",
			{ params }
		)

	public merkledrop = (id: number) =>
		this.instance.get<ChainData<"merkledrop", BitsongMerkledrop>>(
			`bitsong/merkledrop/v1beta1/markledrops/${id}`
		)

	public merkledropClaimed = (id: number, index: number) =>
		this.instance.get<ChainData<"is_claimed", boolean>>(
			`/bitsong/merkledrop/v1beta1/markledrops/${id}/index_claimed/${index}`
		)
}
