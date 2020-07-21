import { BasicPrompt } from "metabook-core";

const testBasicPrompt: BasicPrompt = {
  promptType: "basic",
  question: {
    contents:
      "Is it possible to use _quantum teleportation_ to transmit information faster than light?\n\nThis is a **second paragraph** with _**bold italic**_.",
    attachments: [],
  },
  answer: {
    contents: "No.",
    attachments: [],
  },
  explanation: null,
};

export default testBasicPrompt;
