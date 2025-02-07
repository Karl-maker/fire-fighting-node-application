import { IotDeviceRepository } from "../../domain/repositories/iot.device.repository";
import { DeviceStatus } from "../../domain/types/enums/iot.device.enum";
import { IotDevice } from "../../domain/entities/iot.device.entity";
import { mapDeviceType } from "../../utils/iot-device/map.device.type.util";
import { FindIotDeviceUseCase } from "../../application/use-cases/iot-device/find.iot.device.usecase";

jest.mock("../../domain/repositories/iot.device.repository");

describe("FindIotDeviceUseCase", () => {
    let useCase: FindIotDeviceUseCase;
    let repository: jest.Mocked<IotDeviceRepository>;  // Mock the repository interface

    beforeEach(() => {
        repository = {
            save: jest.fn(), 
            find: jest.fn(), 
        } as jest.Mocked<IotDeviceRepository>;
        useCase = new FindIotDeviceUseCase(repository);
    });

    it("should return IoT devices and pagination details", async () => {
        const mockDevices = [
            new IotDevice({
                id: '1',
                name: "Test Device 1",
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
            }),
            new IotDevice({
                id: '2',
                name: "Test Device 2",
                type: mapDeviceType("valve"),
                status: DeviceStatus.MAINTENANCE,
                firmwareVersion: "",
                lastSeenAt: null,
                ipAddress: null,
                position: null,
                location: null,
                metadata: {},
                createdAt: new Date(),
                updatedAt: new Date()
            }),
        ];
        
        repository.find.mockResolvedValue({
            data: mockDevices,
            pagination: {
                totalItems: 100, 
                totalPages: 10, 
                currentPage: 1,
                pageSize: 10
            }
        });  

        const result = await useCase.execute();

        expect(result).toEqual({
            data: mockDevices,
            pagination: {
                totalItems: 100, 
                totalPages: 10, 
                currentPage: 1,
                pageSize: 10
            }
        });
        
        expect(repository.find).toHaveBeenCalledWith({
            sortBy: 'createdAt',
            sortOrder: 'asc',
            pageNumber: 1,
            pageSize: 10
        }); 
    });

    it("should throw an error if the repository throws an error", async () => {
        const errorMessage = "Error fetching IoT devices";
        repository.find.mockRejectedValue(new Error(errorMessage));

        await expect(useCase.execute()).rejects.toThrowError(errorMessage);

        expect(repository.find).toHaveBeenCalledWith({
            sortBy: 'createdAt',
            sortOrder: 'asc',
            pageNumber: 1,
            pageSize: 10
        });
    });

    it("should throw an error if the repository throws a database connection error", async () => {
        const errorMessage = "Database connection error";
        repository.find.mockRejectedValueOnce(new Error(errorMessage));

        await expect(useCase.execute()).rejects.toThrowError(errorMessage);
    });

    it("should not throw an error if no data is found)", async () => {
        repository.find.mockResolvedValueOnce({
            data: [],
            pagination: {
                totalItems: 0,
                totalPages: 0,
                currentPage: 1,
                pageSize: 10
            }
        });

        const result = await useCase.execute();

        expect(result).toEqual({
            data: [],
            pagination: {
                totalItems: 0,
                totalPages: 0,
                currentPage: 1,
                pageSize: 10
            }
        });
    });
});
