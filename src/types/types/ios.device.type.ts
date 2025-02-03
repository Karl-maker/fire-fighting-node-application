import { DeviceStatus, DeviceType } from "../enums/iot.device.enum";

export type IotDeviceConstructorInput = {
    id: string | null;
    name: string;
    type: DeviceType;
    firmwareVersion: string;
    status: DeviceStatus;
    lastSeenAt: Date | null;
    ipAddress: string | null;
    position: string | null;
    location: string | null;
    metadata: Record<string, string | number>;
    createdAt: Date;
    updatedAt: Date;
}