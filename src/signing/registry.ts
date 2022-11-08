import { Registry, GeneratedType } from "@cosmjs/proto-signing"
import { defaultRegistryTypes } from "@cosmjs/stargate"
import { wasmTypes } from "@cosmjs/cosmwasm-stargate/build/modules"
import { MsgClaim } from "./codec/bitsong/merkledrop/v1beta1/tx"

export const bitsongRegistry = (): Registry => {
	return new Registry([
		...defaultRegistryTypes,
		...wasmTypes,
		["/bitsong.merkledrop.v1beta1.MsgClaim", MsgClaim as GeneratedType],
	])
}
