import { testBasicPrompt } from "../__tests__/sampleData";
import { ActionLogID, getIDForActionLog } from "../actionLogID";
import { getIDForPrompt } from "../promptID";
import { PromptRepetitionOutcome } from "../spacedRepetition";
import {
  ingestActionLogType,
  repetitionActionLogType,
} from "../types/actionLog";
import { basicPromptType } from "../types/prompt";
import {
  getActionLogFromPromptActionLog,
  PromptIngestActionLog,
  PromptRepetitionActionLog,
} from "../types/promptActionLog";
import { getIDForPromptTask, PromptTaskID } from "../types/promptTask";
import { PromptTaskParameters } from "../types/promptTaskParameters";
import mergeActionLogs from "./mergeActionLogs";

let testIngestLog: PromptIngestActionLog;
let testIngestLogID: ActionLogID;
let testRepetitionLog: PromptRepetitionActionLog<PromptTaskParameters>;
let testRepetitionLogID: ActionLogID;

beforeAll(async () => {
  const testTaskID = getIDForPromptTask({
    promptType: basicPromptType,
    promptID: await getIDForPrompt(testBasicPrompt),
    promptParameters: null,
  });

  testIngestLog = {
    actionLogType: ingestActionLogType,
    taskID: "y" as PromptTaskID,
    timestampMillis: 500,
    provenance: null,
  };

  testIngestLogID = getIDForActionLog(
    getActionLogFromPromptActionLog(testIngestLog),
  ) as ActionLogID;

  testRepetitionLog = {
    actionLogType: repetitionActionLogType,
    taskID: testTaskID,
    timestampMillis: 500,
    parentActionLogIDs: [testIngestLogID],
    taskParameters: null,
    outcome: PromptRepetitionOutcome.Remembered,
    context: null,
  };

  testRepetitionLogID = getIDForActionLog(
    getActionLogFromPromptActionLog(testRepetitionLog),
  ) as ActionLogID;
});

test("fails if log is missing", () => {
  expect(
    mergeActionLogs([{ log: testRepetitionLog, id: testRepetitionLogID }]),
  ).toBeInstanceOf(Error);
});

test("merges split log", () => {
  const secondRepetitionLog = { ...testRepetitionLog, timestampMillis: 750 };
  expect(
    mergeActionLogs([
      { log: testIngestLog, id: testIngestLogID },
      {
        log: testRepetitionLog,
        id: testRepetitionLogID,
      },
      {
        log: secondRepetitionLog,
        id: getIDForActionLog(
          getActionLogFromPromptActionLog(secondRepetitionLog),
        ),
      },
    ]),
  ).toBeTruthy();
});
