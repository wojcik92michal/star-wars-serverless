import {
  ApiResponse,
  formatJSONResponse,
  unexpectedErrorException,
  ValidatedEvent,
} from "@app/lambda";
import { FromSchema } from "json-schema-to-ts";
import { middyfy } from "src/lambda/middify/middify";
import {
  modifyCharactersService,
  readCharactersService,
} from "../../characters.provider";
import { fromCharacterModel } from "../../dto/character.dto";
import { GetCharacterDto } from "../../dto/get-character.dto";
import { createCharacterParamsSchema, createCharacterSchema } from "./schema";

type Response = ApiResponse<GetCharacterDto>;

export const createCharacter = middyfy(
  async (
    event: ValidatedEvent<FromSchema<typeof createCharacterSchema>>
  ): Promise<Response> => {
    const createdId = await modifyCharactersService.createCharacter({
      firstName: event.body.firstName,
      lastName: event.body.lastName,
      episodes: event.body.episodes ?? [],
    });

    const character = await readCharactersService.getCharacter(createdId);

    if (!character) {
      throw unexpectedErrorException();
    }

    return formatJSONResponse({
      character: fromCharacterModel(character),
    });
  },
  createCharacterParamsSchema
);
