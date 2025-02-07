import { mapFindMongooseFilters } from "../../utils/repository/map.find.mongoose.filters.util";

describe("mapFindMongooseFilters", () => {
  test("returns empty object if filters is undefined", () => {
    expect(mapFindMongooseFilters(undefined)).toEqual({});
  });

  test("handles exact match for strings", () => {
    const filters = { name: { exact: "John Doe" } };
    expect(mapFindMongooseFilters(filters)).toEqual({ name: "John Doe" });
  });

  test("handles contains match for strings", () => {
    const filters = { name: { contains: "John" } };
    expect(mapFindMongooseFilters(filters)).toEqual({ name: { $regex: "John", $options: "i" } });
  });

  test("handles exact match for numbers", () => {
    const filters = { age: { exact: 25 } };
    expect(mapFindMongooseFilters(filters)).toEqual({ age: 25 });
  });

  test("handles exact match for dates (same day match)", () => {
    const date = new Date("2024-02-07T10:30:00Z");
    const expectedStart = new Date("2024-02-07T00:00:00Z");
    const expectedEnd = new Date("2024-02-07T23:59:59.999Z");

    const filters = { createdAt: { exact: date } };
    expect(mapFindMongooseFilters(filters)).toEqual({
      createdAt: { $gte: expectedStart, $lt: expectedEnd },
    });
  });

  test("handles multiple filters (string, number, date)", () => {
    const date = new Date("2024-02-07T14:00:00Z");
    const expectedStart = new Date("2024-02-07T00:00:00Z");
    const expectedEnd = new Date("2024-02-07T23:59:59.999Z");

    const filters = {
      name: { contains: "John" },
      age: { exact: 30 },
      createdAt: { exact: date },
    };

    expect(mapFindMongooseFilters(filters)).toEqual({
      name: { $regex: "John", $options: "i" },
      age: 30,
      createdAt: { $gte: expectedStart, $lt: expectedEnd },
    });
  });

  test("ignores undefined filters", () => {
    const filters = {
      name: { contains: undefined },
      age: { exact: 30 },
    };

    expect(mapFindMongooseFilters(filters)).toEqual({ age: 30 });
  });

  test("handles exact match for dates (same day match)", () => {
    const date = new Date(Date.UTC(2024, 1, 7, 10, 30, 0)); // UTC Date
  
    const expectedStart = new Date(Date.UTC(2024, 1, 7, 0, 0, 0, 0)); // 00:00 UTC
    const expectedEnd = new Date(Date.UTC(2024, 1, 7, 23, 59, 59, 999)); // 23:59 UTC
  
    const filters = { createdAt: { exact: date } };
    expect(mapFindMongooseFilters(filters)).toEqual({
      createdAt: { $gte: expectedStart, $lt: expectedEnd },
    });
  });
});
