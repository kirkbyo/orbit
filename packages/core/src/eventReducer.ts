import { EntityOfEvent, Event, EventType, TypeOfEvent } from "./event";
import { attachmentIngestEventReducer } from "./eventReducers/attachmentReducers";
import {
  taskIngestEventReducer,
  taskRepetitionEventReducer,
  taskRescheduleEventReducer,
  taskUpdateDeletedEventReducer,
  taskUpdateProvenanceEventReducer,
} from "./eventReducers/taskReducers";

const reducers: {
  [T in Event as TypeOfEvent<T>]: (
    oldSnapshot: EntityOfEvent<T> | null,
    event: T,
  ) => EntityOfEvent<T>;
} = {
  [EventType.TaskIngest]: taskIngestEventReducer,
  [EventType.TaskRepetition]: taskRepetitionEventReducer,
  [EventType.TaskReschedule]: taskRescheduleEventReducer,
  [EventType.TaskUpdateDeleted]: taskUpdateDeletedEventReducer,
  [EventType.TaskUpdateProvenanceEvent]: taskUpdateProvenanceEventReducer,

  [EventType.AttachmentIngest]: attachmentIngestEventReducer,
};

export function eventReducer<E extends Event>(
  entitySnapshot: EntityOfEvent<E> | null,
  event: E,
): EntityOfEvent<E> {
  const reducer = reducers[event.type as TypeOfEvent<E>];
  if (reducer) {
    // Not sure why TS can't figure this one out...
    const typedReducer = reducer as unknown as (
      s: EntityOfEvent<E> | null,
      e: E,
    ) => EntityOfEvent<E>;
    return typedReducer(entitySnapshot, event);
  } else {
    throw new Error(`Unsupported event type ${event.type}`);
  }
}
