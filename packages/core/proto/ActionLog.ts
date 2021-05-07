/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { TaskProvenance } from "../../../packages/core/proto/TaskProvenance";
import { ActionLogID } from "../../../packages/core/proto/ActionLogID";

export const protobufPackage = "orbit.core";

export interface IngestActionLog {
  timestampMillis: number;
  taskID: string;
  actionLogType: IngestActionLog_ActionLogType;
  provenance?: TaskProvenance | undefined;
}

export enum IngestActionLog_ActionLogType {
  ingest = 0,
  UNRECOGNIZED = -1,
}

export function ingestActionLog_ActionLogTypeFromJSON(
  object: any
): IngestActionLog_ActionLogType {
  switch (object) {
    case 0:
    case "ingest":
      return IngestActionLog_ActionLogType.ingest;
    case -1:
    case "UNRECOGNIZED":
    default:
      return IngestActionLog_ActionLogType.UNRECOGNIZED;
  }
}

export function ingestActionLog_ActionLogTypeToJSON(
  object: IngestActionLog_ActionLogType
): string {
  switch (object) {
    case IngestActionLog_ActionLogType.ingest:
      return "ingest";
    default:
      return "UNKNOWN";
  }
}

export interface RescheduleActionLog {
  timestampMillis: number;
  taskID: string;
  actionLogType: RescheduleActionLog_ActionLogType;
  parentActionLogIDs: ActionLogID[];
  newTimestampMillis: number;
}

export enum RescheduleActionLog_ActionLogType {
  reschedule = 0,
  UNRECOGNIZED = -1,
}

export function rescheduleActionLog_ActionLogTypeFromJSON(
  object: any
): RescheduleActionLog_ActionLogType {
  switch (object) {
    case 0:
    case "reschedule":
      return RescheduleActionLog_ActionLogType.reschedule;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RescheduleActionLog_ActionLogType.UNRECOGNIZED;
  }
}

export function rescheduleActionLog_ActionLogTypeToJSON(
  object: RescheduleActionLog_ActionLogType
): string {
  switch (object) {
    case RescheduleActionLog_ActionLogType.reschedule:
      return "reschedule";
    default:
      return "UNKNOWN";
  }
}

export interface ActionLog {
  ingest: IngestActionLog | undefined;
  reschedule: RescheduleActionLog | undefined;
}

const baseIngestActionLog: object = {
  timestampMillis: 0,
  taskID: "",
  actionLogType: 0,
};

export const IngestActionLog = {
  encode(message: IngestActionLog, writer: Writer = Writer.create()): Writer {
    if (message.timestampMillis !== 0) {
      writer.uint32(13).float(message.timestampMillis);
    }
    if (message.taskID !== "") {
      writer.uint32(18).string(message.taskID);
    }
    if (message.actionLogType !== 0) {
      writer.uint32(24).int32(message.actionLogType);
    }
    if (message.provenance !== undefined) {
      TaskProvenance.encode(
        message.provenance,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): IngestActionLog {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIngestActionLog } as IngestActionLog;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestampMillis = reader.float();
          break;
        case 2:
          message.taskID = reader.string();
          break;
        case 3:
          message.actionLogType = reader.int32() as any;
          break;
        case 4:
          message.provenance = TaskProvenance.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IngestActionLog {
    const message = { ...baseIngestActionLog } as IngestActionLog;
    if (
      object.timestampMillis !== undefined &&
      object.timestampMillis !== null
    ) {
      message.timestampMillis = Number(object.timestampMillis);
    } else {
      message.timestampMillis = 0;
    }
    if (object.taskID !== undefined && object.taskID !== null) {
      message.taskID = String(object.taskID);
    } else {
      message.taskID = "";
    }
    if (object.actionLogType !== undefined && object.actionLogType !== null) {
      message.actionLogType = ingestActionLog_ActionLogTypeFromJSON(
        object.actionLogType
      );
    } else {
      message.actionLogType = 0;
    }
    if (object.provenance !== undefined && object.provenance !== null) {
      message.provenance = TaskProvenance.fromJSON(object.provenance);
    } else {
      message.provenance = undefined;
    }
    return message;
  },

  toJSON(message: IngestActionLog): unknown {
    const obj: any = {};
    message.timestampMillis !== undefined &&
      (obj.timestampMillis = message.timestampMillis);
    message.taskID !== undefined && (obj.taskID = message.taskID);
    message.actionLogType !== undefined &&
      (obj.actionLogType = ingestActionLog_ActionLogTypeToJSON(
        message.actionLogType
      ));
    message.provenance !== undefined &&
      (obj.provenance = message.provenance
        ? TaskProvenance.toJSON(message.provenance)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<IngestActionLog>): IngestActionLog {
    const message = { ...baseIngestActionLog } as IngestActionLog;
    if (
      object.timestampMillis !== undefined &&
      object.timestampMillis !== null
    ) {
      message.timestampMillis = object.timestampMillis;
    } else {
      message.timestampMillis = 0;
    }
    if (object.taskID !== undefined && object.taskID !== null) {
      message.taskID = object.taskID;
    } else {
      message.taskID = "";
    }
    if (object.actionLogType !== undefined && object.actionLogType !== null) {
      message.actionLogType = object.actionLogType;
    } else {
      message.actionLogType = 0;
    }
    if (object.provenance !== undefined && object.provenance !== null) {
      message.provenance = TaskProvenance.fromPartial(object.provenance);
    } else {
      message.provenance = undefined;
    }
    return message;
  },
};

const baseRescheduleActionLog: object = {
  timestampMillis: 0,
  taskID: "",
  actionLogType: 0,
  newTimestampMillis: 0,
};

export const RescheduleActionLog = {
  encode(
    message: RescheduleActionLog,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.timestampMillis !== 0) {
      writer.uint32(13).float(message.timestampMillis);
    }
    if (message.taskID !== "") {
      writer.uint32(18).string(message.taskID);
    }
    if (message.actionLogType !== 0) {
      writer.uint32(24).int32(message.actionLogType);
    }
    for (const v of message.parentActionLogIDs) {
      ActionLogID.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.newTimestampMillis !== 0) {
      writer.uint32(45).float(message.newTimestampMillis);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RescheduleActionLog {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRescheduleActionLog } as RescheduleActionLog;
    message.parentActionLogIDs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestampMillis = reader.float();
          break;
        case 2:
          message.taskID = reader.string();
          break;
        case 3:
          message.actionLogType = reader.int32() as any;
          break;
        case 4:
          message.parentActionLogIDs.push(
            ActionLogID.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.newTimestampMillis = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RescheduleActionLog {
    const message = { ...baseRescheduleActionLog } as RescheduleActionLog;
    message.parentActionLogIDs = [];
    if (
      object.timestampMillis !== undefined &&
      object.timestampMillis !== null
    ) {
      message.timestampMillis = Number(object.timestampMillis);
    } else {
      message.timestampMillis = 0;
    }
    if (object.taskID !== undefined && object.taskID !== null) {
      message.taskID = String(object.taskID);
    } else {
      message.taskID = "";
    }
    if (object.actionLogType !== undefined && object.actionLogType !== null) {
      message.actionLogType = rescheduleActionLog_ActionLogTypeFromJSON(
        object.actionLogType
      );
    } else {
      message.actionLogType = 0;
    }
    if (
      object.parentActionLogIDs !== undefined &&
      object.parentActionLogIDs !== null
    ) {
      for (const e of object.parentActionLogIDs) {
        message.parentActionLogIDs.push(ActionLogID.fromJSON(e));
      }
    }
    if (
      object.newTimestampMillis !== undefined &&
      object.newTimestampMillis !== null
    ) {
      message.newTimestampMillis = Number(object.newTimestampMillis);
    } else {
      message.newTimestampMillis = 0;
    }
    return message;
  },

  toJSON(message: RescheduleActionLog): unknown {
    const obj: any = {};
    message.timestampMillis !== undefined &&
      (obj.timestampMillis = message.timestampMillis);
    message.taskID !== undefined && (obj.taskID = message.taskID);
    message.actionLogType !== undefined &&
      (obj.actionLogType = rescheduleActionLog_ActionLogTypeToJSON(
        message.actionLogType
      ));
    if (message.parentActionLogIDs) {
      obj.parentActionLogIDs = message.parentActionLogIDs.map((e) =>
        e ? ActionLogID.toJSON(e) : undefined
      );
    } else {
      obj.parentActionLogIDs = [];
    }
    message.newTimestampMillis !== undefined &&
      (obj.newTimestampMillis = message.newTimestampMillis);
    return obj;
  },

  fromPartial(object: DeepPartial<RescheduleActionLog>): RescheduleActionLog {
    const message = { ...baseRescheduleActionLog } as RescheduleActionLog;
    message.parentActionLogIDs = [];
    if (
      object.timestampMillis !== undefined &&
      object.timestampMillis !== null
    ) {
      message.timestampMillis = object.timestampMillis;
    } else {
      message.timestampMillis = 0;
    }
    if (object.taskID !== undefined && object.taskID !== null) {
      message.taskID = object.taskID;
    } else {
      message.taskID = "";
    }
    if (object.actionLogType !== undefined && object.actionLogType !== null) {
      message.actionLogType = object.actionLogType;
    } else {
      message.actionLogType = 0;
    }
    if (
      object.parentActionLogIDs !== undefined &&
      object.parentActionLogIDs !== null
    ) {
      for (const e of object.parentActionLogIDs) {
        message.parentActionLogIDs.push(ActionLogID.fromPartial(e));
      }
    }
    if (
      object.newTimestampMillis !== undefined &&
      object.newTimestampMillis !== null
    ) {
      message.newTimestampMillis = object.newTimestampMillis;
    } else {
      message.newTimestampMillis = 0;
    }
    return message;
  },
};

const baseActionLog: object = {};

export const ActionLog = {
  encode(message: ActionLog, writer: Writer = Writer.create()): Writer {
    if (message.ingest !== undefined) {
      IngestActionLog.encode(message.ingest, writer.uint32(10).fork()).ldelim();
    }
    if (message.reschedule !== undefined) {
      RescheduleActionLog.encode(
        message.reschedule,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ActionLog {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseActionLog } as ActionLog;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ingest = IngestActionLog.decode(reader, reader.uint32());
          break;
        case 2:
          message.reschedule = RescheduleActionLog.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActionLog {
    const message = { ...baseActionLog } as ActionLog;
    if (object.ingest !== undefined && object.ingest !== null) {
      message.ingest = IngestActionLog.fromJSON(object.ingest);
    } else {
      message.ingest = undefined;
    }
    if (object.reschedule !== undefined && object.reschedule !== null) {
      message.reschedule = RescheduleActionLog.fromJSON(object.reschedule);
    } else {
      message.reschedule = undefined;
    }
    return message;
  },

  toJSON(message: ActionLog): unknown {
    const obj: any = {};
    message.ingest !== undefined &&
      (obj.ingest = message.ingest
        ? IngestActionLog.toJSON(message.ingest)
        : undefined);
    message.reschedule !== undefined &&
      (obj.reschedule = message.reschedule
        ? RescheduleActionLog.toJSON(message.reschedule)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ActionLog>): ActionLog {
    const message = { ...baseActionLog } as ActionLog;
    if (object.ingest !== undefined && object.ingest !== null) {
      message.ingest = IngestActionLog.fromPartial(object.ingest);
    } else {
      message.ingest = undefined;
    }
    if (object.reschedule !== undefined && object.reschedule !== null) {
      message.reschedule = RescheduleActionLog.fromPartial(object.reschedule);
    } else {
      message.reschedule = undefined;
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
