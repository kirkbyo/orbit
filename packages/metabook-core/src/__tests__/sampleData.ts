import {
  ApplicationPrompt,
  BasicPrompt,
  basicPromptType,
  ClozePrompt,
  QAPrompt,
} from "..";

// Unfortunately duplicates metabook-sample-data because there's a cyclical module dependency. I'd need to extract metabook-core's types to metabook-types to resolve it.
export const testQAPrompt: QAPrompt = {
  question: {
    contents: "Test question",
    attachments: [],
  },
  answer: {
    contents: "Test answer",
    attachments: [],
  },
  explanation: null,
};
export const testBasicPrompt: BasicPrompt = {
  ...testQAPrompt,
  promptType: basicPromptType,
};
export const testApplicationPrompt: ApplicationPrompt = {
  promptType: "applicationPrompt",
  variants: [testQAPrompt, testQAPrompt],
};
export const testClozePrompt: ClozePrompt = {
  promptType: "cloze",
  body: {
    contents: "Test {cloze}",
    attachments: [],
  },
};