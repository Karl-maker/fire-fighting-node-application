import { Filters } from "../../domain/types/types/repository.type";

export const mapExpressRequestToFilters = <FilterBy>(
  filters?: Partial<Record<keyof FilterBy, any>>
): Filters<FilterBy> | undefined => {
  if (!filters) return undefined;

  const transformed: Filters<FilterBy> = {};

  for (const key in filters) {
    const value = filters[key];
    
    // Handle string values
    if (typeof value === "string") {
      if (isValidDate(value)) {
        transformed[key] = { exact: value as FilterBy[typeof key] }; 
      } else {
        transformed[key] = { contains: value }; 
      }
    } 
    else if (typeof value === "number") {
      transformed[key] = { exact: value as FilterBy[typeof key] }; 
    } 
    else {
      transformed[key] = { exact: value as FilterBy[typeof key] }; 
    }
  }

  return transformed;
};

/**
 * Checks if a string is a valid date format.
 * Supports ISO format and common date formats.
 */
const isValidDate = (value: string): boolean => {
  const parsedDate = new Date(value);
  return !isNaN(parsedDate.getTime()); // Valid date if not NaN
};
