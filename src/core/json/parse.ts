import type { JsonError, JsonResult, JsonValue } from "./types";

/**
 * Extract a 0-based character offset from a native JSON.parse error message.
 *
 * Engines phrase these differently, e.g.
 *   - V8:        "Unexpected token } in JSON at position 42"
 *   - V8 (new):  "Expected ',' ... in JSON at position 42 (line 3 column 5)"
 *   - JSC:       "JSON Parse error: ..."  (no position)
 * We only rely on the "position N" fragment, which is the most portable.
 */
function extractPosition(message: string): number | undefined {
  const match = message.match(/position (\d+)/i);
  if (!match) return undefined;
  return Number(match[1]);
}

/** Translate a character offset within `source` into 1-based line/column. */
function offsetToLineColumn(
  source: string,
  offset: number,
): { line: number; column: number } {
  const upto = source.slice(0, offset);
  const lines = upto.split("\n");
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  return { line, column };
}

/** Extract an explicit "(line X column Y)" pair when the engine provides one. */
function extractLineColumn(
  message: string,
): { line: number; column: number } | undefined {
  const match = message.match(/line (\d+) column (\d+)/i);
  if (!match) return undefined;
  return { line: Number(match[1]), column: Number(match[2]) };
}

/** Build a friendly {@link JsonError} from a raw parse exception. */
function toJsonError(error: unknown, source: string): JsonError {
  const raw =
    error instanceof Error ? error.message : "Invalid JSON input.";

  // Resolve location: prefer the engine's explicit line/column, then fall
  // back to deriving it from a character offset, if either is provided.
  let location = extractLineColumn(raw);
  if (!location) {
    const position = extractPosition(raw);
    if (position !== undefined) {
      location = offsetToLineColumn(source, position);
    }
  }

  // Strip engine-specific noise so the message reads cleanly; we surface
  // line/column separately. Handles both the V8 "in JSON at position ..."
  // tail and the "..."snippet" is not valid JSON" form.
  const message = raw
    .replace(/\s*in JSON at position \d+.*$/i, "")
    .replace(/,?\s*"[^]*?"\s*is not valid JSON\.?$/i, "")
    .replace(/^JSON\.parse:\s*/i, "")
    .trim();

  return location
    ? { message: message || "Invalid JSON input.", ...location }
    : { message: message || "Invalid JSON input." };
}

/**
 * Parse a JSON string without ever throwing.
 *
 * @returns a {@link JsonResult}: `{ ok: true, value }` on success, or
 * `{ ok: false, error }` with a descriptive, location-aware error otherwise.
 */
export function parseJson(source: string): JsonResult {
  if (source.trim() === "") {
    return {
      ok: false,
      error: { message: "Input is empty. Paste or upload some JSON." },
    };
  }

  try {
    const value = JSON.parse(source) as JsonValue;
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error: toJsonError(error, source) };
  }
}
