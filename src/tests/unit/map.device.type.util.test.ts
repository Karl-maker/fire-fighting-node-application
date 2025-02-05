import { mapDeviceType } from "../../utils/iot-device/map.device.type.util";
import { DeviceType } from "../../domain/types/enums/iot.device.enum";

describe("mapDeviceType", () => {
    it("should return DeviceType.VALVE for 'valve'", () => {
        expect(mapDeviceType("valve")).toBe(DeviceType.VALVE);
    });

    it("should throw an error for an unknown device type", () => {
        expect(() => mapDeviceType("unknownType")).toThrow("Device type unknown");
    });

    it("should throw an error for an empty string", () => {
        expect(() => mapDeviceType("")).toThrow("Device type unknown");
    });

    it("should throw an error for a null input", () => {
        expect(() => mapDeviceType(null as unknown as string)).toThrow("Device type unknown");
    });

    it("should throw an error for an undefined input", () => {
        expect(() => mapDeviceType(undefined as unknown as string)).toThrow("Device type unknown");
    });
});
