import { deepDynamicParse } from "../utils/index";

export function parseJson(input: string): string {
  const parsed = JSON.parse(input);

  const transformed = deepDynamicParse(parsed);

  return JSON.stringify(transformed, null, 2);
}

export function stringifyJson(input: string): string {
  const parsed = JSON.parse(input);

  return JSON.stringify(parsed, null, 2);
}