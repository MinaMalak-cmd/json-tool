import { describe, expect, it } from "vitest";
import { prettyPrint, stringifyJson } from "./stringify";

describe("prettyPrint", () => {
  it("indents with two spaces by default", () => {
    expect(prettyPrint({ a: 1 })).toBe('{\n  "a": 1\n}');
  });

  it("honors a custom indent", () => {
    expect(prettyPrint({ a: 1 }, 4)).toBe('{\n    "a": 1\n}');
  });
});

describe("stringifyJson", () => {
  it("converts a JSON document into an escaped string literal", () => {
    const result = stringifyJson('{ "a": 1 }');
    expect(result.ok).toBe(true);
    if (result.ok) {
      // The output is a quoted string whose contents are the compact JSON.
      expect(result.value).toBe('"{\\"a\\":1}"');
      // And it round-trips: parsing it twice yields the original value.
      expect(JSON.parse(JSON.parse(result.value))).toEqual({ a: 1 });
    }
  });

  it("propagates a descriptive error for invalid input", () => {
    const result = stringifyJson("{nope}");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message.length).toBeGreaterThan(0);
    }
  });
});
