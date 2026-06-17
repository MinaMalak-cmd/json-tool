import { deepParseValue } from "./deepParse";
import { parseJson } from "./parse";
import { pickProperty } from "./properties";
import { prettyPrint, stringifyJson } from "./stringify";
import type { JsonResult } from "./types";

/** The two transformations the app can perform. */
export type ProcessMode = "parse" | "stringify";

export interface ProcessOptions {
  /**
   * When set (and the mode is "parse"), only this top-level property of the
   * input object is extracted and processed. Ignored when empty/undefined.
   */
  selectedProperty?: string;
  /** Indentation for pretty-printed output. */
  indent?: number;
}

/**
 * Run the requested transformation over a raw JSON string.
 *
 * - `parse`: validates input, optionally narrows to a single property, then
 *   recursively unwraps any stringified JSON objects/arrays and pretty-prints.
 * - `stringify`: validates input and returns its escaped string form.
 *
 * Never throws; returns a {@link JsonResult} carrying either the output text
 * or a descriptive error.
 */
export function processJson(
  source: string,
  mode: ProcessMode,
  options: ProcessOptions = {},
): JsonResult<string> {
  if (mode === "stringify") {
    return stringifyJson(source);
  }

  // mode === "parse"
  const parsed = parseJson(source);
  if (!parsed.ok) {
    return parsed;
  }

  let target = parsed.value;
  const { selectedProperty, indent } = options;

  if (selectedProperty) {
    const picked = pickProperty(target, selectedProperty);
    if (picked === undefined) {
      return {
        ok: false,
        error: {
          message: `Property "${selectedProperty}" was not found on the root object.`,
        },
      };
    }
    target = picked;
  }

  const unwrapped = deepParseValue(target);
  return { ok: true, value: prettyPrint(unwrapped, indent) };
}
