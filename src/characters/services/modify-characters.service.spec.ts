import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { CharacterModel } from "../models/character.model";
import { ModifyCharactersService } from "./modify-characters.service";

const mockedId = "mocked-uuid";
const mockDate = new Date(1610406000000);

jest.mock("uuid", () => ({ v4: () => mockedId }));
jest.useFakeTimers().setSystemTime(mockDate);

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

let service: ModifyCharactersService;
let result: unknown;

beforeEach(() => {
  mockedDb = jest.fn() as unknown as jest.Mocked<DocumentClient>;
  service = new ModifyCharactersService(mockedDb);
});

describe("createCharacter()", () => {
  beforeEach(async () => {
    mockedDb.put = jest.fn().mockImplementationOnce(() => ({
      promise: async () => {},
    }));

    result = await service.createCharacter({
      episodes: ["New hope"],
      firstName: "Michal",
      lastName: "Nowak",
    });
  });

  it("should return id of the created entity", () => {
    expect(result).toEqual(mockedId);
  });

  it("should pass proper params to query", () => {
    expect(mockedDb.put).toHaveBeenCalledTimes(1);
    expect(mockedDb.put.mock.calls[0][0]).toMatchInlineSnapshot(`
{
  "Item": {
    "constSortKey": "1",
    "createdAtTimestamp": 1610406000000,
    "episodes": [
      "New hope",
    ],
    "firstName": "Michal",
    "id": "mocked-uuid",
    "lastName": "Nowak",
    "updatedAtTimestamp": 1610406000000,
  },
  "TableName": "Characters",
}
`);
  });
});

describe("updateCharacter()", () => {
  beforeEach(async () => {
    mockedDb.update = jest.fn().mockImplementationOnce(() => ({
      promise: async () => {},
    }));

    result = await service.updateCharacter(mockedId, {
      episodes: ["New hope 894"],
      firstName: "John",
      lastName: "Kowalski",
    });
  });

  it("should return id of the created entity", () => {
    expect(result).toEqual(mockedId);
  });

  it("should pass proper params to query", () => {
    expect(mockedDb.update).toHaveBeenCalledTimes(1);
    expect(mockedDb.update.mock.calls[0][0]).toMatchInlineSnapshot(`
{
  "ExpressionAttributeValues": {
    ":episodes": [
      "New hope 894",
    ],
    ":firstName": "John",
    ":lastName": "Kowalski",
  },
  "Key": {
    "id": "mocked-uuid",
  },
  "ReturnValues": "ALL_NEW",
  "TableName": "Characters",
  "UpdateExpression": "set episodes = :episodes,firstName = :firstName,lastName = :lastName",
}
`);
  });

  describe("when only some properties are needed to be updated", () => {
    beforeEach(async () => {
      mockedDb.update = jest.fn().mockImplementationOnce(() => ({
        promise: async () => {},
      }));

      result = await service.updateCharacter(mockedId, {
        episodes: ["New hope 666"],
        firstName: "Adam",
      });
    });

    it("should include only those properties in query", () => {
      expect(mockedDb.update).toHaveBeenCalledTimes(1);
      expect(mockedDb.update.mock.calls[0][0]).toMatchInlineSnapshot(`
{
  "ExpressionAttributeValues": {
    ":episodes": [
      "New hope 666",
    ],
    ":firstName": "Adam",
  },
  "Key": {
    "id": "mocked-uuid",
  },
  "ReturnValues": "ALL_NEW",
  "TableName": "Characters",
  "UpdateExpression": "set episodes = :episodes,firstName = :firstName",
}
`);
    });
  });
});

describe("deleteCharacter()", () => {
  beforeEach(async () => {
    mockedDb.delete = jest.fn().mockImplementationOnce(() => ({
      promise: async () => {},
    }));

    result = await service.deleteCharacter(mockedId);
  });

  it("should return nothing", () => {
    expect(result).toBeUndefined();
  });

  it("should pass proper params to query", () => {
    expect(mockedDb.delete).toHaveBeenCalledTimes(1);
    expect(mockedDb.delete.mock.calls[0][0]).toMatchInlineSnapshot(`
{
  "Key": {
    "id": "mocked-uuid",
  },
  "TableName": "Characters",
}
`);
  });
});
