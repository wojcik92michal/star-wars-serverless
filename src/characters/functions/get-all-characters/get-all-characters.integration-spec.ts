import { APP_LOCAL_URL } from "@app/consts";
import { db } from "@app/database";
import { clearTable } from "@app/test-utils/helpers/clear-table";
import request from "supertest";
import { modifyCharactersService } from "../../characters.provider";
import { DB_TABLE_NAME } from "../../consts/characters.conts";

beforeEach(async () => {
  await clearTable(DB_TABLE_NAME, "id", db);
});

afterAll(async () => {
  await clearTable(DB_TABLE_NAME, "id", db);
});

describe("when there are no characters in the database", () => {
  it("should return the empty list ", async () => {
    const result = await request(APP_LOCAL_URL)
      .get("/dev/character")
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
{
  "items": [],
  "limit": 20,
}
`);
  });
});

describe("when there are characters in the database", () => {
  beforeEach(async () => {
    await modifyCharactersService.createCharacter({
      firstName: "John",
      lastName: "Nowak",
      episodes: ["New hope"],
    });
    await modifyCharactersService.createCharacter({
      firstName: "Adam",
      lastName: "Kowalski",
      episodes: ["New hope 2"],
    });
    await modifyCharactersService.createCharacter({
      firstName: "Tim",
      lastName: "Brown",
      episodes: ["New hope 3"],
    });
  });

  describe("when there is less items than limit", () => {
    it("should return them all", async () => {
      const result = await request(APP_LOCAL_URL)
        .get("/dev/character")
        .expect(200);

      expect(result.body).toMatchInlineSnapshot(`
{
  "items": [
    Object {
         "id": __id__
      "firstName": "John"
      "lastName": "Nowak"
      "episodes": [
            "New hope",
          ]
   },
    Object {
         "id": __id__
      "firstName": "Adam"
      "lastName": "Kowalski"
      "episodes": [
            "New hope 2",
          ]
   },
    Object {
         "id": __id__
      "firstName": "Tim"
      "lastName": "Brown"
      "episodes": [
            "New hope 3",
          ]
   },
  ],
  "limit": 20,
}
`);
    });
  });

  describe("when there is more items than limit", () => {
    it("should return paginated data", async () => {
      const result = await request(APP_LOCAL_URL)
        .get("/dev/character?limit=2")
        .expect(200);

      expect(result.body).toMatchInlineSnapshot(`
Object {
     "items": [
    Object {
         "id": __id__
      "firstName": "John"
      "lastName": "Nowak"
      "episodes": [
          "New hope",
        ]
     },
    Object {
         "id": __id__
      "firstName": "Adam"
      "lastName": "Kowalski"
      "episodes": [
          "New hope 2",
        ]
     },
  ]
  "limit": 2
  "nextId": __nextId__
   }
`);
    });
  });

  describe("when the user wants to get the next page of the data", () => {
    it("should return the next page of the data (the one with Tim Brown)", async () => {
      const firstRequestResult = await request(APP_LOCAL_URL)
        .get("/dev/character?limit=2")
        .expect(200);

      const nextId = firstRequestResult.body.nextId as string;

      expect(nextId).toBeDefined();

      const secondRequestResult = await request(APP_LOCAL_URL)
        .get(`/dev/character?limit=2&nextId=${nextId}`)
        .expect(200);

      expect(secondRequestResult.body).toMatchInlineSnapshot(`
{
  "items": [
    Object {
         "id": __id__
      "firstName": "Tim"
      "lastName": "Brown"
      "episodes": [
            "New hope 3",
          ]
   },
  ],
  "limit": 2,
}
`);
    });
  });
});
