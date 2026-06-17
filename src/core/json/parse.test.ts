import { describe, expect, it } from "vitest";
import { parseJson } from "./parse";

describe("parseJson", () => {
  it("parses valid JSON objects", () => {
    const result = parseJson('{"a":1,"b":[true,null]}');
    expect(result).toEqual({ ok: true, value: { a: 1, b: [true, null] } });
  });

  it("parses JSON primitives and arrays", () => {
    expect(parseJson("42")).toEqual({ ok: true, value: 42 });
    expect(parseJson('"hello"')).toEqual({ ok: true, value: "hello" });
    expect(parseJson("[1,2,3]")).toEqual({ ok: true, value: [1, 2, 3] });
  });

  it("fails on empty input with a helpful message", () => {
    const result = parseJson("   ");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message).toMatch(/empty/i);
    }
  });

  it("returns a descriptive, location-aware error for malformed JSON", () => {
    // Missing comma between array elements — engines report a position here.
    const result = parseJson('[\n  1\n  2\n]');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message.length).toBeGreaterThan(0);
      // The error sits on the third line in this fixture.
      expect(result.error.line).toBe(3);
      expect(result.error.column).toBeGreaterThan(0);
      // The engine-specific "in JSON at position" tail must be stripped.
      expect(result.error.message).not.toMatch(/at position/i);
    }
  });

  it("produces a clean message even when no position is reported", () => {
    const result = parseJson('{"a":}');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message.length).toBeGreaterThan(0);
      // The "...snippet is not valid JSON" noise must be stripped.
      expect(result.error.message).not.toMatch(/is not valid JSON/i);
    }
  });

  it("never throws on arbitrary garbage", () => {
    expect(() => parseJson("}{not json")).not.toThrow();
    expect(parseJson("}{not json").ok).toBe(false);
  });
});
