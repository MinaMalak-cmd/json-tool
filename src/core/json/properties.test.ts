import { describe, expect, it } from "vitest";
import { getTopLevelKeys, isJsonObject, pickProperty } from "./properties";

describe("isJsonObject", () => {
  it("recognizes plain objects only", () => {
    expect(isJsonObject({ a: 1 })).toBe(true);
    expect(isJsonObject([1, 2])).toBe(false);
    expect(isJsonObject(null)).toBe(false);
    expect(isJsonObject("x")).toBe(false);
    expect(isJsonObject(5)).toBe(false);
  });
});

describe("getTopLevelKeys", () => {
  it("returns object keys", () => {
    expect(getTopLevelKeys({ a: 1, b: 2 })).toEqual(["a", "b"]);
  });

  it("returns an empty list for non-objects", () => {
    expect(getTopLevelKeys([1, 2, 3])).toEqual([]);
    expect(getTopLevelKeys("nope")).toEqual([]);
    expect(getTopLevelKeys(null)).toEqual([]);
  });
});

describe("pickProperty", () => {
  const obj = { a: 1, payload: { nested: true } };

  it("returns the value for an existing key", () => {
    expect(pickProperty(obj, "payload")).toEqual({ nested: true });
  });

  it("returns undefined for a missing key", () => {
    expect(pickProperty(obj, "missing")).toBeUndefined();
  });

  it("returns undefined when the value is not an object", () => {
    expect(pickProperty([1, 2], "0")).toBeUndefined();
  });
});
