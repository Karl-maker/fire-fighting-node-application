import { IotDevice } from "../../../domain/entities/iot.device.entity";
import { IotDeviceRepository } from "../../../domain/repositories/iot.device.repository";
import { IotDeviceFilterBy, IotDeviceSortBy } from "../../../domain/types/types/ios.device.type";
import { FindUseCase } from "../../../domain/use-cases/find.usecase";
import { FindUseCaseBase } from "../base/find.iot.device.usecase.abstract";

export class FindIotDeviceUseCase extends FindUseCaseBase<IotDevice, IotDeviceSortBy, IotDeviceFilterBy> implements FindUseCase<IotDevice, IotDeviceSortBy, IotDeviceFilterBy> {
    constructor(repository: IotDeviceRepository) {
        super(repository)
    }
}