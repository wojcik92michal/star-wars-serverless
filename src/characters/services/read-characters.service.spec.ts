import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { CharacterModel } from "../models/character.model";
import { ReadCharactersService } from "./read-characters.service";

const characters: CharacterModel[] = [
  {
    id: "123",
    episodes: [],
    firstName: "John",
    lastName: "Snow",
    constSortKey: "1",
    createdAtTimestamp: 555,
    updatedAtTimestamp: 666,
  },
  {
    id: "456",
    episodes: ["New Hope 999"],
    firstName: "Bill",
    lastName: "Summer",
    constSortKey: "1",
    createdAtTimestamp: 222,
    updatedAtTimestamp: 333,
  },
];

let mockedDb: jest.Mocked<DocumentClient>;

let service: ReadCharactersService;
let result: unknown;

beforeEach(() => {
  mockedDb = jest.fn() as unknown as jest.Mocked<DocumentClient>;
  service = new ReadCharactersService(mockedDb);
});

describe("getAllCharacters()", () => {
  describe("when there is no additional pagination params", () => {
    beforeEach(async () => {
      mockedDb.query = jest.fn().mockImplementation(() => ({
        promise: async () => ({
          Items: characters,
          LastEvaluatedKey: undefined,
        }),
      }));

      result = await service.getAllCharacters({});
    });

    it("should return paginated items", () => {
      expect(result).toMatchInlineSnapshot(`
{
  "items": [
    {
      "constSortKey": "1",
      "createdAtTimestamp": 555,
      "episodes": [],
      "firstName": "John",
      "id": "123",
      "lastName": "Snow",
      "updatedAtTimestamp": 666,
    },
    {
      "constSortKey": "1",
      "createdAtTimestamp": 222,
      "episodes": [
        "New Hope 999",
      ],
      "firstName": "Bill",
      "id": "456",
      "lastName": "Summer",
      "updatedAtTimestamp": 333,
    },
  ],
  "limit": 20,
  "nextId": undefined,
}
`);
    });

    it("should pass correct params to db", () => {
      expect(mockedDb.query).toHaveBeenCalledTimes(1);
      expect(mockedDb.query.mock.calls[0][0]).toMatchInlineSnapshot(`
{
  "ExclusiveStartKey": undefined,
  "ExpressionAttributeValues": {
    ":constSortKey": "1",
  },
  "IndexName": "characterCreatedAtSortIndex",
  "KeyConditionExpression": "constSortKey = :constSortKey",
  "Limit": 20,
  "TableName": "Characters",
}
`);
    });
  });

  describe("when pagination params are passed", () => {
    beforeEach(async () => {
      mockedDb.get = jest.fn().mockImplementationOnce(() => ({
        promise: async () => ({ Item: characters[0] }),
      }));

      mockedDb.query = jest.fn().mockImplementationOnce(() => ({
        promise: async () => ({
          Items: [characters[1]],
          LastEvaluatedKey: undefined,
        }),
      }));

      result = await service.getAllCharacters({
        limit: 1,
        nextId: "123",
      });
    });

    it("should return paginated items", () => {
      expect(result).toMatchInlineSnapshot(`
{
  "items": [
    {
      "constSortKey": "1",
      "createdAtTimestamp": 222,
      "episodes": [
        "New Hope 999",
      ],
      "firstName": "Bill",
      "id": "456",
      "lastName": "Summer",
      "updatedAtTimestamp": 333,
    },
  ],
  "limit": 1,
  "nextId": undefined,
}
`);
    });
    it("should pass correct params to db", () => {
      expect(mockedDb.query).toHaveBeenCalledTimes(1);
      expect(mockedDb.query.mock.calls[0][0]).toMatchInlineSnapshot(`
{
  "ExclusiveStartKey": {
    "constSortKey": "1",
    "createdAtTimestamp": 555,
    "id": "123",
  },
  "ExpressionAttributeValues": {
    ":constSortKey": "1",
  },
  "IndexName": "characterCreatedAtSortIndex",
  "KeyConditionExpression": "constSortKey = :constSortKey",
  "Limit": 1,
  "TableName": "Characters",
}
`);
    });
  });

  describe("when nextId param does not point to existing character", () => {
    beforeEach(async () => {
      mockedDb.get = jest.fn().mockImplementationOnce(() => ({
        promise: async () => ({ Item: undefined }),
      }));

      result = await service.getAllCharacters({
        limit: 1,
        nextId: "123",
      });
    });

    it("should return empty list", () => {
      expect(result).toMatchInlineSnapshot(`
{
  "items": [],
  "limit": 1,
}
`);
    });
  });

  describe("when passed limit is above 20", () => {
    beforeEach(async () => {
      mockedDb.query = jest.fn().mockImplementation(() => ({
        promise: async () => ({
          Items: characters,
          LastEvaluatedKey: undefined,
        }),
      }));

      await service.getAllCharacters({
        limit: 999,
      });
    });

    it("should search limit equal to 20", () => {
      expect((mockedDb.query.mock.calls[0][0] as any).Limit).toEqual(20);
    });
  });
});

describe("getCharacter()", () => {
  beforeEach(async () => {
    mockedDb.get = jest.fn().mockImplementationOnce(() => ({
      promise: async () => ({ Item: characters[0] }),
    }));

    result = await service.getCharacter("123");
  });
  it("should character model", () => {
    expect(result).toMatchInlineSnapshot(`
{
  "constSortKey": "1",
  "createdAtTimestamp": 555,
  "episodes": [],
  "firstName": "John",
  "id": "123",
  "lastName": "Snow",
  "updatedAtTimestamp": 666,
}
`);
  });

  it("should pass proper params to query", () => {
    expect(mockedDb.get).toHaveBeenCalledTimes(1);
    expect(mockedDb.get.mock.calls[0][0]).toMatchInlineSnapshot(`
{
  "Key": {
    "id": "123",
  },
  "TableName": "Characters",
}
`);
  });
});
