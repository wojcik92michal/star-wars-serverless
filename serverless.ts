import {
  createCharacter,
  deleteCharacter,
  getAllCharacters,
  getCharacter,
  updateCharacter,
} from "@app/characters";
import type { AWS } from "@serverless/typescript";
import { swaggerDefinitions } from "./swagger-types";

const serverlessConfiguration: AWS = {
  service: "star-wars-serverless",
  frameworkVersion: "3",
  plugins: [
    "serverless-auto-swagger",
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource: "arn:aws:dynamodb:eu-central-1:*:table/Characters*",
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    getCharacter,
    deleteCharacter,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
      watch: {
        pattern: ["src/**/*.ts"],
        ignore: [".esbuild", "node_modules", ".dynamodb"],
      },
    },
    dynamodb: {
      start: {
        port: 4000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev",
    },
    autoswagger: {
      // typefiles does not allow to find files by pattern (e.g. *.dto.ts)...
      typefiles: [...swaggerDefinitions],
    },
  },
  resources: {
    Resources: {
      Characters: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Characters",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
            {
              AttributeName: "createdAtTimestamp",
              AttributeType: "N",
            },
            {
              AttributeName: "constSortKey",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: "characterCreatedAtSortIndex",
              Projection: {
                ProjectionType: "ALL",
              },
              KeySchema: [
                {
                  AttributeName: "constSortKey",
                  KeyType: "HASH",
                },
                {
                  AttributeName: "createdAtTimestamp",
                  KeyType: "RANGE",
                },
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
              },
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};
module.exports = serverlessConfiguration;
