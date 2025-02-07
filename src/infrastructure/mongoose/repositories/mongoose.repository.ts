import { Connection, Document, Model } from "mongoose";
import { Repository } from "../../../domain/repositories/repository";
import { Entity } from "../../../domain/types/interfaces/base.entity";
import { FindParams, FindResponse } from "../../../domain/types/types/repository.type";
import { mapFindMongooseFilters } from "../../../utils/repository/map.find.mongoose.filters.util";
import { logger } from "../../../utils/logging";


export abstract class MongooseRepository<
    D extends Document, 
    E extends Entity, 
    SortByKeys, 
    FilterByKeys
    > implements Repository<E, SortByKeys, FilterByKeys> {
    protected readonly model: Model<D>;

    constructor(protected readonly db: Connection, schemaName: string, schema: any) {
        this.model = db.model<D>(schemaName, schema);
    }

    async find(params?: FindParams<SortByKeys, FilterByKeys> | undefined): Promise<FindResponse<E>> {
        const filters = params?.filters ? mapFindMongooseFilters(params?.filters) : {};
        const result = await this.model.find(filters)
        throw new Error()
    }

    async save(device: E): Promise<E> {
        const saved = await this.model.create(device);
        return this.mapModelToEntity(saved)
    }

    private mapModelToEntity (device: any): E {
        const savedObj = {
            ...device.toObject(),
            id: device._id
        } as unknown as any;

        delete savedObj['_id'];
        delete savedObj['__v'];

        return savedObj as E;
    }
}
