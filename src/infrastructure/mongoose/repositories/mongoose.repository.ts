import { Connection, Document, Model } from "mongoose";
import { Repository } from "../../../domain/repositories/repository";
import { Entity } from "../../../domain/types/interfaces/base.entity";


export abstract class MongooseRepository<D extends Document, E extends Entity> implements Repository<E> {
    protected readonly model: Model<D>;

    constructor(protected readonly db: Connection, schemaName: string, schema: any) {
        this.model = db.model<D>(schemaName, schema);
    }

    async save(device: E): Promise<E> {
        const saved = await this.model.create(device);
        const savedObj = {
            ...saved.toObject(),
            id: saved._id
        } as unknown as any;

        delete savedObj['_id'];
        delete savedObj['__v'];

        return savedObj as E;
    }
}
