import { describe, it, expect } from "vitest";
import { stringifyJson } from "./jsonService";

describe("stringifyJson", () => {
  it("stringifies JSON with indentation", () => {
    const input = '{"name":"Mina"}';

    const result = stringifyJson(input);

    expect(result).toBe(
`{
  "name": "Mina"
}`
    );
  });
});