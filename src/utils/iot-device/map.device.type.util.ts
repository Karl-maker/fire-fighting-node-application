import { DeviceType } from "../../domain/types/enums/iot.device.enum";

export function mapDeviceType(type: string) : DeviceType {
    switch (true) {
        case type === 'valve':
            return DeviceType.VALVE

        default:
            throw new Error('Device type unknown')
    }
}