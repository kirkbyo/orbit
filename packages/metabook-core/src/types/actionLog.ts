import { ActionLogID } from "../actionLogID";

type BaseActionLog = {
  timestampMillis: number;
  taskID: string;
};

export interface TaskMetadata {
  isDeleted: boolean;
}

export type ActionLogMetadata = { [key: string]: string | number | null };

export const ingestActionLogType = "ingest";
export type IngestActionLog = {
  actionLogType: typeof ingestActionLogType;
  metadata: ActionLogMetadata | null;
} & BaseActionLog;

export const repetitionActionLogType = "repetition";
export type RepetitionActionLog = {
  actionLogType: typeof repetitionActionLogType;
  parentActionLogIDs: ActionLogID[];

  taskParameters: ActionLogMetadata | null;

  context: string | null;
  outcome: string;
} & BaseActionLog;

export const rescheduleActionLogType = "reschedule";
export type RescheduleActionLog = {
  actionLogType: typeof rescheduleActionLogType;
  parentActionLogIDs: ActionLogID[];

  newTimestampMillis: number;
} & BaseActionLog;

export const updateMetadataActionLogType = "updateMetadata";
export type UpdateMetadataActionLog = {
  actionLogType: typeof updateMetadataActionLogType;
  parentActionLogIDs: ActionLogID[];

  updates: Partial<TaskMetadata>;
} & BaseActionLog;

export type ActionLog =
  | IngestActionLog
  | RepetitionActionLog
  | RescheduleActionLog
  | UpdateMetadataActionLog;
export type ActionLogType = ActionLog["actionLogType"];
