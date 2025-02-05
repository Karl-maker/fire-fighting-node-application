import { DeviceStatus } from "../../domain/types/enums/iot.device.enum";

export function mapDeviceStatus(type: string) : DeviceStatus {
    switch (true) {
        case type === 'online':
            return DeviceStatus.ONLINE
        case type === 'offline':
            return DeviceStatus.OFFLINE
        case type === 'error':
            return DeviceStatus.ERROR
        case type === 'maintenance':
            return DeviceStatus.MAINTENANCE
        case type === 'pending':
            return DeviceStatus.PENDING
        default:
            throw new Error('Device status unknown')
    }
}