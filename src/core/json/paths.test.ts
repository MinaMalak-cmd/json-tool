import { describe, expect, it } from "vitest";
import { enumeratePaths, pickPath } from "./paths";

describe("enumeratePaths", () => {
  it("enumerates nested object paths with dot notation", () => {
    const { options } = enumeratePaths({
      data: { getTitleV2: { state: "x" } },
    });
    const labels = options.map((o) => o.label);
    expect(labels).toEqual(["data", "data.getTitleV2", "data.getTitleV2.state"]);
  });

  it("uses bracket notation for array indices", () => {
    const { options } = enumeratePaths([{ a: 1 }]);
    const labels = options.map((o) => o.label);
    expect(labels).toContain("[0]");
    expect(labels).toContain("[0].a");
  });

  it("treats strings as leaves and does not descend into them", () => {
    const { options } = enumeratePaths({ state: '{"deep":1}' });
    const labels = options.map((o) => o.label);
    // The stringified JSON stays a single selectable leaf.
    expect(labels).toEqual(["state"]);
  });

  it("returns segments that resolve back to the value", () => {
    const value = { data: { getTitleV2: { state: "blob" } } };
    const { options } = enumeratePaths(value);
    const target = options.find((o) => o.label === "data.getTitleV2.state");
    expect(target?.segments).toEqual(["data", "getTitleV2", "state"]);
  });
});

describe("pickPath", () => {
  const value = { data: { items: [{ id: "a" }, { id: "b" }] } };

  it("resolves a nested object path", () => {
    expect(pickPath(value, ["data", "items", 1, "id"])).toBe("b");
  });

  it("returns undefined for a missing key", () => {
    expect(pickPath(value, ["data", "ghost"])).toBeUndefined();
  });

  it("returns undefined for an out-of-range index", () => {
    expect(pickPath(value, ["data", "items", 5])).toBeUndefined();
  });

  it("returns the whole value for an empty path", () => {
    expect(pickPath(value, [])).toBe(value);
  });
});
