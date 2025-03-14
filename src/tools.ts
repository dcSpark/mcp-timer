import { timerHandler } from "./handlers/timer.js";

export const tools = [
  {
    name: "timer",
    description: "Waits for the specified duration and returns a message when finished",
    inputSchema: {
      type: "object",
      properties: {
        minutes: { type: "number" },
        seconds: { type: "number" }
      },
      required: []
    }
  }
];

type handlerDictionary = Record<typeof tools[number]["name"], (input: any) => any>;

export const handlers: handlerDictionary = {
  "timer": timerHandler
};
