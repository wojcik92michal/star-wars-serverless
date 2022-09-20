import { createDbClient } from "./create-db-client";

let originalNodeEnv: Record<string, any>;
let mockedDbFactory: jest.Mock;

beforeEach(() => {
  mockedDbFactory = jest.fn();

  originalNodeEnv = {
    ...process.env,
  };
});

afterEach(() => {
  originalNodeEnv = {
    ...process.env,
  };

  process.env = {
    ...originalNodeEnv,
  };
});

describe("when app is in offline mode", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "not-test";
    process.env.IS_OFFLINE = "true";
  });

  it("should create a local database", () => {
    createDbClient(mockedDbFactory);

    expect(mockedDbFactory).toHaveBeenCalledTimes(1);
    expect(mockedDbFactory.mock.calls[0]).toMatchInlineSnapshot(`
[
  {
    "endpoint": "http://localhost:4000",
    "region": "localhost",
  },
]
`);
  });
});

describe("when app is in test mode", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "test";
  });

  it("should create a local database", () => {
    createDbClient(mockedDbFactory);

    expect(mockedDbFactory).toHaveBeenCalledTimes(1);
    expect(mockedDbFactory.mock.calls[0]).toMatchInlineSnapshot(`
[
  {
    "endpoint": "http://localhost:4000",
    "region": "localhost",
  },
]
`);
  });
});

describe("when app is in production mode", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "not-test";
    process.env.IS_OFFLINE = undefined;
  });

  it("should create production instance without local options", () => {
    createDbClient(mockedDbFactory);

    expect(mockedDbFactory).toHaveBeenCalledTimes(1);
    expect(mockedDbFactory.mock.calls[0]).toMatchInlineSnapshot(`[]`);
  });
});
