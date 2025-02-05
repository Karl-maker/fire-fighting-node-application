import { DeviceStatus, DeviceType } from "../domain/types/enums/iot.device.enum";
import { Entity } from "../domain/types/interfaces/base.entity";
import { IotDeviceConstructorInput } from "../domain/types/types/ios.device.type";
import { Location } from "../domain/types/types/location.type";

/**
 * @author Karl-Johan Bailey
 * @desc IoT Devices that are used in homes and property to help with fires including sensors, valves and other items. 
 * @created 03/02/2025
 */

export class IotDevice implements Entity {
    id!: string | null;
    name!: string;
    type!: DeviceType;
    firmwareVersion!: string;
    status!: DeviceStatus;
    lastSeenAt!: Date | null;
    ipAddress!: string | null;
    position!: string | null;
    location!: Location | null;
    metadata!: Record<string, string | number>;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(params: IotDeviceConstructorInput) {
        Object.assign(this, params);
    }
}