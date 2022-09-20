/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  rootDir: "./src",
  testMatch: ["**/*.spec.ts"],
  moduleFileExtensions: ["js", "ts"],
  testPathIgnorePatterns: ["node_modules"],
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/$1",
  },
};
