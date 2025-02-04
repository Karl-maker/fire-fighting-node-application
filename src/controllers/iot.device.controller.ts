import { Request, Response, NextFunction } from "express";
import { CreateIotDeviceUseCase } from "../use-cases/iot-device/create.iot.device.usecase";

export class IotDeviceController {
    constructor() {
        
    }
    
    create (createUseCase: CreateIotDeviceUseCase) {
        return async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
            try {
    
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
}