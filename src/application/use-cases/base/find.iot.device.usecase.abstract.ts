import { Repository } from "../../../domain/repositories/repository";
import { Entity } from "../../../domain/types/interfaces/base.entity";
import { FindUseCaseInput, FindUseCaseResponse } from "../../../domain/types/types/find.usecase.type";
import { FindUseCase } from "../../../domain/use-cases/find.usecase";

export abstract class FindUseCaseBase<E extends Entity, SortBy, FilterBy> implements FindUseCase<E, SortBy, FilterBy> {
    constructor(protected repository: Repository<E, SortBy, FilterBy>){}

    async execute(params?: FindUseCaseInput<SortBy, FilterBy>): Promise<FindUseCaseResponse<E>> {
        const results = await this.repository.find({
          filters: params?.filters ?? undefined,
          sortBy: (params?.sortBy ?? 'createdAt') as keyof SortBy, // Ensure SortBy allows 'createdAt'
          sortOrder: params?.sortOrder ?? 'asc',
          pageNumber: params?.pageNumber ?? 1,
          pageSize: params?.pageSize ?? 10
        });
    
        return results;
    }
        
}