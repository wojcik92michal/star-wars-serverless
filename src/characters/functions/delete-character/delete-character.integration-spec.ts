import { APP_LOCAL_URL } from "@app/consts";
import { db } from "@app/database";
import { clearTable } from "@app/test-utils/helpers/clear-table";
import request from "supertest";
import {
  modifyCharactersService,
  readCharactersService,
} from "../../characters.provider";
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
      .delete("/dev/character/unknown-id")
      .expect(404);

    expect(result.body).toMatchInlineSnapshot(`{}`);
  });
});

describe("when the character exists", () => {
  let id: string;

  beforeEach(async () => {
    id = await modifyCharactersService.createCharacter({
      firstName: "John",
      lastName: "Nowak",
      episodes: ["New hope"],
    });
  });

  it("should delete it and return empty success response", async () => {
    const result = await request(APP_LOCAL_URL)
      .delete(`/dev/character/${id}`)
      .expect(204);

    expect(result.body).toMatchInlineSnapshot(`""`);

    const character = await readCharactersService.getCharacter(id);

    expect(character).toBeUndefined();
  });
});
