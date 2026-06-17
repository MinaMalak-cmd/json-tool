import type { JsonValue } from "./types";

/** A single addressable location inside a JSON document. */
export interface PathOption {
  /** Human-readable, dot/bracket notation, e.g. `data.getTitleV2.state`. */
  label: string;
  /** Machine path used to resolve the value, e.g. `["data","getTitleV2","state"]`. */
  segments: Array<string | number>;
}

/** Safety cap so pathological documents can't enumerate unbounded options. */
export const MAX_PATH_OPTIONS = 5000;

/** Append a segment to a label using dot notation for keys, `[i]` for indices. */
function joinLabel(base: string, segment: string | number): string {
  if (typeof segment === "number") return `${base}[${segment}]`;
  return base === "" ? segment : `${base}.${segment}`;
}

/**
 * Enumerate every addressable path inside a JSON value (objects and arrays at
 * any depth, plus their leaf values).
 *
 * Recursion deliberately stops at strings: a stringified-JSON blob (like a
 * `state` field) stays a single selectable leaf, so the user can pick it and
 * have it unwrapped — rather than exploding its escaped contents into paths.
 *
 * Results are capped at {@link MAX_PATH_OPTIONS}; `truncated` signals when the
 * document was larger than the cap.
 */
export function enumeratePaths(value: JsonValue): {
  options: PathOption[];
  truncated: boolean;
} {
  const options: PathOption[] = [];
  let truncated = false;

  const walk = (node: JsonValue, segments: Array<string | number>, label: string) => {
    if (truncated) return;

    const children: Array<[string | number, JsonValue]> = Array.isArray(node)
      ? node.map((child, i) => [i, child])
      : node !== null && typeof node === "object"
        ? Object.entries(node)
        : [];

    for (const [segment, child] of children) {
      if (options.length >= MAX_PATH_OPTIONS) {
        truncated = true;
        return;
      }
      const childSegments = [...segments, segment];
      const childLabel = joinLabel(label, segment);
      options.push({ label: childLabel, segments: childSegments });
      // Recurse into containers only; strings/primitives are leaves.
      if (child !== null && typeof child === "object") {
        walk(child, childSegments, childLabel);
      }
    }
  };

  walk(value, [], "");
  return { options, truncated };
}

/**
 * Resolve a path within a JSON value.
 *
 * @returns the value at the path, or `undefined` if any segment is missing or
 * traverses into a non-container.
 */
export function pickPath(
  value: JsonValue,
  segments: Array<string | number>,
): JsonValue | undefined {
  let current: JsonValue = value;
  for (const segment of segments) {
    if (Array.isArray(current) && typeof segment === "number") {
      if (segment < 0 || segment >= current.length) return undefined;
      current = current[segment];
    } else if (
      current !== null &&
      typeof current === "object" &&
      !Array.isArray(current) &&
      typeof segment === "string" &&
      Object.prototype.hasOwnProperty.call(current, segment)
    ) {
      current = current[segment];
    } else {
      return undefined;
    }
  }
  return current;
}
