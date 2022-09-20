import { createCharacterSchema } from "../create-character/schema";

export const updateCharacterSchema = {
  ...createCharacterSchema,
  required: [],
} as const;

export const updateCharacterParamsSchema = {
  type: "object",
  properties: {
    body: updateCharacterSchema,
  },
} as const;
