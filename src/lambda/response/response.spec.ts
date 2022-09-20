import {
  formatJSONResponse,
  notFoundException,
  unexpectedErrorException,
} from "./response";

describe("formatJSONResponse()", () => {
  it("should create format response", () => {
    expect(
      formatJSONResponse(
        {
          someValue: "abcdef",
        },

        200,
        "All ok"
      )
    ).toMatchInlineSnapshot(`
{
  "body": {
    "someValue": "abcdef",
  },
  "message": "All ok",
  "statusCode": 200,
}
`);
  });
});

describe("unexpectedErrorException()", () => {
  it("should return object appropriate for unexpected error", () => {
    expect(unexpectedErrorException()).toMatchInlineSnapshot(`
{
  "body": undefined,
  "message": "Unexpected server error!",
  "statusCode": 500,
}
`);
  });
});

describe("notFoundException()", () => {
  it("should return object appropriate for not found error", () => {
    expect(notFoundException()).toMatchInlineSnapshot(`
{
  "body": undefined,
  "message": "Item not found!",
  "statusCode": 404,
}
`);
  });
});
