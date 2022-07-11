export interface FaucetRequest {
	address: string
}

export enum FaucetTransferStatus {
	SUCCESS = "success",
	ERROR = "error",
}

export interface FaucetTransfer {
	coin: string
	status: FaucetTransferStatus
	error?: string
}

export interface FaucetResponse {
	status: string
	error?: string
}
