import mongoose, { Schema, Document } from "mongoose";
import { DeviceStatus, DeviceType } from "../../../domain/types/enums/iot.device.enum";
import { Location } from "../../../domain/types/types/location.type";
import { IOT_DEVICE_SCHEMA } from "../../../domain/constants/schemas";

export interface IotDeviceDocument extends Document {
    name: string;
    type: DeviceType;
    firmwareVersion: string;
    status: DeviceStatus;
    lastSeenAt?: Date;
    ipAddress?: string;
    position?: string;
    location?: Location;
    metadata: Record<string, string | number>;
    createdAt: Date;
    updatedAt: Date;
}

export const IotDeviceSchema = new Schema<IotDeviceDocument>(
    {
        name: { type: String, required: true },
        type: { type: String, enum: Object.values(DeviceType), required: true },
        firmwareVersion: { type: String, required: false },
        status: { type: String, enum: Object.values(DeviceStatus), required: true },
        lastSeenAt: { type: Date, default: null },
        ipAddress: { type: String, default: null },
        position: { type: String, default: null },
        location: {
            type: {
                latitude: Number,
                longitude: Number,
            },
            default: null,
        },
        metadata: { type: Map, of: Schema.Types.Mixed, default: {} },
    },
    { timestamps: true }
);

export const IotDeviceModel = mongoose.model<IotDeviceDocument>(IOT_DEVICE_SCHEMA, IotDeviceSchema);
