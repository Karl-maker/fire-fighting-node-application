import express from "express";
import { IotDeviceController } from "../controllers/iot.device.controller";
import { CreateIotDeviceUseCase } from "../../../application/use-cases/iot-device/create.iot.device.usecase";
import { IOT_DEVICE_ROUTE } from "../../../domain/constants/routes";
import { IotDeviceRepository } from "../../../domain/repositories/iot.device.repository";

const router = express.Router();

export const iotDeviceRoutes = (repository: IotDeviceRepository) => {
    const controller = new IotDeviceController(repository);
    router.post(IOT_DEVICE_ROUTE, controller.create.bind(controller)); 
    return router;
};
