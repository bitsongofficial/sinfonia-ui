import { MsgTransfer } from 'cosmjs-types/ibc/applications/transfer/v1/tx'
import { Height } from 'cosmjs-types/ibc/core/client/v1/client'
import { SignerMessage } from '@/types'
import { Coin } from '@cosmjs/proto-signing'
import Long from 'long'

export const SendIbcTokens = (
	senderAddress: string,
	recipientAddress: string,
	transferAmount: Coin,
	sourcePort: string,
	sourceChannel: string,
	timeoutHeight?: Height,
	timeoutTimestamp?: number,
): SignerMessage<MsgTransfer> => {
	const timeoutTimestampNanoseconds = timeoutTimestamp ? Long.fromNumber(timeoutTimestamp).multiply(1_000_000_000) : undefined

	return {
		typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
		value: MsgTransfer.fromPartial({
			sourcePort: sourcePort,
			sourceChannel: sourceChannel,
			sender: senderAddress,
			receiver: recipientAddress,
			token: transferAmount,
			timeoutHeight: timeoutHeight,
			timeoutTimestamp: timeoutTimestampNanoseconds,
		})
	}
}