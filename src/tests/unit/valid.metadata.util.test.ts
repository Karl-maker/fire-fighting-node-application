import { isValidMetadata } from "../../utils/validations/valid.metadata.util";

describe("isValidMetadata", () => {
    it("should return true for valid metadata with string and number values", () => {
        const validMetadata = { key1: 123, key2: "value", key3: 456 };
        expect(isValidMetadata(validMetadata)).toBe(true);
    });

    it("should return false for invalid metadata with a boolean value", () => {
        const invalidMetadata = { key1: 123, key2: "value", key3: true };
        expect(isValidMetadata(invalidMetadata)).toBe(false);
    });

    it("should return false for invalid metadata with an array value", () => {
        const invalidMetadata = { key1: 123, key2: "value", key3: [1, 2, 3] };
        expect(isValidMetadata(invalidMetadata)).toBe(false);
    });

    it("should return false for invalid metadata with an object value", () => {
        const invalidMetadata = { key1: 123, key2: "value", key3: { nested: "object" } };
        expect(isValidMetadata(invalidMetadata)).toBe(false);
    });

    it("should return false for invalid metadata with NaN value", () => {
        const invalidMetadata = { key1: 123, key2: "value", key3: NaN };
        expect(isValidMetadata(invalidMetadata)).toBe(false);
    });

    it("should return false for metadata with undefined value", () => {
        const invalidMetadata = { key1: 123, key2: "value", key3: undefined };
        expect(isValidMetadata(invalidMetadata)).toBe(false);
    });

    it("should return false for metadata with null value", () => {
        const invalidMetadata = { key1: 123, key2: "value", key3: null };
        expect(isValidMetadata(invalidMetadata)).toBe(false);
    });

    it("should return true for metadata with empty object", () => {
        const emptyMetadata = {};
        expect(isValidMetadata(emptyMetadata)).toBe(true);
    });

    it("should return false for metadata with a function as a value", () => {
        const invalidMetadata = { key1: 123, key2: "value", key3: () => {} };
        expect(isValidMetadata(invalidMetadata)).toBe(false);
    });

    it("should return true for metadata with valid types but edge case values (0, empty string)", () => {
        const validMetadata = { key1: 0, key2: "" }; // Edge cases like 0 and empty string
        expect(isValidMetadata(validMetadata)).toBe(true);
    });
});
