import { IotDevice } from "../../entities/iot.device.entity";
import { IotDeviceRepository } from "../../repositories/iot.device.repository";
import { DeviceStatus } from "../../types/enums/iot.device.enum";
import { mapDeviceType } from "../../utils/iot-device/map.device.type.util";
import { isValidMetadata } from "../../utils/validations/valid.metadata.util";

export class CreateIotDeviceUseCase {
    constructor(private repository: IotDeviceRepository) {}

    async execute(name: string, type: string, metadata: Record<string, number> = {}) : Promise<IotDevice> {

        if(!isValidMetadata(metadata)) throw new Error('Invalid metadata')
        if(name === "")  throw new Error('Name cannot be empty')

        const iotDevice = new IotDevice({
            id: null,
            name,
            type: mapDeviceType(type),
            status: DeviceStatus.PENDING,
            firmwareVersion: "",
            lastSeenAt: null,
            ipAddress: null,
            position: null,
            location: null,
            metadata,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        return await this.repository.save(iotDevice)
    }
}