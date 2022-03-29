import { Registry, GeneratedType } from "@cosmjs/proto-signing"
import { defaultRegistryTypes } from "@cosmjs/stargate"
import { osmosis } from "./proto"

export const osmosisRegistry = (): Registry => {
	return new Registry([
		...defaultRegistryTypes,
		[
			"/osmosis.lockup.MsgLockTokens",
			osmosis.lockup.MsgLockTokens as GeneratedType,
		],
		[
			"/osmosis.lockup.MsgBeginUnlocking",
			osmosis.lockup.MsgBeginUnlocking as GeneratedType,
		],
		[
			"/osmosis.gamm.v1beta1.MsgJoinPool",
			osmosis.gamm.v1beta1.MsgJoinPool as GeneratedType,
		],
		[
			"/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn",
			osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn as GeneratedType,
		],
		[
			"/osmosis.gamm.v1beta1.MsgExitPool",
			osmosis.gamm.v1beta1.MsgExitPool as GeneratedType,
		],
	])
}
