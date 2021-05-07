/* eslint-disable */
import { util, configure } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "orbit.core";

export enum PromptProvenanceType {
  anki = 0,
  note = 1,
  web = 2,
  UNRECOGNIZED = -1,
}

export function promptProvenanceTypeFromJSON(
  object: any
): PromptProvenanceType {
  switch (object) {
    case 0:
    case "anki":
      return PromptProvenanceType.anki;
    case 1:
    case "note":
      return PromptProvenanceType.note;
    case 2:
    case "web":
      return PromptProvenanceType.web;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PromptProvenanceType.UNRECOGNIZED;
  }
}

export function promptProvenanceTypeToJSON(
  object: PromptProvenanceType
): string {
  switch (object) {
    case PromptProvenanceType.anki:
      return "anki";
    case PromptProvenanceType.note:
      return "note";
    case PromptProvenanceType.web:
      return "web";
    default:
      return "UNKNOWN";
  }
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
