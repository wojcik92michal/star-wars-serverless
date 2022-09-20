import {
  ApiResponse,
  formatJSONResponse,
  middyfy,
  ValidatedEvent,
} from "@app/lambda";
import { FromSchema } from "json-schema-to-ts";
import { readCharactersService } from "../../characters.provider";
import { fromCharacterModel } from "../../dto/character.dto";
import { GetCharactersResult } from "../../dto/get-characters-result.dto";
import { paramsSchema, paramsValidationSchema } from "./schema";

type Response = ApiResponse<GetCharactersResult>;

export const getAllCharacters = middyfy(
  async (
    event: ValidatedEvent<null, FromSchema<typeof paramsSchema>, {}>
  ): Promise<Response> => {
    const { limit, nextId } = event.queryStringParameters;

    const result = await readCharactersService.getAllCharacters({
      limit,
      nextId,
    });

    return formatJSONResponse({
      items: result.items.map((item) => fromCharacterModel(item)),
      limit: result.limit,
      nextId: result.nextId,
    });
  },
  paramsValidationSchema
);
