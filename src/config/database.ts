import mongoose, { Connection } from "mongoose";
import { logger } from "../utils/logging";

export class Database {
    private static connection: Connection | null = null;

    static async connect(uri: string): Promise<Connection> {
        if (!this.connection) {
            try {
                const conn = await mongoose.createConnection(uri).asPromise();
                logger.log(`✅ MongoDB connected: ${conn.host}`);
                this.connection = conn;
            } catch (error) {
                logger.error("❌ MongoDB connection error:", error);
                throw error;
            }
        }
        return this.connection;
    }

    static getConnection(): Connection {
        if (!this.connection) {
            throw new Error("Database connection not established. Call `Database.connect()` first.");
        }
        return this.connection;
    }

    static async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
            logger.log("🔌 MongoDB disconnected");
        }
    }
}
