import { Request, Response, NextFunction } from "express";
import { ValidationException } from "../../application/exceptions/validation.exception";
import { logger } from "../../utils/logging";

/**
 * @author Karl-Johan Bailey
 * Express error handling middleware.
 * Uses a switch to determine error type and respond accordingly.
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.name}: ${err.message}`);

    switch (true) {
        case err.name === 'ValidationException':
            res.status(400).json({ error: "Validation Error", message: err.message });
            break;

        // Handle Mongoose/Prisma validation errors
        case err.name === "ValidationError":
            res.status(400).json({ error: "Bad Request", message: err.message });
            break;

        case err.name === "MongoError" && err.code === 11000:
            res.status(409).json({ error: "Duplicate Entry", message: "Resource already exists." });
            break;

        // Handle authentication errors
        case err.name === "UnauthorizedError":
            res.status(401).json({ error: "Unauthorized", message: "Invalid token or missing credentials." });
                        break;

        // Handle generic server errors
        default:
            res.status(500).json({ error: "Internal Server Error", message: "An unexpected error occurred." });
            break;
    }
};

export default errorHandler;
