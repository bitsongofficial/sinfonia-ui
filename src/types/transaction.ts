import { DeliverTxResponse } from "@cosmjs/stargate"

export enum TransactionStatus {
	PENDING = "pending",
	SUCCESS = "success",
	FAILED = "failed",
}

export interface Transaction {
	tx: DeliverTxResponse
	status: TransactionStatus
}
