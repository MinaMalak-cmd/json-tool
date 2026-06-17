import type { JsonValue } from "./types";

/** A string value qualifies for unwrapping only if it parses to object/array. */
function tryUnwrapString(value: string): JsonValue | undefined {
  const trimmed = value.trim();
  // Cheap pre-check: only attempt to parse things that look like a JSON
  // object or array. This keeps plain strings, numeric-looking IDs ("123")
  // and booleans-as-text untouched, which is the safest default.
  if (
    !(
      (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"))
    )
  ) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(trimmed) as JsonValue;
    if (parsed !== null && typeof parsed === "object") {
      return parsed;
    }
  } catch {
    // Not actually JSON — leave the original string alone.
  }
  return undefined;
}

/**
 * Recursively walk a value and replace any string that is itself a
 * stringified JSON object/array with its parsed equivalent.
 *
 * The walk is fully recursive: newly unwrapped objects are themselves scanned,
 * so deeply nested stringified payloads are flattened in a single pass.
 *
 * Strings that parse to primitives (numbers, booleans, null, bare strings)
 * are intentionally left as-is to avoid mangling IDs and codes.
 */
export function deepParseValue(value: JsonValue): JsonValue {
  if (typeof value === "string") {
    const unwrapped = tryUnwrapString(value);
    return unwrapped === undefined ? value : deepParseValue(unwrapped);
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepParseValue(item));
  }

  if (value !== null && typeof value === "object") {
    const result: { [key: string]: JsonValue } = {};
    for (const [key, child] of Object.entries(value)) {
      result[key] = deepParseValue(child);
    }
    return result;
  }

  // Primitive (number | boolean | null) — nothing to unwrap.
  return value;
}
