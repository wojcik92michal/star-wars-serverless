export const createCharacterSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 1, maxLength: 30 },
    lastName: { type: "string", minLength: 1, maxLength: 30 },
    episodes: {
      type: "array",
      items: { type: "string", minLength: 1, maxLength: 30 },
    },
  },
  required: ["firstName", "lastName"],
} as const;

export const createCharacterParamsSchema = {
  type: "object",
  properties: {
    body: createCharacterSchema,
  },
} as const;
