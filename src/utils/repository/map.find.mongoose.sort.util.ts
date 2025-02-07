import { QueryOptions } from "mongoose";
import { SortOrder } from "../../domain/types/types/repository.type";

export const mapFindMongooseSort = <SortByKeys>(
    sortBy?: keyof SortByKeys,
    sortOrder?: SortOrder
  ): QueryOptions["sort"] => {
    if (!sortBy) return undefined;
    return { [sortBy as string]: sortOrder === "desc" ? -1 : 1 };
};