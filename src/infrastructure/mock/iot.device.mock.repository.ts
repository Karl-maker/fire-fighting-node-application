import { IotDeviceRepository } from "../../repositories/iot.device.repository";
import { IotDevice } from "../../entities/iot.device.entity";

export const mockIotDeviceRepository = (): jest.Mocked<IotDeviceRepository> => ({
    save: jest.fn(async (device: IotDevice) => ({
        ...device, // Return the same input with additional fields if needed
        id: device.id ?? "generated-id", // Simulate an ID being assigned if not provided
        createdAt: device.createdAt ?? new Date(),
        updatedAt: new Date(),
    })),
});
