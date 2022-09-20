# Star wars Serverless

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation and setup

> **Requirements**: NodeJS `v16.17.0`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

- Run `yarn` to install the project dependencies
- Run `yarn setup` to install and setup other dependencies

## Deployment

- Run `yarn deploy:dev` to deploy the dev stack to AWS
- Run `yarn destroy:dev` to destroy the dev stack

## Testing

- Run `yarn test:unit` to run unit tests
- Run `yarn test:unit:watch` to run unit tests in watch mode
- Run `yarn test:integration` to run integration tests
- Run `yarn test:all` to run both unit and integration tests

## Local development

In order to start the application in the development mode (watch for changes and with local database) run `yarn start:dev`.

## Swagger

Run application locally and enter in your browser `http://localhost:3000/dev/swagger`.

#### Swagger types

Due to the fact that `serverless-auto-swagger` does not allow to find model files by pattern (e.g. `*.dto.ts`), a helper script was written to generate those for you. It creates `swagger-types.ts` file that contains paths to all `.dto.ts` files. To run in, type `swagger:generate-types`.
