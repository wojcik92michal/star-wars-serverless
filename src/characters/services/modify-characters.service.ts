import { buildUpdateQuery } from "@app/helpers/build-update-query/build-update-query";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v4 } from "uuid";
import { CONST_SORT_KEY, DB_TABLE_NAME } from "../consts/characters.conts";
import { CreateCharacterDto } from "../dto/create-character.dto";
import { UpdateCharacterDto } from "../dto/update-character.dto";
import { CharacterModel } from "../models/character.model";

type ID = string;

export class ModifyCharactersService {
  constructor(private docClient: DocumentClient) {}

  async createCharacter(newCharacterData: CreateCharacterDto): Promise<ID> {
    const id = v4();

    const timestamp = Date.now();

    const itemParams: Partial<CharacterModel> = {
      ...newCharacterData,
      createdAtTimestamp: timestamp,
      updatedAtTimestamp: timestamp,
      constSortKey: CONST_SORT_KEY,
      id,
    };

    await this.docClient
      .put({
        TableName: DB_TABLE_NAME,
        Item: {
          ...itemParams,
        },
      })
      .promise();

    return id;
  }

  async updateCharacter(
    id: string,
    updateCharacterData: UpdateCharacterDto
  ): Promise<ID> {
    const timestamp = Date.now();

    const expectedFields: (keyof CharacterModel)[] = [
      "firstName",
      "lastName",
      "episodes",
      "updatedAtTimestamp",
    ];

    const itemParams: Partial<CharacterModel> = {
      ...updateCharacterData,
      createdAtTimestamp: timestamp,
    };

    const { UpdateExpression, ExpressionAttributeValues } = buildUpdateQuery(
      {
        ...itemParams,
      },
      expectedFields
    );

    await this.docClient
      .update({
        TableName: DB_TABLE_NAME,
        Key: { id },
        UpdateExpression,
        ExpressionAttributeValues: ExpressionAttributeValues,
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return id;
  }

  async deleteCharacter(id: string): Promise<void> {
    await this.docClient
      .delete({
        TableName: DB_TABLE_NAME,
        Key: { id },
      })
      .promise();
  }
}
