/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'bitsong.merkledrop.v1beta1';

export interface Merkledrop {
    /** merkledrop id */
    id: Long;
    /** merkle_root of the merkledrop */
    merkleRoot: string;
    /** merkledrop start height */
    startHeight: Long;
    /** merkledrop end height */
    endHeight: Long;
    /** denom to distribuite */
    denom: string;
    /** amount to distribuite */
    amount: string;
    /** claimed amount */
    claimed: string;
    /** merkledrop's owner */
    owner: string;
}

function createBaseMerkledrop(): Merkledrop {
    return { id: Long.UZERO, merkleRoot: '', startHeight: Long.ZERO, endHeight: Long.ZERO, denom: '', amount: '', claimed: '', owner: '' };
}

export const Merkledrop = {
    encode(message: Merkledrop, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.merkleRoot !== '') {
            writer.uint32(18).string(message.merkleRoot);
        }
        if (!message.startHeight.isZero()) {
            writer.uint32(24).int64(message.startHeight);
        }
        if (!message.endHeight.isZero()) {
            writer.uint32(32).int64(message.endHeight);
        }
        if (message.denom !== '') {
            writer.uint32(42).string(message.denom);
        }
        if (message.amount !== '') {
            writer.uint32(50).string(message.amount);
        }
        if (message.claimed !== '') {
            writer.uint32(58).string(message.claimed);
        }
        if (message.owner !== '') {
            writer.uint32(66).string(message.owner);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Merkledrop {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMerkledrop();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64() as Long;
                    break;
                case 2:
                    message.merkleRoot = reader.string();
                    break;
                case 3:
                    message.startHeight = reader.int64() as Long;
                    break;
                case 4:
                    message.endHeight = reader.int64() as Long;
                    break;
                case 5:
                    message.denom = reader.string();
                    break;
                case 6:
                    message.amount = reader.string();
                    break;
                case 7:
                    message.claimed = reader.string();
                    break;
                case 8:
                    message.owner = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Merkledrop {
        return {
            id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
            merkleRoot: isSet(object.merkleRoot) ? String(object.merkleRoot) : '',
            startHeight: isSet(object.startHeight) ? Long.fromString(object.startHeight) : Long.ZERO,
            endHeight: isSet(object.endHeight) ? Long.fromString(object.endHeight) : Long.ZERO,
            denom: isSet(object.denom) ? String(object.denom) : '',
            amount: isSet(object.amount) ? String(object.amount) : '',
            claimed: isSet(object.claimed) ? String(object.claimed) : '',
            owner: isSet(object.owner) ? String(object.owner) : '',
        };
    },

    toJSON(message: Merkledrop): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
        message.merkleRoot !== undefined && (obj.merkleRoot = message.merkleRoot);
        message.startHeight !== undefined && (obj.startHeight = (message.startHeight || Long.ZERO).toString());
        message.endHeight !== undefined && (obj.endHeight = (message.endHeight || Long.ZERO).toString());
        message.denom !== undefined && (obj.denom = message.denom);
        message.amount !== undefined && (obj.amount = message.amount);
        message.claimed !== undefined && (obj.claimed = message.claimed);
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },

    fromPartial<I extends Exact<DeepPartial<Merkledrop>, I>>(object: I): Merkledrop {
        const message = createBaseMerkledrop();
        message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
        message.merkleRoot = object.merkleRoot ?? '';
        message.startHeight = object.startHeight !== undefined && object.startHeight !== null ? Long.fromValue(object.startHeight) : Long.ZERO;
        message.endHeight = object.endHeight !== undefined && object.endHeight !== null ? Long.fromValue(object.endHeight) : Long.ZERO;
        message.denom = object.denom ?? '';
        message.amount = object.amount ?? '';
        message.claimed = object.claimed ?? '';
        message.owner = object.owner ?? '';
        return message;
    },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

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
    : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

if (_m0.util.Long !== Long) {
    _m0.util.Long = Long as any;
    _m0.configure();
}

function isSet(value: any): boolean {
    return value !== null && value !== undefined;
}
