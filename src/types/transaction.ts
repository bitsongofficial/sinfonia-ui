import { DeliverTxResponse } from "@cosmjs/stargate"
import { Token } from "./config"

export enum TransactionStatus {
	BROADCASTING = "broadcasting",
	PENDING = "pending",
	SUCCESS = "success",
	FAILED = "failed",
}

export enum TransactionType {
	SEND_IBC_TOKENS = "sendIbcTokens",
	LOCK_TOKENS = "lockTokens",
	JOIN_POOL = "joinPool",
	JOIN_SWAP_EXTERN_AMOUNT_IN = "joinSwapExternAmountIn",
	EXIT_POOL = "exitPool",
	SWAP_EXACT_AMOUNT_IN = "swapExactAmountIn",
	BEGIN_UNLOCKING = "beginUnlocking",
	MERKLEDROP_CLAIM = "merkledropClaim",
}

export interface Transaction {
	id: string
	tx?: DeliverTxResponse
	from: Token
	time: number
	fromSwap?: Token
	fromAmount?: string
	toSwap?: Token
	toAmount?: string
	notify?: () => void
	status: TransactionStatus
	type: TransactionType
}
