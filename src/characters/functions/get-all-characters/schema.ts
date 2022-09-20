export const paramsSchema = {
  type: "object",
  properties: {
    limit: {
      type: "integer",
      minimum: 1,
      description:
        "Indicates how many items you would like to return. Maximum value is 20",
    },
    nextId: {
      type: "string",
      description: "If present, the next page of data is available.",
    },
  },
  required: [],
} as const;

export const paramsValidationSchema = {
  type: "object",
  properties: {
    queryStringParameters: paramsSchema,
  },
  required: [],
} as const;
