import request from "supertest";
import { app, initializeServer } from "../../interfaces/server"; // Ensure this imports your Express app correctly
import { IOT_DEVICE_ROUTE } from "../../domain/constants/routes";
import { DeviceStatus, DeviceType } from "../../domain/types/enums/iot.device.enum";
import { Database } from "../../config/database";
import { configuration } from "../../config";
import { IOT_DEVICE_SCHEMA } from "../../domain/constants/schemas";
import { IotDeviceMongooseRepository } from "../../infrastructure/mongoose/repositories/iot.device.mongoose.repository";
import { IotDeviceRepository } from "../../domain/repositories/iot.device.repository";
import { IotDevice } from "../../domain/entities/iot.device.entity";
import { IotDeviceConstructorInput } from "../../domain/types/types/ios.device.type";

let iotDeviceRepository: IotDeviceRepository;

describe("GET /iot-devices", () => {
  beforeAll(async () => {
    await Database.connect(configuration.TEST_MONGO_URI);
    iotDeviceRepository = new IotDeviceMongooseRepository(Database.getConnection());
    await initializeServer();
  });

  beforeEach(async () => {
    await Database.getConnection().model(IOT_DEVICE_SCHEMA).deleteMany({});
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  afterAll(async () => {
    await Database.disconnect();
  });

  it("should return an empty list when no IoT devices exist", async () => {
    const res = await request(app).get(IOT_DEVICE_ROUTE);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it("should find a saved IoT device successfully", async () => {
    const iotDeviceInput: IotDeviceConstructorInput = {
      id: null,
      name: "Jest Test Device",
      type: DeviceType.VALVE,
      firmwareVersion: "",
      status: DeviceStatus.ONLINE,
      lastSeenAt: null,
      ipAddress: null,
      position: null,
      location: null,
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await iotDeviceRepository.save(new IotDevice(iotDeviceInput));

    const res = await request(app).get(IOT_DEVICE_ROUTE);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe("Jest Test Device");
  });

  it("should support pagination", async () => {
    for (let i = 1; i <= 15; i++) {
      await iotDeviceRepository.save(
        new IotDevice({
          id: null,
          name: `Device ${i}`,
          type: DeviceType.VALVE,
          firmwareVersion: "1.0",
          status: DeviceStatus.ONLINE,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSeenAt: null,
          ipAddress: null,
          position: null,
          location: null,
          metadata: {},
        })
      );
    }

    const res = await request(app).get(`${IOT_DEVICE_ROUTE}?page_number=2&page_size=5`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(5);
    expect(res.body.pagination.currentPage).toBe(2);
    expect(res.body.pagination.pageSize).toBe(5);
  });

  it("should filter devices by exact name", async () => {
    await iotDeviceRepository.save(
      new IotDevice({ id: null, name: "Device Alpha", firmwareVersion: "", type: DeviceType.VALVE, status: DeviceStatus.OFFLINE, createdAt: new Date(), updatedAt: new Date(), lastSeenAt: null, ipAddress: null, position: null, location: null, metadata: {} })
    );

    await iotDeviceRepository.save(
      new IotDevice({ id: null, name: "Device Beta", firmwareVersion: "", type: DeviceType.VALVE, status: DeviceStatus.ONLINE, createdAt: new Date(), updatedAt: new Date(), lastSeenAt: null, ipAddress: null, position: null, location: null, metadata: {} })
    );

    const res = await request(app).get(`${IOT_DEVICE_ROUTE}?name=Device Alpha`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe("Device Alpha");
  });

  it("should filter devices by partial name (contains)", async () => {
    await iotDeviceRepository.save(
      new IotDevice({ id: null, name: "Alpha Sensor", firmwareVersion: "", type: DeviceType.VALVE, status: DeviceStatus.ONLINE, createdAt: new Date(), updatedAt: new Date(), lastSeenAt: null, ipAddress: null, position: null, location: null, metadata: {} })
    );

    await iotDeviceRepository.save(
      new IotDevice({ id: null, name: "Beta Seneor", firmwareVersion: "", type: DeviceType.VALVE, status: DeviceStatus.OFFLINE, createdAt: new Date(), updatedAt: new Date(), lastSeenAt: null, ipAddress: null, position: null, location: null, metadata: {} })
    );

    const res = await request(app).get(`${IOT_DEVICE_ROUTE}?name=Sensor`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it("should filter devices by status", async () => {
    await iotDeviceRepository.save(
      new IotDevice({ id: null, name: "Device One", firmwareVersion: "", type: DeviceType.VALVE, status: DeviceStatus.ONLINE, createdAt: new Date(), updatedAt: new Date(), lastSeenAt: null, ipAddress: null, position: null, location: null, metadata: {} })
    );

    await iotDeviceRepository.save(
      new IotDevice({ id: null, name: "Device Two", firmwareVersion: "", type: DeviceType.VALVE, status: DeviceStatus.OFFLINE, createdAt: new Date(), updatedAt: new Date(), lastSeenAt: null, ipAddress: null, position: null, location: null, metadata: {} })
    );

    const res = await request(app).get(`${IOT_DEVICE_ROUTE}?status=ONLINE`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].status).toBe(DeviceStatus.ONLINE);
  });

  it("should return multiple IoT devices", async () => {
    await iotDeviceRepository.save(
      new IotDevice({ id: null, name: "Device 1", firmwareVersion: "", type: DeviceType.VALVE, status: DeviceStatus.ONLINE, createdAt: new Date(), updatedAt: new Date(), lastSeenAt: null, ipAddress: null, position: null, location: null, metadata: {} })
    );

    await iotDeviceRepository.save(
      new IotDevice({ id: null, name: "Device 2", firmwareVersion: "", type: DeviceType.VALVE, status: DeviceStatus.OFFLINE, createdAt: new Date(), updatedAt: new Date(), lastSeenAt: null, ipAddress: null, position: null, location: null, metadata: {} })
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const res = await request(app).get(IOT_DEVICE_ROUTE);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });

  it("should sort devices by name in ascending order", async () => {
    await iotDeviceRepository.save(new IotDevice({ id: null, name: "Zeta Device", firmwareVersion: "", type: DeviceType.VALVE, status: DeviceStatus.ONLINE, createdAt: new Date(), updatedAt: new Date(), lastSeenAt: null, ipAddress: null, position: null, location: null, metadata: {} }));
    await iotDeviceRepository.save(new IotDevice({ id: null, name: "Alpha Device", firmwareVersion: "", type: DeviceType.VALVE, status: DeviceStatus.ONLINE, createdAt: new Date(), updatedAt: new Date(), lastSeenAt: null, ipAddress: null, position: null, location: null, metadata: {} }));

    const res = await request(app).get(`${IOT_DEVICE_ROUTE}?by=name&order=asc`);
    expect(res.status).toBe(200);
    expect(res.body.data[0].name).toBe("Alpha Device");
  });
});
