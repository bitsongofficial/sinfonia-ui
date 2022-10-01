import { AminoConverters } from "@cosmjs/stargate"
import { AminoMsg } from "@cosmjs/amino"
import { MsgClaim } from "./codec/bitsong/merkledrop/v1beta1/tx"
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
	}
}
