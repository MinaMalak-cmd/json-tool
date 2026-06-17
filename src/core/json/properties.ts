import type { JsonValue } from "./types";

/** A plain JSON object (record), as opposed to an array or primitive. */
export type JsonObject = { [key: string]: JsonValue };

/** Type guard: is the value a plain JSON object (not array, not null)? */
export function isJsonObject(value: JsonValue): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Return the selectable top-level property keys of a JSON value.
 *
 * Only plain objects expose keys; arrays and primitives return an empty list,
 * which the UI uses to hide the property selector.
 */
export function getTopLevelKeys(value: JsonValue): string[] {
  return isJsonObject(value) ? Object.keys(value) : [];
}

/**
 * Pick a single property out of a JSON object.
 *
 * @returns the property's value, or `undefined` if the key is absent or the
 * value is not an object.
 */
export function pickProperty(
  value: JsonValue,
  key: string,
): JsonValue | undefined {
  if (!isJsonObject(value)) return undefined;
  return Object.prototype.hasOwnProperty.call(value, key)
    ? value[key]
    : undefined;
}
