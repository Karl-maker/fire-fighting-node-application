import { IotDeviceRepository } from "../domain/repositories/iot.device.repository";
import { iotDeviceRoutes } from "./http/routes/iot.device.routes";
import { Express } from "express";

export class Routes {
    constructor(
        private readonly iotDeviceRepository : IotDeviceRepository
    ) {}

    register(app: Express) {
        app.use(
            iotDeviceRoutes(this.iotDeviceRepository)
        )
    }
}