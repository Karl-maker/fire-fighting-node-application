import { FindParams, FindResponse } from "../types/types/repository.type";

export interface Repository<E> {
    save(entity: E): Promise<E>;
    find(params?: FindParams<E>): Promise<FindResponse<E>>
}