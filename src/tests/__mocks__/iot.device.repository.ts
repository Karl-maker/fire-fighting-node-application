import { IotDeviceRepository } from "../../domain/repositories/iot.device.repository";
import { IotDevice } from "../../domain/entities/iot.device.entity";

export class MockIotDeviceRepository implements IotDeviceRepository {
    // Mock the save method to return a resolved promise with a device that includes an id
    save(device: IotDevice): Promise<IotDevice> {
        return Promise.resolve({
            ...device,
        });
    }

    // Optionally, you can also mock other methods of the repository if they are used in tests
}
