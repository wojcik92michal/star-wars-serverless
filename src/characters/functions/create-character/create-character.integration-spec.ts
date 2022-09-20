import request from "supertest";
import { db } from "@app/database";
import { clearTable } from "../../../test-utils/helpers/clear-table";
import { APP_LOCAL_URL } from "@app/consts";
import { DB_TABLE_NAME } from "@app/characters/consts/characters.conts";

beforeEach(async () => {
  await clearTable(DB_TABLE_NAME, "id", db);
});

afterAll(async () => {
  await clearTable(DB_TABLE_NAME, "id", db);
});

describe("when the required character data is not passed", () => {
  it("should 400 http error with empty body", async () => {
    const result = await request(APP_LOCAL_URL)
      .post("/dev/character")
      .expect(400);

    expect(result.body).toMatchInlineSnapshot(`{}`);
  });
});

describe("when the valid character data is passed", () => {
  it("should create a new character", async () => {
    const result = await request(APP_LOCAL_URL)
      .post("/dev/character")
      .send({
        firstName: "Michael",
        lastName: "Wayne",
        episodes: ["New Hope"],
      })
      .expect(200);

    expect(result.body).toMatchInlineSnapshot(`
{
  "character": Object {
       "id": __id__
    "firstName": "Michael"
    "lastName": "Wayne"
    "episodes": [
        "New Hope",
      ]
   },
}
`);
  });
});
