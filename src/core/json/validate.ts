import { parseJson } from "./parse";
import type { JsonError } from "./types";

/** Outcome of validating a JSON string. */
export type ValidationResult =
  | { valid: true }
  | { valid: false; error: JsonError };

/**
 * Validate that `source` is well-formed JSON.
 *
 * An empty string is treated as valid (a neutral/empty document) so the UI
 * does not scream at the user before they have typed anything.
 */
export function validateJson(source: string): ValidationResult {
  if (source.trim() === "") {
    return { valid: true };
  }

  const result = parseJson(source);
  return result.ok ? { valid: true } : { valid: false, error: result.error };
}

/** Format a {@link JsonError} into a single human-readable line. */
export function formatJsonError(error: JsonError): string {
  if (error.line !== undefined && error.column !== undefined) {
    return `${error.message} (line ${error.line}, column ${error.column})`;
  }
  return error.message;
}
