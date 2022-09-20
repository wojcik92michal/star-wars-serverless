import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DB_LOCAL_URL } from "../consts/app.const";

const defaultCreateDbFactory = (
  options?: DocumentClient.DocumentClientOptions &
    AWS.DynamoDB.Types.ClientConfiguration
) => new AWS.DynamoDB.DocumentClient(options);

export const createDbClient = (
  createDbFactory = defaultCreateDbFactory
): DocumentClient => {
  if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    return createDbFactory({
      region: "localhost",
      endpoint: DB_LOCAL_URL,
    });
  }
  return createDbFactory();
};
