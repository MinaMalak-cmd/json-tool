import { describe, expect, it } from "vitest";
import { processJson } from "./process";

describe("processJson — parse mode", () => {
  it("pretty-prints valid JSON", () => {
    const result = processJson('{"a":1}', "parse");
    expect(result).toEqual({ ok: true, value: '{\n  "a": 1\n}' });
  });

  it("deep-parses stringified nested JSON", () => {
    const result = processJson('{"payload":"{\\"x\\":1}"}', "parse");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(JSON.parse(result.value)).toEqual({ payload: { x: 1 } });
    }
  });

  it("narrows to a single selected property", () => {
    const source = '{"keep":"{\\"x\\":1}","drop":99}';
    const result = processJson(source, "parse", { selectedProperty: "keep" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(JSON.parse(result.value)).toEqual({ x: 1 });
    }
  });

  it("errors when the selected property is absent", () => {
    const result = processJson('{"a":1}', "parse", {
      selectedProperty: "ghost",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message).toMatch(/ghost/);
    }
  });

  it("surfaces validation errors", () => {
    const result = processJson("{bad}", "parse");
    expect(result.ok).toBe(false);
  });
});

describe("processJson — stringify mode", () => {
  it("escapes a document into a string literal", () => {
    const result = processJson('{"a":1}', "stringify");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe('"{\\"a\\":1}"');
    }
  });

  it("ignores the selected property in stringify mode", () => {
    const result = processJson('{"a":1}', "stringify", {
      selectedProperty: "a",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe('"{\\"a\\":1}"');
    }
  });
});
