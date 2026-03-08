import { describe, it, expect } from "vitest";
import { deepDynamicParse } from "./deepDynamicParse";

describe("deepDynamicParse", () => {
  it("converts stringified object", () => {
    const input = {
      user: '{"age":25}'
    };

    const result = deepDynamicParse(input) as { user: { age: number } };

    expect(result.user).toEqual({ age: 25 });
  });

  it("converts stringified array", () => {
    const input = {
      items: "[1,2,3]"
    };

    const result = deepDynamicParse(input) as { items: number[] };

    expect(result.items).toEqual([1,2,3]);
  });

  it("does NOT convert primitive string JSON", () => {
    const input = {
      value: "123"
    };

    const result = deepDynamicParse(input) as { value: string };

    expect(result.value).toBe("123");
  });
});