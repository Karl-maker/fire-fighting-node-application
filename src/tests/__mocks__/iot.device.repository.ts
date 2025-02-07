import { IotDeviceRepository } from "../../domain/repositories/iot.device.repository";
import { IotDevice } from "../../domain/entities/iot.device.entity";
import { IotDeviceSortBy, IotDeviceFilterBy } from "../../domain/types/types/ios.device.type";
import { FindParams, FindResponse } from "../../domain/types/types/repository.type";

export class MockIotDeviceRepository implements IotDeviceRepository {
    find(params?: FindParams<IotDeviceSortBy, IotDeviceFilterBy> | undefined): Promise<FindResponse<IotDevice>> {
        throw new Error("Method not implemented.");
    }
    // Mock the save method to return a resolved promise with a device that includes an id
    save(device: IotDevice): Promise<IotDevice> {
        return Promise.resolve({
            ...device,
        });
    }

    // Optionally, you can also mock other methods of the repository if they are used in tests
}
