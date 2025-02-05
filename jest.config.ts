import type { Config } from "jest";

// Jest configuration
const config: Config = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], // Using ts-jest to transform TypeScript files
  },
  testMatch: ["**/*.test.ts"], // Matches only .test.ts files for unit tests
};

export default config;
