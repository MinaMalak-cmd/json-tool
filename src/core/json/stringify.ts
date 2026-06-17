import { parseJson } from "./parse";
import type { JsonResult } from "./types";

/** Default indentation (in spaces) used when pretty-printing. */
export const DEFAULT_INDENT = 2;

/**
 * Pretty-print a JSON value with stable indentation.
 *
 * This is the "format / beautify" operation: it takes an in-memory value and
 * renders it as an indented JSON string.
 */
export function prettyPrint(
  value: unknown,
  indent: number = DEFAULT_INDENT,
): string {
  return JSON.stringify(value, null, indent);
}

/**
 * Convert a JSON document into its escaped string form.
 *
 * The input text is first parsed (so we only ever stringify valid JSON), then
 * re-encoded as a JSON string literal. The result is a single-line, escaped
 * representation suitable for embedding inside another JSON document.
 *
 * @example
 *   stringifyJson('{"a":1}') -> '"{\\"a\\":1}"'
 */
export function stringifyJson(source: string): JsonResult<string> {
  const parsed = parseJson(source);
  if (!parsed.ok) {
    return parsed;
  }

  // Re-stringify the parsed value (compact), then wrap it as a string literal.
  const compact = JSON.stringify(parsed.value);
  return { ok: true, value: JSON.stringify(compact) };
}
