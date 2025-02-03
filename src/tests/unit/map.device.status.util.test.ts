import { mapDeviceStatus } from "../../utils/iot-device/map.device.status.utils";
import { DeviceStatus } from "../../types/enums/iot.device.enum";

describe("mapDeviceStatus", () => {
    it("should return DeviceStatus.ONLINE for 'online'", () => {
        expect(mapDeviceStatus("online")).toBe(DeviceStatus.ONLINE);
    });

    it("should return DeviceStatus.OFFLINE for 'offline'", () => {
        expect(mapDeviceStatus("offline")).toBe(DeviceStatus.OFFLINE);
    });

    it("should return DeviceStatus.ERROR for 'error'", () => {
        expect(mapDeviceStatus("error")).toBe(DeviceStatus.ERROR);
    });

    it("should return DeviceStatus.MAINTENANCE for 'maintenance'", () => {
        expect(mapDeviceStatus("maintenance")).toBe(DeviceStatus.MAINTENANCE);
    });

    it("should return DeviceStatus.PENDING for 'pending'", () => {
        expect(mapDeviceStatus("pending")).toBe(DeviceStatus.PENDING);
    });

    it("should throw an error for an unknown status", () => {
        expect(() => mapDeviceStatus("unknown")).toThrow("Device status unknown");
    });

    it("should throw an error for an empty string", () => {
        expect(() => mapDeviceStatus("")).toThrow("Device status unknown");
    });

    it("should throw an error for null input", () => {
        expect(() => mapDeviceStatus(null as unknown as string)).toThrow("Device status unknown");
    });

    it("should throw an error for undefined input", () => {
        expect(() => mapDeviceStatus(undefined as unknown as string)).toThrow("Device status unknown");
    });
});
