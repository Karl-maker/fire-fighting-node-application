import express from "express";
import { IotDeviceController } from "../controllers/iot.device.controller";
import { CreateIotDeviceUseCase } from "../use-cases/iot-device/create.iot.device.usecase";
import { IotDeviceRepository } from "../repositories/iot.device.repository";
import { container } from "tsyringe";
import { DEVICE_ROUTE } from "../constants/routes";

const router = express.Router();

export const iotDeviceRoutes = () => {
    const createIotDeviceUseCase = container.resolve(CreateIotDeviceUseCase);
    const controller = container.resolve(IotDeviceController);

    router.post(DEVICE_ROUTE, controller.create(createIotDeviceUseCase));

    return router;
};

