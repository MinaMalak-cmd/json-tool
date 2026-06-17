import { describe, expect, it } from "vitest";
import { deepParseValue } from "./deepParse";

describe("deepParseValue", () => {
  it("unwraps a stringified JSON object", () => {
    expect(deepParseValue('{"a":1}')).toEqual({ a: 1 });
  });

  it("unwraps a stringified JSON array", () => {
    expect(deepParseValue("[1,2,3]")).toEqual([1, 2, 3]);
  });

  it("recursively unwraps nested stringified payloads", () => {
    const input = {
      id: 7,
      payload: '{"nested":"[1,2,3]","meta":"{\\"k\\":true}"}',
    };
    expect(deepParseValue(input)).toEqual({
      id: 7,
      payload: { nested: [1, 2, 3], meta: { k: true } },
    });
  });

  it("walks into arrays and objects", () => {
    const input = { items: ['{"x":1}', '{"y":2}'] };
    expect(deepParseValue(input)).toEqual({
      items: [{ x: 1 }, { y: 2 }],
    });
  });

  it("leaves plain strings untouched", () => {
    expect(deepParseValue("hello world")).toBe("hello world");
  });

  it("does NOT convert numeric or boolean-looking strings (objects/arrays only)", () => {
    const input = { id: "123", active: "true", note: "null" };
    // None of these look like an object/array, so they remain strings.
    expect(deepParseValue(input)).toEqual({
      id: "123",
      active: "true",
      note: "null",
    });
  });

  it("preserves real primitives", () => {
    expect(deepParseValue(42)).toBe(42);
    expect(deepParseValue(true)).toBe(true);
    expect(deepParseValue(null)).toBe(null);
  });
});
