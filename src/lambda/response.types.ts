import type { APIGatewayProxyEvent } from "aws-lambda";

export type ValidatedEvent<
  Body = null,
  QueryStringParams = {},
  PathParams = {}
> = Omit<
  APIGatewayProxyEvent,
  "body" | "queryStringParameters" | "pathParameters"
> & {
  body: Body;
  queryStringParameters: QueryStringParams;
  pathParameters: PathParams;
};

export type ApiResponse<T> = {
  statusCode: number;
  body: T;
};

export type PaginatedApiResponse<T> = {
  statusCode: number;
  body: {
    limit: number;
    items: T[];
    nextId?: string;
  };
};
