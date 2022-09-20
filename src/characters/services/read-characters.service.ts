import { DocumentClient } from "aws-sdk/clients/dynamodb";
import {
  CONST_SORT_KEY,
  DB_TABLE_NAME,
  GET_CHARACTERS_LIMIT,
} from "../consts/characters.conts";
import { CharacterModel } from "../models/character.model";

type Params = {
  limit?: number;
  nextId?: string;
};

type GetAllCharactersResult = {
  limit: number;
  items: CharacterModel[];
  nextId?: string;
};

export class ReadCharactersService {
  constructor(private docClient: DocumentClient) {}

  async getAllCharacters(params: Params): Promise<GetAllCharactersResult> {
    const maxLimit = GET_CHARACTERS_LIMIT;

    const limit = Math.min(maxLimit, params?.limit ?? maxLimit);

    let exclusiveStartKey: Pick<
      CharacterModel,
      "id" | "constSortKey" | "createdAtTimestamp"
    >;

    if (params.nextId) {
      const character = await this.getCharacter(params.nextId);

      if (!character) {
        return {
          items: [],
          limit,
        };
      }

      exclusiveStartKey = {
        id: character.id,
        constSortKey: character.constSortKey,
        createdAtTimestamp: character.createdAtTimestamp,
      };
    }

    const result = await this.docClient
      .query({
        TableName: DB_TABLE_NAME,
        Limit: limit,
        IndexName: "characterCreatedAtSortIndex",
        KeyConditionExpression: "constSortKey = :constSortKey",
        ExpressionAttributeValues: {
          ":constSortKey": CONST_SORT_KEY,
        },
        ExclusiveStartKey: exclusiveStartKey,
      })
      .promise();

    return {
      limit,
      items: result.Items as CharacterModel[],
      nextId: result.LastEvaluatedKey?.id as string | undefined,
    };
  }

  async getCharacter(id: string): Promise<CharacterModel | undefined> {
    const result = await this.docClient
      .get({
        TableName: DB_TABLE_NAME,
        Key: {
          id,
        },
      })
      .promise();

    return result.Item as CharacterModel | undefined;
  }
}
