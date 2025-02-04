import { Request, Response, NextFunction } from "express";
import { IotDeviceController } from "../../controllers/iot.device.controller";
import { CreateIotDeviceUseCase } from "../../use-cases/iot-device/create.iot.device.usecase";
import { IotDevice } from "../../entities/iot.device.entity";
import { DeviceStatus, DeviceType } from "../../types/enums/iot.device.enum";

describe("IotDeviceController.create", () => {
    let controller: IotDeviceController;
    let createUseCaseMock: jest.Mocked<CreateIotDeviceUseCase>;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    let handler: (req: Request, res: Response, next: NextFunction) => Promise<void>;

    beforeEach(() => {
        createUseCaseMock = {
            execute: jest.fn()
        } as unknown as jest.Mocked<CreateIotDeviceUseCase>;

        controller = new IotDeviceController();
        handler = controller.create(createUseCaseMock); // Get the request handler function

        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        next = jest.fn();

        req = {
            body: { name: "Temp Sensor", type: DeviceType.VALVE, metadata: { location: "Room 101" } }
        };

        res = {
            status: statusMock
        } as unknown as Response;
    });

    it("should create an IoT device successfully", async () => {
        const mockDevice: IotDevice = {
            id: "123",
            name: "Temp Sensor",
            type: DeviceType.VALVE,
            metadata: { location: "Room 101" },
            firmwareVersion: "",
            status: DeviceStatus.PENDING,
            lastSeenAt: null,
            ipAddress: null,
            position: null,
            location: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        createUseCaseMock.execute.mockResolvedValue(mockDevice);

        await handler(req as Request, res as Response, next);

        expect(createUseCaseMock.execute).toHaveBeenCalledWith("Temp Sensor", DeviceType.VALVE, { location: "Room 101" });
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Device created successfully", iot_device: mockDevice });
        expect(next).not.toHaveBeenCalled();
    });

    it("should call next with an error if use case throws an error", async () => {
        const errorMessage = "Database connection failed";
        const error = new Error(errorMessage);
        createUseCaseMock.execute.mockRejectedValue(error);

        await handler(req as Request, res as Response, next);

        expect(createUseCaseMock.execute).toHaveBeenCalledWith("Temp Sensor", DeviceType.VALVE, { location: "Room 101" });
        expect(next).toHaveBeenCalledWith(error);
        expect(statusMock).not.toHaveBeenCalled();
        expect(jsonMock).not.toHaveBeenCalled();
    });
});
