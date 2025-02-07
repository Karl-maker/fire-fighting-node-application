import { Entity } from "../types/interfaces/base.entity";
import { IotDeviceFilterBy, IotDeviceSortBy } from "../types/types/ios.device.type";
import { FindParams, FindResponse } from "../types/types/repository.type";

export interface Repository<
    E extends Entity, 
    SortByKeys, 
    FilterByKeys
    > {
    save(entity: E): Promise<E>;
    find(params?: FindParams<SortByKeys, FilterByKeys>): Promise<FindResponse<E>>
}