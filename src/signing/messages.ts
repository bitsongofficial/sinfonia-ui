import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx"
import { Height } from "cosmjs-types/ibc/core/client/v1/client"
import { SignerMessage } from "@/types"
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
        seconds: Long.fromNumber(
          Math.floor(parseInt(msgDuration) / 1_000_000_000)
        ),
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
  console.log(
    senderAddress,
    id,
    osmosis.lockup.MsgBeginUnlocking.encode({
      owner: senderAddress,
      ID: Long.fromString(id),
    }).finish()
  )

  return {
    typeUrl: "/osmosis.lockup.MsgBeginUnlocking",
    value: {
      owner: senderAddress,
      ID: Long.fromString(id),
    },
  }
}
