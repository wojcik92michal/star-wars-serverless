import { handlerPath } from "@app/helpers";
import { paramsSchema } from "./schema";

const toSwaggerSchema = (schema: typeof paramsSchema) => {
  return schema.properties;
};

export const getAllCharacters = {
  handler: `${handlerPath(__dirname)}/handler.getAllCharacters`,
  events: [
    {
      http: {
        method: "get",
        path: "character",
        description:
          "Get characters. The result is returned in paginated format.",
        queryStringParameters: toSwaggerSchema(paramsSchema),
        responseData: {
          200: {
            description: "Characters fetched successfully",
            bodyType: "GetCharactersResult",
          },
        },
      },
    },
  ],
};
