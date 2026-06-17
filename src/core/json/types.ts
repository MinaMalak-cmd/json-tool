/**
 * Shared types for the core JSON engine.
 *
 * The engine is deliberately framework-agnostic: every function here is pure
 * and synchronous so it can be unit-tested in isolation and reused outside of
 * React if needed.
 */

/** Any value that can be represented as JSON. */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/** A structured, human-friendly parse/validation error. */
export interface JsonError {
  /** Message suitable for display to the user. */
  message: string;
  /** 1-based line number where the error occurred, when known. */
  line?: number;
  /** 1-based column number where the error occurred, when known. */
  column?: number;
}

/**
 * Discriminated result type. Functions never throw — they return either a
 * success carrying the value or a failure carrying a descriptive error.
 */
export type JsonResult<T = JsonValue> =
  | { ok: true; value: T }
  | { ok: false; error: JsonError };
