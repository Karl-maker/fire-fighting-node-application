import { SortOrder } from "./repository.type";

export type FindUseCaseInput<SpecifiedInputs, Entity> = {
    pagination: {
        pageSize: number;
        pageNumber: number;
    }; 

    sortOrder: SortOrder;
    sortBy: keyof Entity; 
} & SpecifiedInputs;