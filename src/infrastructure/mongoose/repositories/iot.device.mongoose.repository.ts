import { Connection } from "mongoose";
import { IotDevice } from "../../../domain/entities/iot.device.entity";
import { IotDeviceRepository } from "../../../domain/repositories/iot.device.repository";
import { IotDeviceDocument, IotDeviceSchema } from "../schemas/iot.device.mongoose.schema";
import { MongooseRepository } from "./mongoose.repository";
import { IOT_DEVICE_SCHEMA } from "../../../domain/constants/schemas";


export class IotDeviceMongooseRepository extends MongooseRepository<IotDeviceDocument, IotDevice> implements IotDeviceRepository {
    constructor(db: Connection) {
        super(db, IOT_DEVICE_SCHEMA, IotDeviceSchema)
    }

}
