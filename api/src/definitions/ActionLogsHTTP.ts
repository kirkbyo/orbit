/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { ActionLogID } from "../../../core/proto/ActionLogID";

export const protobufPackage = "";

export interface GetActionLogsQuery {
  limit: number;
  id: ActionLogID | undefined;
}

export interface GetActionLogs {
  query: GetActionLogsQuery | undefined;
}

export interface ActionLogsHTTP {
  GET: GetActionLogs | undefined;
}

const baseGetActionLogsQuery: object = { limit: 0 };

export const GetActionLogsQuery = {
  encode(
    message: GetActionLogsQuery,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.limit !== 0) {
      writer.uint32(8).int32(message.limit);
    }
    if (message.id !== undefined) {
      ActionLogID.encode(message.id, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetActionLogsQuery {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetActionLogsQuery } as GetActionLogsQuery;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.limit = reader.int32();
          break;
        case 2:
          message.id = ActionLogID.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetActionLogsQuery {
    const message = { ...baseGetActionLogsQuery } as GetActionLogsQuery;
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    } else {
      message.limit = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = ActionLogID.fromJSON(object.id);
    } else {
      message.id = undefined;
    }
    return message;
  },

  toJSON(message: GetActionLogsQuery): unknown {
    const obj: any = {};
    message.limit !== undefined && (obj.limit = message.limit);
    message.id !== undefined &&
      (obj.id = message.id ? ActionLogID.toJSON(message.id) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetActionLogsQuery>): GetActionLogsQuery {
    const message = { ...baseGetActionLogsQuery } as GetActionLogsQuery;
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    } else {
      message.limit = 0;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = ActionLogID.fromPartial(object.id);
    } else {
      message.id = undefined;
    }
    return message;
  },
};

const baseGetActionLogs: object = {};

export const GetActionLogs = {
  encode(message: GetActionLogs, writer: Writer = Writer.create()): Writer {
    if (message.query !== undefined) {
      GetActionLogsQuery.encode(
        message.query,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetActionLogs {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetActionLogs } as GetActionLogs;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.query = GetActionLogsQuery.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetActionLogs {
    const message = { ...baseGetActionLogs } as GetActionLogs;
    if (object.query !== undefined && object.query !== null) {
      message.query = GetActionLogsQuery.fromJSON(object.query);
    } else {
      message.query = undefined;
    }
    return message;
  },

  toJSON(message: GetActionLogs): unknown {
    const obj: any = {};
    message.query !== undefined &&
      (obj.query = message.query
        ? GetActionLogsQuery.toJSON(message.query)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetActionLogs>): GetActionLogs {
    const message = { ...baseGetActionLogs } as GetActionLogs;
    if (object.query !== undefined && object.query !== null) {
      message.query = GetActionLogsQuery.fromPartial(object.query);
    } else {
      message.query = undefined;
    }
    return message;
  },
};

const baseActionLogsHTTP: object = {};

export const ActionLogsHTTP = {
  encode(message: ActionLogsHTTP, writer: Writer = Writer.create()): Writer {
    if (message.GET !== undefined) {
      GetActionLogs.encode(message.GET, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ActionLogsHTTP {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseActionLogsHTTP } as ActionLogsHTTP;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.GET = GetActionLogs.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActionLogsHTTP {
    const message = { ...baseActionLogsHTTP } as ActionLogsHTTP;
    if (object.GET !== undefined && object.GET !== null) {
      message.GET = GetActionLogs.fromJSON(object.GET);
    } else {
      message.GET = undefined;
    }
    return message;
  },

  toJSON(message: ActionLogsHTTP): unknown {
    const obj: any = {};
    message.GET !== undefined &&
      (obj.GET = message.GET ? GetActionLogs.toJSON(message.GET) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ActionLogsHTTP>): ActionLogsHTTP {
    const message = { ...baseActionLogsHTTP } as ActionLogsHTTP;
    if (object.GET !== undefined && object.GET !== null) {
      message.GET = GetActionLogs.fromPartial(object.GET);
    } else {
      message.GET = undefined;
    }
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
