/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  rootDir: "./src",
  testMatch: ["**/*.integration-spec.ts"],
  moduleFileExtensions: ["js", "ts"],
  testPathIgnorePatterns: ["node_modules"],
  snapshotSerializers: [
    "<rootDir>/test-utils/serializers/fields-with-random-values-serializer.js",
  ],
  globalSetup: "<rootDir>/test-utils/helpers/global-setup.ts",
  globalTeardown: "<rootDir>/test-utils/helpers/global-teardown.ts",
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/$1",
  },
};
