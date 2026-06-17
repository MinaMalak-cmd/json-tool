import { describe, expect, it } from "vitest";
import { formatJsonError, validateJson } from "./validate";

describe("validateJson", () => {
  it("treats empty input as valid (neutral document)", () => {
    expect(validateJson("")).toEqual({ valid: true });
    expect(validateJson("   \n ")).toEqual({ valid: true });
  });

  it("accepts well-formed JSON", () => {
    expect(validateJson('{"ok":true}')).toEqual({ valid: true });
  });

  it("rejects malformed JSON with an error payload", () => {
    const result = validateJson("{bad}");
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error.message.length).toBeGreaterThan(0);
    }
  });
});

describe("formatJsonError", () => {
  it("includes line and column when available", () => {
    expect(
      formatJsonError({ message: "Unexpected token", line: 2, column: 5 }),
    ).toBe("Unexpected token (line 2, column 5)");
  });

  it("falls back to just the message when location is unknown", () => {
    expect(formatJsonError({ message: "Invalid JSON input." })).toBe(
      "Invalid JSON input.",
    );
  });
});
