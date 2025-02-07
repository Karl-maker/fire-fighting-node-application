import { mapFindMongoosePagination } from "../../utils/repository/map.find.mongoose.pagniation.util";


describe("mapFindMongoosePagination", () => {
    test("returns correct pagination when both pageNumber and pageSize are valid", () => {
      expect(mapFindMongoosePagination(2, 10)).toEqual({ skip: 10, limit: 10 });
    });
  
    test("returns empty object when pageNumber is undefined", () => {
      expect(mapFindMongoosePagination(undefined, 10)).toEqual({});
    });
  
    test("returns empty object when pageSize is undefined", () => {
      expect(mapFindMongoosePagination(1, undefined)).toEqual({});
    });
  
    test("handles pageNumber = 1 correctly", () => {
      expect(mapFindMongoosePagination(1, 10)).toEqual({ skip: 0, limit: 10 });
    });
  
    test("handles negative pageSize correctly", () => {
      expect(mapFindMongoosePagination(2, -10)).toEqual({ skip: 10, limit: 10 });
    });
  
    test("handles zero pageSize correctly", () => {
      expect(mapFindMongoosePagination(2, 0)).toEqual({ skip: 0, limit: 0 });
    });
  
    test("handles large pageNumber correctly", () => {
      expect(mapFindMongoosePagination(100, 10)).toEqual({ skip: 990, limit: 10 });
    });
  });
