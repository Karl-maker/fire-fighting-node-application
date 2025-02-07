import { IotDevice } from "../../../domain/entities/iot.device.entity";
import { IotDeviceRepository } from "../../../domain/repositories/iot.device.repository";
import { FindResponse } from "../../../domain/types/types/repository.type";

export class FindIotDeviceUseCase {
    constructor(private repository: IotDeviceRepository) {}

    async execute() : Promise<FindResponse<IotDevice>> {
        return await this.repository.find({
            sortBy: 'createdAt',
            sortOrder: 'asc',
            pageNumber: 1,
            pageSize: 10
        })
    }
}