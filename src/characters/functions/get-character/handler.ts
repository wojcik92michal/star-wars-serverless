import {
  ApiResponse,
  formatJSONResponse,
  middyfy,
  notFoundException,
  ValidatedEvent,
} from "@app/lambda";
import { readCharactersService } from "../../characters.provider";
import { fromCharacterModel } from "../../dto/character.dto";
import { GetCharacterDto } from "../../dto/get-character.dto";

type PathParameters = {
  id: string;
};

type Result = ApiResponse<GetCharacterDto>;

export const getCharacter = middyfy(
  async (event: ValidatedEvent<null, {}, PathParameters>): Promise<Result> => {
    const id = event.pathParameters.id;

    const result = await readCharactersService.getCharacter(id);

    if (!result) {
      throw notFoundException();
    }

    return formatJSONResponse({
      character: fromCharacterModel(result),
    });
  }
);
