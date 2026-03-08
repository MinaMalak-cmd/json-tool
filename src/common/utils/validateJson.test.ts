import { describe, it, expect } from "vitest";
import { validateJson } from "./validateJson";

describe("validateJson", () => {
  it("returns valid for correct JSON", () => {
    const result = validateJson('{"name":"Mina"}');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("returns error for invalid JSON", () => {
    const result = validateJson('{name:"Mina"}');
    expect(result.isValid).toBe(false);
    expect(result.error).toBeDefined();
  });
});