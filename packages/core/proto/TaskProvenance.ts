/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import {
  PromptProvenanceType,
  promptProvenanceTypeFromJSON,
  promptProvenanceTypeToJSON,
} from "../../../packages/core/proto/PromptProvenance";

export const protobufPackage = "orbit.core";

export interface TaskProvenance {
  provenanceType: PromptProvenanceType;
  /** A unique identifier which specifies the source of this task relative to the provenanceType. For instance, for a task imported from Anki, this would be the Anki card ID. */
  externalID: string;
  modificationTimestampMillis?: number | undefined;
  title?: string | undefined;
  url?: string | undefined;
}

const baseTaskProvenance: object = { provenanceType: 0, externalID: "" };

export const TaskProvenance = {
  encode(message: TaskProvenance, writer: Writer = Writer.create()): Writer {
    if (message.provenanceType !== 0) {
      writer.uint32(8).int32(message.provenanceType);
    }
    if (message.externalID !== "") {
      writer.uint32(18).string(message.externalID);
    }
    if (message.modificationTimestampMillis !== undefined) {
      writer.uint32(29).float(message.modificationTimestampMillis);
    }
    if (message.title !== undefined) {
      writer.uint32(34).string(message.title);
    }
    if (message.url !== undefined) {
      writer.uint32(42).string(message.url);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TaskProvenance {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTaskProvenance } as TaskProvenance;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.provenanceType = reader.int32() as any;
          break;
        case 2:
          message.externalID = reader.string();
          break;
        case 3:
          message.modificationTimestampMillis = reader.float();
          break;
        case 4:
          message.title = reader.string();
          break;
        case 5:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TaskProvenance {
    const message = { ...baseTaskProvenance } as TaskProvenance;
    if (object.provenanceType !== undefined && object.provenanceType !== null) {
      message.provenanceType = promptProvenanceTypeFromJSON(
        object.provenanceType
      );
    } else {
      message.provenanceType = 0;
    }
    if (object.externalID !== undefined && object.externalID !== null) {
      message.externalID = String(object.externalID);
    } else {
      message.externalID = "";
    }
    if (
      object.modificationTimestampMillis !== undefined &&
      object.modificationTimestampMillis !== null
    ) {
      message.modificationTimestampMillis = Number(
        object.modificationTimestampMillis
      );
    } else {
      message.modificationTimestampMillis = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = undefined;
    }
    return message;
  },

  toJSON(message: TaskProvenance): unknown {
    const obj: any = {};
    message.provenanceType !== undefined &&
      (obj.provenanceType = promptProvenanceTypeToJSON(message.provenanceType));
    message.externalID !== undefined && (obj.externalID = message.externalID);
    message.modificationTimestampMillis !== undefined &&
      (obj.modificationTimestampMillis = message.modificationTimestampMillis);
    message.title !== undefined && (obj.title = message.title);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial(object: DeepPartial<TaskProvenance>): TaskProvenance {
    const message = { ...baseTaskProvenance } as TaskProvenance;
    if (object.provenanceType !== undefined && object.provenanceType !== null) {
      message.provenanceType = object.provenanceType;
    } else {
      message.provenanceType = 0;
    }
    if (object.externalID !== undefined && object.externalID !== null) {
      message.externalID = object.externalID;
    } else {
      message.externalID = "";
    }
    if (
      object.modificationTimestampMillis !== undefined &&
      object.modificationTimestampMillis !== null
    ) {
      message.modificationTimestampMillis = object.modificationTimestampMillis;
    } else {
      message.modificationTimestampMillis = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = undefined;
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    } else {
      message.url = undefined;
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
