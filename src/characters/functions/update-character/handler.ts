import {
  ApiResponse,
  formatJSONResponse,
  middyfy,
  notFoundException,
  unexpectedErrorException,
  ValidatedEvent,
} from "@app/lambda";
import { FromSchema } from "json-schema-to-ts";
import {
  modifyCharactersService,
  readCharactersService,
} from "../../characters.provider";
import { fromCharacterModel } from "../../dto/character.dto";
import { GetCharacterDto } from "../../dto/get-character.dto";
import { updateCharacterParamsSchema, updateCharacterSchema } from "./schema";

type Response = ApiResponse<GetCharacterDto>;

export const updateCharacter = middyfy(
  async (
    event: ValidatedEvent<
      FromSchema<typeof updateCharacterSchema>,
      {},
      { id: string }
    >
  ): Promise<Response> => {
    const id = event.pathParameters.id;

    const character = await readCharactersService.getCharacter(id);

    if (!character) {
      throw notFoundException();
    }

    await modifyCharactersService.updateCharacter(id, {
      episodes: event.body.episodes,
      firstName: event.body.firstName,
      lastName: event.body.lastName,
    });

    const updatedCharacter = await readCharactersService.getCharacter(id);

    if (!updatedCharacter) {
      throw unexpectedErrorException();
    }

    return formatJSONResponse({
      character: fromCharacterModel(updatedCharacter),
    });
  },
  updateCharacterParamsSchema
);
