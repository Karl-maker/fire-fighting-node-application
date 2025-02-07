import { Entity } from "../types/interfaces/base.entity";
import { FindUseCaseInput, FindUseCaseResponse } from "../types/types/find.usecase.type";

export interface FindUseCase<
    E extends Entity,
    SortByKeys,
    FilterByKeys
> {
    execute: (params?: FindUseCaseInput<SortByKeys, FilterByKeys>) => Promise<FindUseCaseResponse<E>>;
}