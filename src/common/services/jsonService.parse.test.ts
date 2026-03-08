import { describe, it, expect } from "vitest";
import { parseJson } from "./jsonService";

describe("parseJson", () => {
  it("parses and deeply converts JSON", () => {
    const input = JSON.stringify({
      user: '{"age":25}'
    });

    const result = parseJson(input);

    expect(result).toBe(
`{
  "user": {
    "age": 25
  }
}`
    );
  });
});

