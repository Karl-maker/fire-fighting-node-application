import { RootFilterQuery } from "mongoose";

export const mapFindMongooseFilters = <FilterByKeys>(filters?: {
  [K in keyof FilterByKeys]?: {
    exact?: FilterByKeys[K];
    contains?: string;
  };
}): RootFilterQuery<any> => {
  if (!filters) return {};

  const filter: RootFilterQuery<any> = {};
  
  for (const key in filters) {
    if (filters[key]) {
      const { exact, contains } = filters[key]!;

      if (exact !== undefined) {
        if (exact instanceof Date) {
          const startOfDay = new Date(Date.UTC(exact.getUTCFullYear(), exact.getUTCMonth(), exact.getUTCDate(), 0, 0, 0, 0));
          const endOfDay = new Date(Date.UTC(exact.getUTCFullYear(), exact.getUTCMonth(), exact.getUTCDate(), 23, 59, 59, 999));
          filter[key] = { $gte: startOfDay, $lt: endOfDay };
        } else {
          filter[key] = exact;
        }
      } else if (contains !== undefined && typeof contains === "string") {
        filter[key] = { $regex: contains, $options: "i" };
      }
    }
  }

  return filter;
};
