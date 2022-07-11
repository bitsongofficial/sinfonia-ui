/* eslint-disable */
import Long from "long"
import _m0 from "protobufjs/minimal"
import { Coin } from "@/signing/codec/cosmos/coin"

export const protobufPackage = "bitsong.merkledrop.v1beta1"

export interface UpdateFeesProposal {
	title: string
	description: string
	creationFee?: Coin
}

export interface UpdateFeesProposalWithDeposit {
	title: string
	description: string
	creationFee: string
	deposit: string
}

function createBaseUpdateFeesProposal(): UpdateFeesProposal {
	return { title: "", description: "", creationFee: undefined }
}

export const UpdateFeesProposal = {
	encode(
		message: UpdateFeesProposal,
		writer: _m0.Writer = _m0.Writer.create()
	): _m0.Writer {
		if (message.title !== "") {
			writer.uint32(10).string(message.title)
		}
		if (message.description !== "") {
			writer.uint32(18).string(message.description)
		}
		if (message.creationFee !== undefined) {
			Coin.encode(message.creationFee, writer.uint32(26).fork()).ldelim()
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): UpdateFeesProposal {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseUpdateFeesProposal()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.title = reader.string()
					break
				case 2:
					message.description = reader.string()
					break
				case 3:
					message.creationFee = Coin.decode(reader, reader.uint32())
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): UpdateFeesProposal {
		return {
			title: isSet(object.title) ? String(object.title) : "",
			description: isSet(object.description) ? String(object.description) : "",
			creationFee: isSet(object.creationFee)
				? Coin.fromJSON(object.creationFee)
				: undefined,
		}
	},

	toJSON(message: UpdateFeesProposal): unknown {
		const obj: any = {}
		message.title !== undefined && (obj.title = message.title)
		message.description !== undefined && (obj.description = message.description)
		message.creationFee !== undefined &&
			(obj.creationFee = message.creationFee
				? Coin.toJSON(message.creationFee)
				: undefined)
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<UpdateFeesProposal>, I>>(
		object: I
	): UpdateFeesProposal {
		const message = createBaseUpdateFeesProposal()
		message.title = object.title ?? ""
		message.description = object.description ?? ""
		message.creationFee =
			object.creationFee !== undefined && object.creationFee !== null
				? Coin.fromPartial(object.creationFee)
				: undefined
		return message
	},
}

function createBaseUpdateFeesProposalWithDeposit(): UpdateFeesProposalWithDeposit {
	return { title: "", description: "", creationFee: "", deposit: "" }
}

export const UpdateFeesProposalWithDeposit = {
	encode(
		message: UpdateFeesProposalWithDeposit,
		writer: _m0.Writer = _m0.Writer.create()
	): _m0.Writer {
		if (message.title !== "") {
			writer.uint32(10).string(message.title)
		}
		if (message.description !== "") {
			writer.uint32(18).string(message.description)
		}
		if (message.creationFee !== "") {
			writer.uint32(26).string(message.creationFee)
		}
		if (message.deposit !== "") {
			writer.uint32(58).string(message.deposit)
		}
		return writer
	},

	decode(
		input: _m0.Reader | Uint8Array,
		length?: number
	): UpdateFeesProposalWithDeposit {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseUpdateFeesProposalWithDeposit()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.title = reader.string()
					break
				case 2:
					message.description = reader.string()
					break
				case 3:
					message.creationFee = reader.string()
					break
				case 7:
					message.deposit = reader.string()
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): UpdateFeesProposalWithDeposit {
		return {
			title: isSet(object.title) ? String(object.title) : "",
			description: isSet(object.description) ? String(object.description) : "",
			creationFee: isSet(object.creationFee) ? String(object.creationFee) : "",
			deposit: isSet(object.deposit) ? String(object.deposit) : "",
		}
	},

	toJSON(message: UpdateFeesProposalWithDeposit): unknown {
		const obj: any = {}
		message.title !== undefined && (obj.title = message.title)
		message.description !== undefined && (obj.description = message.description)
		message.creationFee !== undefined && (obj.creationFee = message.creationFee)
		message.deposit !== undefined && (obj.deposit = message.deposit)
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<UpdateFeesProposalWithDeposit>, I>>(
		object: I
	): UpdateFeesProposalWithDeposit {
		const message = createBaseUpdateFeesProposalWithDeposit()
		message.title = object.title ?? ""
		message.description = object.description ?? ""
		message.creationFee = object.creationFee ?? ""
		message.deposit = object.deposit ?? ""
		return message
	},
}

type Builtin =
	| Date
	| Function
	| Uint8Array
	| string
	| number
	| boolean
	| undefined

export type DeepPartial<T> = T extends Builtin
	? T
	: T extends Long
	? string | number | Long
	: T extends Array<infer U>
	? Array<DeepPartial<U>>
	: T extends ReadonlyArray<infer U>
	? ReadonlyArray<DeepPartial<U>>
	: T extends {}
	? { [K in keyof T]?: DeepPartial<T[K]> }
	: Partial<T>

type KeysOfUnion<T> = T extends T ? keyof T : never
export type Exact<P, I extends P> = P extends Builtin
	? P
	: P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
				Exclude<keyof I, KeysOfUnion<P>>,
				never
			>

if (_m0.util.Long !== Long) {
	_m0.util.Long = Long as any
	_m0.configure()
}

function isSet(value: any): boolean {
	return value !== null && value !== undefined
}
