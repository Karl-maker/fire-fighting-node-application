export type SortOrder = 'asc' | 'desc'; 

export type FindParams<SortByKeys, FilterByKey> = {
    sortBy?: keyof SortByKeys; 
    sortOrder?: SortOrder;
    
    filters?: {
      [K in keyof FilterByKey]?: {
        exact?: FilterByKey[K]; 
        contains?: string; 
      };
    };

    pageNumber?: number; 
    pageSize?: number;
};

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