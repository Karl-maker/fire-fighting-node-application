import { CreateIotDeviceUseCase } from "../../application/use-cases/iot-device/create.iot.device.usecase";
import { IotDeviceRepository } from "../../domain/repositories/iot.device.repository";
import { DeviceStatus } from "../../domain/types/enums/iot.device.enum";
import { IotDevice } from "../../domain/entities/iot.device.entity";
import { mapDeviceType } from "../../utils/iot-device/map.device.type.util";

jest.mock("../../domain/repositories/iot.device.repository");

describe("CreateIotDeviceUseCase", () => {
    let useCase: CreateIotDeviceUseCase;
    let repository: jest.Mocked<IotDeviceRepository>;  // Mock the repository interface

    beforeEach(() => {
        repository = {
            save: jest.fn(), 
            find: jest.fn(), 
        } as jest.Mocked<IotDeviceRepository>;
        useCase = new CreateIotDeviceUseCase(repository);
    });

    it("should successfully save a new IoT device", async () => {
        const mockDevice = new IotDevice({
            id: null,
            name: "Test Device",
            type: mapDeviceType("valve"),
            status: DeviceStatus.PENDING,
            firmwareVersion: "",
            lastSeenAt: null,
            ipAddress: null,
            position: null,
            location: null,
            metadata: {},
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        repository.save.mockResolvedValue(mockDevice);  // Mocking successful save

        const result = await useCase.execute("Test Device", "valve");

        expect(result).toEqual(mockDevice);
        expect(repository.save).toHaveBeenCalledWith(expect.any(IotDevice));  // Ensure it's the correct object
    });

    it("should throw an error when save fails", async () => {
        repository.save.mockRejectedValue(new Error("Save failed"));  // Simulate a failure

        await expect(useCase.execute("Test Device", "valve"))
            .rejects
            .toThrow("Save failed");  // Verify the error

        expect(repository.save).toHaveBeenCalledWith(expect.any(IotDevice));  // Ensure it's still called
    });

    it("should throw an error when invalid type is provided", async () => {
        await expect(useCase.execute("Test Device", "invalid-type"))
            .rejects
            .toThrow("Device type unknown");  // Ensure it throws for an invalid type

        expect(repository.save).not.toHaveBeenCalled();  // Ensure save was not called
    });

    it("should throw an error when name is empty", async () => {
        await expect(useCase.execute("", "valve"))
            .rejects
            .toThrow("Name cannot be empty");  // Verify that empty name causes an error

        expect(repository.save).not.toHaveBeenCalled();  // Ensure save was not called
    });

    it("should throw an error when metadata has invalid data", async () => {
        const invalidMetadata = { invalidKey: NaN };  // Example of invalid metadata
        
        await expect(useCase.execute("Test Device", "valve", invalidMetadata))
            .rejects
            .toThrow("Invalid metadata");  // Ensure error is thrown for invalid metadata

        expect(repository.save).not.toHaveBeenCalled();  // Ensure save was not called
    });

    it("should pass with default empty metadata when not provided", async () => {
        const mockDevice = new IotDevice({
            id: null,
            name: "Test Device",
            type: mapDeviceType("valve"),
            status: DeviceStatus.PENDING,
            firmwareVersion: "",
            lastSeenAt: null,
            ipAddress: null,
            position: null,
            location: null,
            metadata: {},
            createdAt: new Date(),
            updatedAt: new Date()
        });

        repository.save.mockResolvedValue(mockDevice);  // Mocking successful save

        const result = await useCase.execute("Test Device", "valve");

        expect(result).toEqual(mockDevice);  // Check that the result matches the mock device
        expect(repository.save).toHaveBeenCalledWith(expect.any(IotDevice));  // Ensure save was called correctly
    });
});
