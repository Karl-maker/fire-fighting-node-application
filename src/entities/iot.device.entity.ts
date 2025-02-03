import { DeviceStatus, DeviceType } from "../types/enums/iot.device.enum";
import { Entity } from "../types/interfaces/base.entity";
import { IotDeviceConstructorInput } from "../types/types/ios.device.type";

/**
 * @author Karl-Johan Bailey
 * @desc IoT Devices that are used in homes and property to help with fires including sensors, valves and other items. 
 * @created 03/02/2025
 */

export class IotDevice implements Entity {
    id: string | null;
    name: string;
    deviceType: DeviceType;
    firmwareVersion: string;
    status: DeviceStatus;
    lastSeenAt: Date | null;
    ipAddress: string | null;
    position: string;
    location: string | null;
    metadata: Record<string, string | number>;
    createdAt: Date;
    updatedAt: Date;

    constructor(params: IotDeviceConstructorInput) {
        Object.assign(this, params);
    }
}