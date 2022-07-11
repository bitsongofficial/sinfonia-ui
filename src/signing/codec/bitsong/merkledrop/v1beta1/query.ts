/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Merkledrop } from '../../../bitsong/merkledrop/v1beta1/merkledrop';
import { Params } from '../../../bitsong/merkledrop/v1beta1/params';

export const protobufPackage = 'bitsong.merkledrop.v1beta1';

export interface QueryMerkledropRequest {
    id: Long;
}

export interface QueryMerkledropResponse {
    merkledrop?: Merkledrop;
}

export interface QueryIndexClaimedRequest {
    id: Long;
    index: Long;
}

export interface QueryIndexClaimedResponse {
    isClaimed: boolean;
}

/** QueryParametersRequest is request type for the Query/Parameters RPC method */
export interface QueryParamsRequest {}

/** QueryParametersResponse is response type for the Query/Parameters RPC method */
export interface QueryParamsResponse {
    params?: Params;
}

function createBaseQueryMerkledropRequest(): QueryMerkledropRequest {
    return { id: Long.UZERO };
}

export const QueryMerkledropRequest = {
    encode(message: QueryMerkledropRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryMerkledropRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMerkledropRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64() as Long;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryMerkledropRequest {
        return {
            id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
        };
    },

    toJSON(message: QueryMerkledropRequest): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
        return obj;
    },

    fromPartial<I extends Exact<DeepPartial<QueryMerkledropRequest>, I>>(object: I): QueryMerkledropRequest {
        const message = createBaseQueryMerkledropRequest();
        message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
        return message;
    },
};

function createBaseQueryMerkledropResponse(): QueryMerkledropResponse {
    return { merkledrop: undefined };
}

export const QueryMerkledropResponse = {
    encode(message: QueryMerkledropResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.merkledrop !== undefined) {
            Merkledrop.encode(message.merkledrop, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryMerkledropResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMerkledropResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.merkledrop = Merkledrop.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryMerkledropResponse {
        return {
            merkledrop: isSet(object.merkledrop) ? Merkledrop.fromJSON(object.merkledrop) : undefined,
        };
    },

    toJSON(message: QueryMerkledropResponse): unknown {
        const obj: any = {};
        message.merkledrop !== undefined && (obj.merkledrop = message.merkledrop ? Merkledrop.toJSON(message.merkledrop) : undefined);
        return obj;
    },

    fromPartial<I extends Exact<DeepPartial<QueryMerkledropResponse>, I>>(object: I): QueryMerkledropResponse {
        const message = createBaseQueryMerkledropResponse();
        message.merkledrop = object.merkledrop !== undefined && object.merkledrop !== null ? Merkledrop.fromPartial(object.merkledrop) : undefined;
        return message;
    },
};

function createBaseQueryIndexClaimedRequest(): QueryIndexClaimedRequest {
    return { id: Long.UZERO, index: Long.UZERO };
}

export const QueryIndexClaimedRequest = {
    encode(message: QueryIndexClaimedRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        if (!message.index.isZero()) {
            writer.uint32(16).uint64(message.index);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIndexClaimedRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIndexClaimedRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64() as Long;
                    break;
                case 2:
                    message.index = reader.uint64() as Long;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryIndexClaimedRequest {
        return {
            id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
            index: isSet(object.index) ? Long.fromString(object.index) : Long.UZERO,
        };
    },

    toJSON(message: QueryIndexClaimedRequest): unknown {
        const obj: any = {};
        message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
        message.index !== undefined && (obj.index = (message.index || Long.UZERO).toString());
        return obj;
    },

    fromPartial<I extends Exact<DeepPartial<QueryIndexClaimedRequest>, I>>(object: I): QueryIndexClaimedRequest {
        const message = createBaseQueryIndexClaimedRequest();
        message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
        message.index = object.index !== undefined && object.index !== null ? Long.fromValue(object.index) : Long.UZERO;
        return message;
    },
};

function createBaseQueryIndexClaimedResponse(): QueryIndexClaimedResponse {
    return { isClaimed: false };
}

export const QueryIndexClaimedResponse = {
    encode(message: QueryIndexClaimedResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.isClaimed === true) {
            writer.uint32(8).bool(message.isClaimed);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIndexClaimedResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIndexClaimedResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.isClaimed = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryIndexClaimedResponse {
        return {
            isClaimed: isSet(object.isClaimed) ? Boolean(object.isClaimed) : false,
        };
    },

    toJSON(message: QueryIndexClaimedResponse): unknown {
        const obj: any = {};
        message.isClaimed !== undefined && (obj.isClaimed = message.isClaimed);
        return obj;
    },

    fromPartial<I extends Exact<DeepPartial<QueryIndexClaimedResponse>, I>>(object: I): QueryIndexClaimedResponse {
        const message = createBaseQueryIndexClaimedResponse();
        message.isClaimed = object.isClaimed ?? false;
        return message;
    },
};

function createBaseQueryParamsRequest(): QueryParamsRequest {
    return {};
}

export const QueryParamsRequest = {
    encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(_: any): QueryParamsRequest {
        return {};
    },

    toJSON(_: QueryParamsRequest): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
        const message = createBaseQueryParamsRequest();
        return message;
    },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
    return { params: undefined };
}

export const QueryParamsResponse = {
    encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryParamsResponse {
        return {
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },

    toJSON(message: QueryParamsResponse): unknown {
        const obj: any = {};
        message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },

    fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
        const message = createBaseQueryParamsResponse();
        message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
        return message;
    },
};

export interface Query {
    Merkledrop(request: QueryMerkledropRequest): Promise<QueryMerkledropResponse>;
    IndexClaimed(request: QueryIndexClaimedRequest): Promise<QueryIndexClaimedResponse>;
    /** Params queries the fantoken parameters */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export class QueryClientImpl implements Query {
    private readonly rpc: Rpc;
    constructor(rpc: Rpc) {
        this.rpc = rpc;
        this.Merkledrop = this.Merkledrop.bind(this);
        this.IndexClaimed = this.IndexClaimed.bind(this);
        this.Params = this.Params.bind(this);
    }
    Merkledrop(request: QueryMerkledropRequest): Promise<QueryMerkledropResponse> {
        const data = QueryMerkledropRequest.encode(request).finish();
        const promise = this.rpc.request('bitsong.merkledrop.v1beta1.Query', 'Merkledrop', data);
        return promise.then((data) => QueryMerkledropResponse.decode(new _m0.Reader(data)));
    }

    IndexClaimed(request: QueryIndexClaimedRequest): Promise<QueryIndexClaimedResponse> {
        const data = QueryIndexClaimedRequest.encode(request).finish();
        const promise = this.rpc.request('bitsong.merkledrop.v1beta1.Query', 'IndexClaimed', data);
        return promise.then((data) => QueryIndexClaimedResponse.decode(new _m0.Reader(data)));
    }

    Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request('bitsong.merkledrop.v1beta1.Query', 'Params', data);
        return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
    }
}

interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
