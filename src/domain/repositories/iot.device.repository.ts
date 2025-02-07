import { IotDevice } from "../entities/iot.device.entity";
import { IotDeviceFilterBy, IotDeviceSortBy } from "../types/types/ios.device.type";
import { Repository } from "./repository";

export interface IotDeviceRepository extends Repository<
    IotDevice,
    IotDeviceSortBy,
    IotDeviceFilterBy
> {}