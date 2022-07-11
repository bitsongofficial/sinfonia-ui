import { AminoConverters } from "@cosmjs/stargate"
import { Coin } from "@cosmjs/proto-signing"
import Long from "long"
import { OsmosisPool } from "@/types"

export interface AminoMsgMerkleDropClaim {
	readonly type: "go-bitsong/merkledrop/MsgClaim"
	readonly value: {
		sender: string // Owner
		merkledropId: number
		index: number
		amount: string
		proofs: string[]
	}
}

export interface MsgMerkleDropClaim {
	sender: string // Owner
	merkledropId: Long
	index: Long
	amount: string
	proofs: string[]
}

export interface AminoMsgSwapExactAmountIn {
	readonly type: "osmosis/gamm/swap-exact-amount-in"
	readonly value: {
		sender: string // Owner
		routes: OsmosisPool[]
		tokenIn: Coin
		tokenOutMinAmount: string
	}
}

export interface OsmosisMsgPool {
	poolId: Long
	tokenOutDenom: string
}

export interface MsgSwapExactAmountIn {
	sender: string // Owner
	routes: OsmosisMsgPool[]
	tokenIn: Coin
	tokenOutMinAmount: string
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

export interface AminoMsgJoinPool {
	readonly type: "osmosis/gamm/join-pool"
	readonly value: MsgJoinPool
}

export interface MsgJoinPool {
	sender: string // Owner
	poolId: Long
	shareOutAmount: string
	tokenInMaxs: Coin[]
}

export interface AminoMsgJoinSwapExternAmountIn {
	readonly type: "osmosis/gamm/join-swap-extern-amount-in"
	readonly value: MsgJoinSwapExternAmountIn
}

export interface MsgJoinSwapExternAmountIn {
	sender: string // Owner
	poolId: Long
	shareOutMinAmount: string
	tokenIn: Coin
}

export interface AminoMsgBeginUnlocking {
	readonly type: "osmosis/lockup/begin-unlock-period-lock"
	readonly value: MsgBeginUnlocking
}

export interface MsgBeginUnlocking {
	owner: string
	ID: Long
}

export interface AminoMsgExitPool {
	readonly type: "osmosis/gamm/exit-pool"
	readonly value: MsgExitPool
}

export interface MsgExitPool {
	sender: string
	poolId: Long
	shareInAmount: string
	tokenOutMins: Coin[]
}

/* sender: string, // Owner
		merkledropId: number,
		index: number,
		amount: string,
		proofs: string[] */
export const createOsmosisAminoConverters = (): AminoConverters => {
	return {
		"/bitsong.merkledrop.v1beta1.MsgClaim": {
			aminoType: "go-bitsong/merkledrop/MsgClaim",
			toAmino: ({
				sender,
				merkledropId,
				index,
				amount,
				proofs,
			}: MsgMerkleDropClaim) => {
				return {
					sender,
					merkledropId: merkledropId.toString(),
					index: index.toString(),
					amount,
					proofs,
				}
			},
			fromAmino: ({
				sender,
				merkledropId,
				index,
				amount,
				proofs,
			}: AminoMsgMerkleDropClaim["value"]) => {
				return {
					sender,
					merkledropId,
					index,
					amount,
					proofs,
				}
			},
		},
		"/osmosis.gamm.v1beta1.MsgSwapExactAmountIn": {
			aminoType: "osmosis/gamm/swap-exact-amount-in",
			toAmino: ({
				sender,
				routes,
				tokenIn,
				tokenOutMinAmount,
			}: MsgSwapExactAmountIn) => {
				return {
					sender,
					routes: routes.map((el) => ({
						...el,
						poolId: el.poolId.toString(),
					})),
					tokenIn,
					tokenOutMinAmount,
				}
			},
			fromAmino: ({
				sender,
				routes,
				tokenIn,
				tokenOutMinAmount,
			}: AminoMsgSwapExactAmountIn["value"]) => ({
				sender,
				routes,
				tokenIn,
				tokenOutMinAmount,
			}),
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
		"/osmosis.gamm.v1beta1.MsgJoinPool": {
			aminoType: "osmosis/gamm/join-pool",
			toAmino: ({ sender, poolId, shareOutAmount, tokenInMaxs }: MsgJoinPool) => {
				return {
					sender,
					poolId: poolId.toString(),
					shareOutAmount,
					tokenInMaxs,
				}
			},
			fromAmino: ({
				sender,
				poolId,
				shareOutAmount,
				tokenInMaxs,
			}: AminoMsgJoinPool["value"]) => ({
				sender,
				poolId,
				shareOutAmount,
				tokenInMaxs,
			}),
		},
		"/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn": {
			aminoType: "osmosis/gamm/join-swap-extern-amount-in",
			toAmino: ({
				sender,
				poolId,
				shareOutMinAmount,
				tokenIn,
			}: MsgJoinSwapExternAmountIn) => {
				return {
					sender,
					poolId: poolId.toString(),
					shareOutMinAmount,
					tokenIn,
				}
			},
			fromAmino: ({
				sender,
				poolId,
				shareOutMinAmount,
				tokenIn,
			}: AminoMsgJoinSwapExternAmountIn["value"]) => ({
				sender,
				poolId,
				shareOutMinAmount,
				tokenIn,
			}),
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
		"/osmosis.gamm.v1beta1.MsgExitPool": {
			aminoType: "osmosis/gamm/exit-pool",
			toAmino: ({ sender, poolId, shareInAmount, tokenOutMins }: MsgExitPool) => {
				return {
					sender,
					poolId: poolId.toString(),
					shareInAmount,
					tokenOutMins,
				}
			},
			fromAmino: ({
				sender,
				poolId,
				shareInAmount,
				tokenOutMins,
			}: AminoMsgExitPool["value"]) => ({
				sender,
				poolId,
				shareInAmount,
				tokenOutMins,
			}),
		},
	}
}
