import { Request, Response, NextFunction } from "express";
import { CreateIotDeviceUseCase } from "../../../application/use-cases/iot-device/create.iot.device.usecase";
import { IotDeviceRepository } from "../../../domain/repositories/iot.device.repository";
import { logger } from "../../../utils/logging";

export class IotDeviceController {
    constructor(private readonly repository: IotDeviceRepository) {}
    
    async create (req: Request, res: Response, next: NextFunction) : Promise<void>  {
        try {
            logger.debug('Enter IotDeviceController.create()')
            const createUseCase = new CreateIotDeviceUseCase(this.repository)
            const {
                name,
                type,
                metadata
            } = req.body; 

            const iot_device = await createUseCase.execute(name, type, metadata);

            res.status(201).json({ message: "Device created successfully", iot_device });
        } catch (error) {
            next(error)
        }
    }
}