import { buildUpdateQuery } from "./build-update-query";

it("should produce valid part of Dynamodb query", () => {
  expect(
    buildUpdateQuery(
      {
        name: "John",
        surname: "Lucas",
      },
      ["name", "surname"]
    )
  ).toMatchInlineSnapshot(`
{
  "ExpressionAttributeValues": {
    ":name": "John",
    ":surname": "Lucas",
  },
  "UpdateExpression": "set name = :name,surname = :surname",
}
`);
});

it("should not take into consideration unexpected fields in data", () => {
  expect(
    buildUpdateQuery(
      {
        name: "John",
        surname: "Lucas",
        age: 123,
      },

      ["name", "surname"]
    )
  ).toMatchInlineSnapshot(`
{
  "ExpressionAttributeValues": {
    ":name": "John",
    ":surname": "Lucas",
  },
  "UpdateExpression": "set name = :name,surname = :surname",
}
`);
});
