import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx"
import { Height } from "cosmjs-types/ibc/core/client/v1/client"
import { OsmosisRoute, SignerMessage } from "@/types"
import { Coin } from "@cosmjs/proto-signing"
import { osmosis } from "./proto"
import Long from "long"

export type messageTimestamp = string | number | Long.Long | undefined

export const SendIbcTokens = (
	senderAddress: string,
	recipientAddress: string,
	transferAmount: Coin,
	sourcePort: string,
	sourceChannel: string,
	timeoutHeight?: Height,
	timeoutTimestamp?: number
): SignerMessage<MsgTransfer> => {
	const timeoutTimestampNanoseconds: messageTimestamp = timeoutTimestamp
		? Long.fromNumber(timeoutTimestamp).multiply(1_000_000_000)
		: undefined

	return {
		typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
		value: MsgTransfer.fromPartial({
			sourcePort: sourcePort,
			sourceChannel: sourceChannel,
			sender: senderAddress,
			receiver: recipientAddress,
			token: transferAmount,
			timeoutTimestamp: timeoutTimestampNanoseconds,
		}),
	}
}

export const LockTokens = (
	senderAddress: string, // Owner
	duration: number, // Duration's unit is expected to be the second.
	coins: Coin[]
): SignerMessage<any> => {
	const msgDuration = (duration * 1_000_000_000).toString()

	return {
		typeUrl: "/osmosis.lockup.MsgLockTokens",
		value: {
			owner: senderAddress,
			duration: {
				seconds: Long.fromNumber(Math.floor(parseInt(msgDuration) / 1_000_000_000)),
				nanos: parseInt(msgDuration) % 1_000_000_000,
			},
			coins,
		},
	}
}

export const BeginUnlocking = (
	senderAddress: string, // Owner
	id: string
): SignerMessage<any> => {
	return {
		typeUrl: "/osmosis.lockup.MsgBeginUnlocking",
		value: {
			owner: senderAddress,
			ID: Long.fromString(id),
		},
	}
}

export const JoinPool = (
	senderAddress: string, // Owner
	poolId: string,
	shareOutAmount: string,
	tokenInMaxs: Coin[]
): SignerMessage<any> => {
	return {
		typeUrl: "/osmosis.gamm.v1beta1.MsgJoinPool",
		value: osmosis.gamm.v1beta1.MsgJoinPool.fromObject({
			sender: senderAddress,
			poolId: Long.fromString(poolId),
			shareOutAmount,
			tokenInMaxs,
		}),
	}
}

export const JoinSwapExternAmountIn = (
	senderAddress: string, // Owner
	poolId: string,
	tokenIn: Coin,
	shareOutMinAmount: string
): SignerMessage<any> => {
	return {
		typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn",
		value: osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn.fromObject({
			sender: senderAddress,
			poolId: Long.fromString(poolId),
			tokenIn,
			shareOutMinAmount,
		}),
	}
}

export const ExitPool = (
	senderAddress: string, // Owner
	poolId: string,
	shareInAmount: string,
	tokenOutMins: Coin[]
): SignerMessage<any> => {
	return {
		typeUrl: "/osmosis.gamm.v1beta1.MsgExitPool",
		value: {
			sender: senderAddress,
			poolId: Long.fromString(poolId),
			shareInAmount,
			tokenOutMins,
		},
	}
}

export const SwapExactAmountIn = (
	senderAddress: string, // Owner
	routes: OsmosisRoute[],
	tokenIn: Coin,
	tokenOutMinAmount: string
): SignerMessage<any> => {
	return {
		typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
		value: {
			sender: senderAddress,
			routes: routes.map((route) => ({
				...route,
				poolId: Long.fromString(route.poolId),
			})),
			tokenIn,
			tokenOutMinAmount,
		},
	}
}
