import { fromCharacterModel } from "./character.dto";

it("should map character model to character dto", () => {
  expect(
fromCharacterModel({
  id: "123",
  firstName: "John",
  lastName: "Lucas",
  constSortKey: "1",
  createdAtTimestamp: 123,
  episodes: ["New Hope 123"],
  updatedAtTimestamp: 456 })).

toMatchInlineSnapshot(`
{
  "episodes": [
    "New Hope 123",
  ],
  "firstName": "John",
  "id": "123",
  "lastName": "Lucas",
}
`);
});
