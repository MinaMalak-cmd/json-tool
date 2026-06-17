import { deepParseValue } from "./deepParse";
import { parseJson } from "./parse";
import { pickPath } from "./paths";
import { prettyPrint, stringifyJson } from "./stringify";
import type { JsonResult } from "./types";

/** The two transformations the app can perform. */
export type ProcessMode = "parse" | "stringify";

export interface ProcessOptions {
  /**
   * When set (and the mode is "parse"), only the value at this path is
   * extracted and processed. Supports nesting, e.g.
   * `["data", "getTitleV2", "state"]`. Empty/undefined means "whole document".
   */
  path?: Array<string | number>;
  /** Indentation for pretty-printed output. */
  indent?: number;
}

/**
 * Run the requested transformation over a raw JSON string.
 *
 * - `parse`: validates input, optionally narrows to a nested path, then
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
  const { path, indent } = options;

  if (path && path.length > 0) {
    const picked = pickPath(target, path);
    if (picked === undefined) {
      return {
        ok: false,
        error: {
          message: `Path "${path.join(".")}" was not found in the document.`,
        },
      };
    }
    target = picked;
  }

  const unwrapped = deepParseValue(target);
  return { ok: true, value: prettyPrint(unwrapped, indent) };
}
