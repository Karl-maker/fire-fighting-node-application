import { Filters } from "../../domain/types/types/repository.type";
import { mapExpressRequestToFilters } from "../../utils/express/map.express.request.to.filters.util";

describe("mapExpressRequestToFilters", () => {
  
  // Test case 1: When filters is undefined
  it("should return undefined when filters is undefined", () => {
    expect(mapExpressRequestToFilters(undefined)).toBeUndefined();
  });

  // Test case 2: When filters is an empty object
  it("should return an empty object when filters is an empty object", () => {
    expect(mapExpressRequestToFilters({})).toEqual({});
  });

  // Test case 3: When filters contains a string
  it("should map string values to 'contains' filter", () => {
    const filters = { name: "Device" };
    const expected: Filters<typeof filters> = {
      name: { contains: "Device" },
    };
    expect(mapExpressRequestToFilters(filters)).toEqual(expected);
  });

  // Test case 4: When filters contains a valid date string
  it("should map valid date strings to 'exact' filter as a Date", () => {
    const filters = { createdAt: "2024-02-07T10:30:00Z" };
    const expected: Filters<typeof filters> = {
      createdAt: { exact: "2024-02-07T10:30:00Z" },
    };
    expect(mapExpressRequestToFilters(filters)).toEqual(expected);
  });

  // Test case 5: When filters contains an invalid date string
  it("should not convert invalid date strings to 'exact' filter", () => {
    const filters = { createdAt: "invalid-date" };
    const expected: Filters<typeof filters> = {
      createdAt: { contains: "invalid-date" },
    };
    expect(mapExpressRequestToFilters(filters)).toEqual(expected);
  });

  // Test case 6: When filters contains a number
  it("should map numbers to 'exact' filter", () => {
    const filters = { price: 100 };
    const expected: Filters<typeof filters> = {
      price: { exact: 100 },
    };
    expect(mapExpressRequestToFilters(filters)).toEqual(expected);
  });

  // Test case 7: When filters contains a boolean
  it("should map boolean values to 'exact' filter", () => {
    const filters = { isActive: true };
    const expected: Filters<typeof filters> = {
      isActive: { exact: true },
    };
    expect(mapExpressRequestToFilters(filters)).toEqual(expected);
  });

  // Test case 8: When filters contains other types (e.g., arrays, objects)
  it("should map non-string and non-number types to 'exact' filter", () => {
    const filters = { details: { key: "value" } };
    const expected: Filters<typeof filters> = {
      details: { exact: { key: "value" } },
    };
    expect(mapExpressRequestToFilters(filters)).toEqual(expected);
  });

});
