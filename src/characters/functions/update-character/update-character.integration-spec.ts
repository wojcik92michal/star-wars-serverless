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

describe("when the character is not found", () => {
  it("should return 404 error", async () => {
    const result = await request(APP_LOCAL_URL)
      .put("/dev/character/unknown-id")
      .send({
        firstName: "Michael",
        lastName: "Wayne",
        episodes: ["New Hope"],
      })
      .expect(404);

    expect(result.body).toMatchInlineSnapshot(`{}`);
  });
});

describe("when the valid character data is passed", () => {
  let id: string;

  beforeEach(async () => {
    id = await modifyCharactersService.createCharacter({
      firstName: "John",
      lastName: "Nowak",
      episodes: ["New hope"],
    });
  });

  it("should update a new character", async () => {
    const result = await request(APP_LOCAL_URL)
      .put(`/dev/character/${id}`)
      .send({
        firstName: "Michael",
        lastName: "Wayne",
        episodes: ["Old hope"],
      })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
{
  "character": Object {
       "id": __id__
    "firstName": "Michael"
    "lastName": "Wayne"
    "episodes": [
        "Old hope",
      ]
   },
}
`);
  });
});
