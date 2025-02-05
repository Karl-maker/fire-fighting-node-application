import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"], // Matches only .spec.ts files for E2E tests
  clearMocks: true,
//   globalSetup: "<rootDir>/tests/setup/global-setup.ts", // Optional: Use for global setup before running tests
//   globalTeardown: "<rootDir>/tests/setup/global-teardown.ts", // Optional: Use for global teardown after tests
};

export default config;
