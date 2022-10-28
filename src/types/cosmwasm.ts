import { ContractCodeHistoryOperationType } from "cosmjs-types/cosmwasm/wasm/v1/types"

export interface CosmWasmCode {
	id: number
	creator: string
	data_hash: string
	instantiate_permission: Record<string, string>
}

export interface CosmWasmCodeDetails extends CosmWasmCode {
	data: string // Binary base64
}

export interface CosmWasmContractInfo {
	address: string
	code_id: number
	creator: string
	admin: string
	label: string
}

export interface CosmWasmContractState {
	key: string
	value: string
}

export interface CosmWasmContractHistory<T = any> {
	operation: ContractCodeHistoryOperationType
	code_id: number
	msg: T
}

export interface CosmWasmContractSmartQuery<T = any> {
	data: T
}
