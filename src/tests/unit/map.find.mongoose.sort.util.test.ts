import { SortOrder } from "../../domain/types/types/repository.type";
import { mapFindMongooseSort } from "../../utils/repository/map.find.mongoose.sort.util";

describe("mapFindMongooseSort", () => {
  test("returns correct sorting order when sortOrder is 'asc'", () => {
    expect(mapFindMongooseSort<{ name: string }>("name", "asc")).toEqual({ name: 1 });
  });

  test("returns correct sorting order when sortOrder is 'desc'", () => {
    expect(mapFindMongooseSort<{ age: number }>("age", "desc")).toEqual({ age: -1 });
  });

  test("returns ascending order when sortOrder is not provided", () => {
    expect(mapFindMongooseSort<{ createdAt: Date }>("createdAt")).toEqual({ createdAt: 1 });
  });

  test("returns undefined when sortBy is not provided", () => {
    expect(mapFindMongooseSort()).toBeUndefined();
  });

  test("handles different key types correctly", () => {
    expect(mapFindMongooseSort<{ price: number }>("price", "asc")).toEqual({ price: 1 });
    expect(mapFindMongooseSort<{ lastLogin: Date }>("lastLogin", "desc")).toEqual({ lastLogin: -1 });
  });
});
