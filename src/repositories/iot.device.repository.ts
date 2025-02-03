import { IotDevice } from "../entities/iot.device.entity";

export interface IotDeviceRepository {
    save(device: IotDevice): Promise<IotDevice>;
}