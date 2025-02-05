import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const configuration = {
    PORT: process.env.PORT ?? 3000,
    NODE_ENV: process.env.NODE_ENV ?? "development",
    MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/database",
    TEST_MONGO_URI: process.env.TEST_MONGO_URI ?? process.env.MONGO_URI ?? "mongodb://localhost:27017/database",
};
