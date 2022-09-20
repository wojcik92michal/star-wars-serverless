import {
  formatJSONResponse,
  notFoundException,
  ValidatedEvent,
} from "@app/lambda";
import { middyfy } from "src/lambda/middify/middify";
import {
  modifyCharactersService,
  readCharactersService,
} from "../../characters.provider";

export const deleteCharacter = middyfy(
  async (event: ValidatedEvent<{}, {}, { id: string }>) => {
    const id = event.pathParameters.id;

    const character = await readCharactersService.getCharacter(id);

    if (!character) {
      throw notFoundException();
    }

    await modifyCharactersService.deleteCharacter(id);

    return formatJSONResponse(null, 204);
  }
);
