import { DeliverTxResponse } from "@cosmjs/stargate"
import { Token } from "./config"

export enum TransactionStatus {
	PENDING = "pending",
	SUCCESS = "success",
	FAILED = "failed",
}

export interface Transaction {
	tx: DeliverTxResponse
	from: Token
	status: TransactionStatus
}
