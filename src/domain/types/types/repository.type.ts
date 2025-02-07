export type SortOrder = 'asc' | 'desc'; 

export type FindParams<SortByKeys, FilterByKey> = {
    sortBy?: keyof SortByKeys; 
    sortOrder?: SortOrder;
    
    filters?: Filters<FilterByKey>;

    pageNumber?: number; 
    pageSize?: number;
};

export type Filters<FilterByKey> = {
  [K in keyof FilterByKey]?: {
    exact?: FilterByKey[K]; 
    contains?: string; 
  };
}

export type Pagination = {
    totalItems: number; 
    totalPages: number; 
    currentPage: number; 
    pageSize: number;
};
  
export type FindResponse<E> = {
    data: E[]; 
    pagination: Pagination; 
};