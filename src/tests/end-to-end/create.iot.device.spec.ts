import request from "supertest";
import { app, initializeServer } from "../../interfaces/server"; // Ensure this imports your Express app correctly
import { IOT_DEVICE_ROUTE } from "../../domain/constants/routes";
import { DeviceType } from "../../domain/types/enums/iot.device.enum";
import { Database } from "../../config/database";
import { configuration } from "../../config";

// Example test for creating an IoT device end-to-end
describe("POST /iot-devices", () => {
    beforeAll(async () => {
        // Connect to the database before running tests
        await Database.connect(configuration.TEST_MONGO_URI);

        // Initialize the server without starting it
        await initializeServer();
    });

    afterAll(async () => {
        // Disconnect from the database after the tests
        await Database.disconnect();
    });

  it("should create an IoT device successfully", async () => {
    const res = await request(app)
      .post(IOT_DEVICE_ROUTE)
      .send({
        name: "Temp Sensor",
        type: 'valve',
        metadata: { location: "Room 101" },
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Device created successfully");
    expect(res.body.iot_device).toHaveProperty("id");
    expect(res.body.iot_device.name).toBe("Temp Sensor");
    expect(res.body.iot_device.type).toBe(DeviceType.VALVE);
  });

  it("should return a 400 error if required fields are missing", async () => {
    const res = await request(app).post(IOT_DEVICE_ROUTE).send({
      name: "", // Missing required fields
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Validation Error");
  });

});
