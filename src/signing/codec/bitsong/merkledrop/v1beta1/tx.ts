/* eslint-disable */
import Long from "long"
import _m0 from "protobufjs/minimal"
import { Coin } from "@/signing/codec/cosmos/coin"

export const protobufPackage = "bitsong.merkledrop.v1beta1"

export interface MsgCreate {
	/** owner of the merkledrop */
	owner: string
	/** merkle_root used to compute proofs */
	merkleRoot: string
	/** merkledrop start height */
	startHeight: Long
	/** merkledrop end height */
	endHeight: Long
	/** coins to distribute */
	coin?: Coin
}

export interface MsgCreateResponse {
	owner: string
	id: Long
}

export interface MsgClaim {
	sender: string
	merkledropId: Long
	index: Long
	amount: string
	proofs: string[]
}

export interface MsgClaimResponse {
	id: Long
	index: Long
	amount: string
}

function createBaseMsgCreate(): MsgCreate {
	return {
		owner: "",
		merkleRoot: "",
		startHeight: Long.ZERO,
		endHeight: Long.ZERO,
		coin: undefined,
	}
}

export const MsgCreate = {
	encode(
		message: MsgCreate,
		writer: _m0.Writer = _m0.Writer.create()
	): _m0.Writer {
		if (message.owner !== "") {
			writer.uint32(10).string(message.owner)
		}
		if (message.merkleRoot !== "") {
			writer.uint32(18).string(message.merkleRoot)
		}
		if (!message.startHeight.isZero()) {
			writer.uint32(24).int64(message.startHeight)
		}
		if (!message.endHeight.isZero()) {
			writer.uint32(32).int64(message.endHeight)
		}
		if (message.coin !== undefined) {
			Coin.encode(message.coin, writer.uint32(42).fork()).ldelim()
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreate {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgCreate()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.owner = reader.string()
					break
				case 2:
					message.merkleRoot = reader.string()
					break
				case 3:
					message.startHeight = reader.int64() as Long
					break
				case 4:
					message.endHeight = reader.int64() as Long
					break
				case 5:
					message.coin = Coin.decode(reader, reader.uint32())
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): MsgCreate {
		return {
			owner: isSet(object.owner) ? String(object.owner) : "",
			merkleRoot: isSet(object.merkleRoot) ? String(object.merkleRoot) : "",
			startHeight: isSet(object.startHeight)
				? Long.fromString(object.startHeight)
				: Long.ZERO,
			endHeight: isSet(object.endHeight)
				? Long.fromString(object.endHeight)
				: Long.ZERO,
			coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
		}
	},

	toJSON(message: MsgCreate): unknown {
		const obj: any = {}
		message.owner !== undefined && (obj.owner = message.owner)
		message.merkleRoot !== undefined && (obj.merkleRoot = message.merkleRoot)
		message.startHeight !== undefined &&
			(obj.startHeight = (message.startHeight || Long.ZERO).toString())
		message.endHeight !== undefined &&
			(obj.endHeight = (message.endHeight || Long.ZERO).toString())
		message.coin !== undefined &&
			(obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined)
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgCreate>, I>>(object: I): MsgCreate {
		const message = createBaseMsgCreate()
		message.owner = object.owner ?? ""
		message.merkleRoot = object.merkleRoot ?? ""
		message.startHeight =
			object.startHeight !== undefined && object.startHeight !== null
				? Long.fromValue(object.startHeight)
				: Long.ZERO
		message.endHeight =
			object.endHeight !== undefined && object.endHeight !== null
				? Long.fromValue(object.endHeight)
				: Long.ZERO
		message.coin =
			object.coin !== undefined && object.coin !== null
				? Coin.fromPartial(object.coin)
				: undefined
		return message
	},
}

function createBaseMsgCreateResponse(): MsgCreateResponse {
	return { owner: "", id: Long.UZERO }
}

export const MsgCreateResponse = {
	encode(
		message: MsgCreateResponse,
		writer: _m0.Writer = _m0.Writer.create()
	): _m0.Writer {
		if (message.owner !== "") {
			writer.uint32(10).string(message.owner)
		}
		if (!message.id.isZero()) {
			writer.uint32(16).uint64(message.id)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgCreateResponse()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.owner = reader.string()
					break
				case 2:
					message.id = reader.uint64() as Long
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): MsgCreateResponse {
		return {
			owner: isSet(object.owner) ? String(object.owner) : "",
			id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
		}
	},

	toJSON(message: MsgCreateResponse): unknown {
		const obj: any = {}
		message.owner !== undefined && (obj.owner = message.owner)
		message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString())
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgCreateResponse>, I>>(
		object: I
	): MsgCreateResponse {
		const message = createBaseMsgCreateResponse()
		message.owner = object.owner ?? ""
		message.id =
			object.id !== undefined && object.id !== null
				? Long.fromValue(object.id)
				: Long.UZERO
		return message
	},
}

function createBaseMsgClaim(): MsgClaim {
	return {
		sender: "",
		merkledropId: Long.UZERO,
		index: Long.UZERO,
		amount: "",
		proofs: [],
	}
}

export const MsgClaim = {
	encode(
		message: MsgClaim,
		writer: _m0.Writer = _m0.Writer.create()
	): _m0.Writer {
		if (message.sender !== "") {
			writer.uint32(10).string(message.sender)
		}
		if (!message.merkledropId.isZero()) {
			writer.uint32(16).uint64(message.merkledropId)
		}
		if (!message.index.isZero()) {
			writer.uint32(24).uint64(message.index)
		}
		if (message.amount !== "") {
			writer.uint32(34).string(message.amount)
		}
		for (const v of message.proofs) {
			writer.uint32(42).string(v!)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaim {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgClaim()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.sender = reader.string()
					break
				case 2:
					message.merkledropId = reader.uint64() as Long
					break
				case 3:
					message.index = reader.uint64() as Long
					break
				case 4:
					message.amount = reader.string()
					break
				case 5:
					message.proofs.push(reader.string())
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): MsgClaim {
		return {
			sender: isSet(object.sender) ? String(object.sender) : "",
			merkledropId: isSet(object.merkledropId)
				? Long.fromString(object.merkledropId)
				: Long.UZERO,
			index: isSet(object.index) ? Long.fromString(object.index) : Long.UZERO,
			amount: isSet(object.amount) ? String(object.amount) : "",
			proofs: Array.isArray(object?.proofs)
				? object.proofs.map((e: any) => String(e))
				: [],
		}
	},

	toJSON(message: MsgClaim): unknown {
		const obj: any = {}
		message.sender !== undefined && (obj.sender = message.sender)
		message.merkledropId !== undefined &&
			(obj.merkledropId = (message.merkledropId || Long.UZERO).toString())
		message.index !== undefined &&
			(obj.index = (message.index || Long.UZERO).toString())
		message.amount !== undefined && (obj.amount = message.amount)
		if (message.proofs) {
			obj.proofs = message.proofs.map((e) => e)
		} else {
			obj.proofs = []
		}
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgClaim>, I>>(object: I): MsgClaim {
		const message = createBaseMsgClaim()
		message.sender = object.sender ?? ""
		message.merkledropId =
			object.merkledropId !== undefined && object.merkledropId !== null
				? Long.fromValue(object.merkledropId)
				: Long.UZERO
		message.index =
			object.index !== undefined && object.index !== null
				? Long.fromValue(object.index)
				: Long.UZERO
		message.amount = object.amount ?? ""
		message.proofs = object.proofs?.map((e) => e) || []
		return message
	},
}

function createBaseMsgClaimResponse(): MsgClaimResponse {
	return { id: Long.UZERO, index: Long.UZERO, amount: "" }
}

export const MsgClaimResponse = {
	encode(
		message: MsgClaimResponse,
		writer: _m0.Writer = _m0.Writer.create()
	): _m0.Writer {
		if (!message.id.isZero()) {
			writer.uint32(8).uint64(message.id)
		}
		if (!message.index.isZero()) {
			writer.uint32(16).uint64(message.index)
		}
		if (message.amount !== "") {
			writer.uint32(26).string(message.amount)
		}
		return writer
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
		let end = length === undefined ? reader.len : reader.pos + length
		const message = createBaseMsgClaimResponse()
		while (reader.pos < end) {
			const tag = reader.uint32()
			switch (tag >>> 3) {
				case 1:
					message.id = reader.uint64() as Long
					break
				case 2:
					message.index = reader.uint64() as Long
					break
				case 3:
					message.amount = reader.string()
					break
				default:
					reader.skipType(tag & 7)
					break
			}
		}
		return message
	},

	fromJSON(object: any): MsgClaimResponse {
		return {
			id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
			index: isSet(object.index) ? Long.fromString(object.index) : Long.UZERO,
			amount: isSet(object.amount) ? String(object.amount) : "",
		}
	},

	toJSON(message: MsgClaimResponse): unknown {
		const obj: any = {}
		message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString())
		message.index !== undefined &&
			(obj.index = (message.index || Long.UZERO).toString())
		message.amount !== undefined && (obj.amount = message.amount)
		return obj
	},

	fromPartial<I extends Exact<DeepPartial<MsgClaimResponse>, I>>(
		object: I
	): MsgClaimResponse {
		const message = createBaseMsgClaimResponse()
		message.id =
			object.id !== undefined && object.id !== null
				? Long.fromValue(object.id)
				: Long.UZERO
		message.index =
			object.index !== undefined && object.index !== null
				? Long.fromValue(object.index)
				: Long.UZERO
		message.amount = object.amount ?? ""
		return message
	},
}

export interface Msg {
	Create(request: MsgCreate): Promise<MsgCreateResponse>
	Claim(request: MsgClaim): Promise<MsgClaimResponse>
}

export class MsgClientImpl implements Msg {
	private readonly rpc: Rpc
	constructor(rpc: Rpc) {
		this.rpc = rpc
		this.Create = this.Create.bind(this)
		this.Claim = this.Claim.bind(this)
	}
	Create(request: MsgCreate): Promise<MsgCreateResponse> {
		const data = MsgCreate.encode(request).finish()
		const promise = this.rpc.request(
			"bitsong.merkledrop.v1beta1.Msg",
			"Create",
			data
		)
		return promise.then((data) => MsgCreateResponse.decode(new _m0.Reader(data)))
	}

	Claim(request: MsgClaim): Promise<MsgClaimResponse> {
		const data = MsgClaim.encode(request).finish()
		const promise = this.rpc.request(
			"bitsong.merkledrop.v1beta1.Msg",
			"Claim",
			data
		)
		return promise.then((data) => MsgClaimResponse.decode(new _m0.Reader(data)))
	}
}

interface Rpc {
	request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
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
