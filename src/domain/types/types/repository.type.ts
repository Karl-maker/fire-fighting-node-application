export type SortOrder = 'asc' | 'desc'; 

export type FindParams<E> = {
    sortBy?: keyof E; 
    sortOrder?: SortOrder;
    
    filters?: {
      [K in keyof E]?: {
        exact?: E[K]; 
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