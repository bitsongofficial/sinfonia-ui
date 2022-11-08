import { AminoConverters } from "@cosmjs/stargate"
import { AminoMsg } from "@cosmjs/amino"
import { MsgClaim } from "./codec/bitsong/merkledrop/v1beta1/tx"
import { Coin } from "@cosmjs/launchpad"
import Long from "long"

export interface AminoMsgClaim extends AminoMsg {
	type: "/bitsong.merkledrop.v1beta1.MsgClaim"
	value: {
		sender: string
		merkledrop_id: string
		index: string
		amount: string
		proofs: string[]
	}
}

export interface AminoMsgLockTokens {
	readonly type: "osmosis/lockup/lock-tokens"
	readonly value: {
		owner: string // Owner
		duration: string // Duration's unit is expected to be the second.
		coins: Coin[]
	}
}

export interface MsgLockTokens {
	owner: string // Owner
	duration: {
		seconds: Long
		nanos: number
	} // Duration's unit is expected to be the second.
	coins: Coin[]
}

export interface AminoMsgBeginUnlocking extends AminoMsg {
	type: "osmosis/lockup/begin-unlock-period-lock"
	value: {
		owner: string
		ID: string
		coins: {
			denom: string
			amount: string
		}[]
	}
}

export interface MsgBeginUnlocking {
	owner: string
	ID: Long
}

export const createBitsongAminoConverters = (): AminoConverters => {
	return {
		"/bitsong.merkledrop.v1beta1.MsgClaim": {
			aminoType: "go-bitsong/merkledrop/MsgClaim",
			toAmino: ({
				sender,
				merkledropId,
				index,
				amount,
				proofs,
			}: MsgClaim): AminoMsgClaim["value"] => {
				return {
					sender,
					merkledrop_id: merkledropId.toString(),
					index: index.toString(),
					amount,
					proofs,
				}
			},
			fromAmino: ({
				sender,
				merkledrop_id,
				index,
				amount,
				proofs,
			}: AminoMsgClaim["value"]): MsgClaim => {
				return {
					sender,
					merkledropId: Long.fromString(merkledrop_id),
					index: Long.fromString(index),
					amount,
					proofs,
				}
			},
		},
		"/osmosis.lockup.MsgLockTokens": {
			aminoType: "osmosis/lockup/lock-tokens",
			toAmino: ({ owner, duration, coins }: MsgLockTokens) => {
				return {
					owner,
					duration: (duration.seconds.toInt() * 1_000_000_000).toString(),
					coins,
				}
			},
			fromAmino: ({ owner, duration, coins }: AminoMsgLockTokens["value"]) => {
				const msgDuration = parseInt(duration)

				return {
					owner,
					duration: {
						seconds: Long.fromNumber(Math.floor(msgDuration / 1_000_000_000)),
						nanos: msgDuration % 1_000_000_000,
					},
					coins,
				}
			},
		},
		"/osmosis.lockup.MsgBeginUnlocking": {
			aminoType: "osmosis/lockup/begin-unlock-period-lock",
			toAmino: ({ owner, ID }: MsgBeginUnlocking) => {
				return {
					owner,
					ID: ID.toString(),
					coins: [],
				}
			},
			fromAmino: ({ owner, ID }: AminoMsgBeginUnlocking["value"]) => ({
				owner,
				ID,
				coins: [],
			}),
		},
	}
}
