import { IotDevice } from "../../../domain/entities/iot.device.entity";
import { IotDeviceRepository } from "../../../domain/repositories/iot.device.repository";
import { DeviceStatus } from "../../../domain/types/enums/iot.device.enum";
import { mapDeviceType } from "../../../utils/iot-device/map.device.type.util";
import { isValidMetadata } from "../../../utils/validations/valid.metadata.util";
import { ValidationException } from "../../exceptions/validation.exception";

export class CreateIotDeviceUseCase {
    constructor(private repository: IotDeviceRepository) {}

    async execute(name: string, type: string, metadata: Record<string, number> = {}) : Promise<IotDevice> {

        if(!isValidMetadata(metadata)) throw new ValidationException('Invalid metadata')
        if(name === "")  throw new ValidationException('Name cannot be empty')

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