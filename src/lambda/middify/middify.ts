import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import httpResponseSerializer from "@middy/http-response-serializer";
import validator from "@middy/validator";
import type { Handler } from "aws-lambda";
import { JSONSchema } from "json-schema-to-ts";

export const middyfy = (handler: Handler, schema?: JSONSchema) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(httpEventNormalizer())
    .use(
      validator({
        inputSchema: schema ?? {},
      })
    )
    .use(
      httpResponseSerializer({
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
        ],
        defaultContentType: "application/json",
      })
    )
    .use(httpErrorHandler());
};
