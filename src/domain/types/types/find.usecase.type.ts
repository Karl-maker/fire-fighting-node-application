import { FindParams, FindResponse } from "./repository.type";

export type FindUseCaseInput<SortBy, FilterBy> = FindParams<SortBy, FilterBy>
export type FindUseCaseResponse<E> = FindResponse<E>;