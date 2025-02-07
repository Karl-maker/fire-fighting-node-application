import express, { ErrorRequestHandler } from "express";
import { iotDeviceRoutes } from "../interfaces/http/routes/iot.device.routes";
import { configuration } from "../config";
import { IotDeviceMongooseRepository } from "../infrastructure/mongoose/repositories/iot.device.mongoose.repository";
import { Database } from "../config/database";
import { logger } from "../utils/logging";
import { Routes } from "./routes";
import errorHandler from "./middlewares/error.middleware";

export const app = express();

// Initialize the server without starting it automatically
export const initializeServer = async () => {
    await Database.connect(configuration.MONGO_URI); // Connect to MongoDB
    const connection = Database.getConnection();
    const iotDeviceRepository = new IotDeviceMongooseRepository(connection);
    const routes = new Routes(
        iotDeviceRepository
    )
    
    app.use(express.json());
    routes.register(app)
    app.use(errorHandler as unknown as ErrorRequestHandler)

    return app;
};

// Only start the server when not in test mode
if (process.env.NODE_ENV !== "test") {
    (async () => {
        await initializeServer();
        app.listen(configuration.PORT, () => {
            logger.log(`🚀 Server running on port: ${configuration.PORT}`);
        });
    })();
}
