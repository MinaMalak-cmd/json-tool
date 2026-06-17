import { useCallback, useMemo, useState } from "react";
import {
  enumeratePaths,
  formatJsonError,
  parseJson,
  processJson,
  type PathOption,
  type ProcessMode,
} from "../../core/json";

export interface InputStatus {
  kind: "valid" | "error" | "idle";
  message: string;
}

export interface JsonProcessorState {
  input: string;
  output: string;
  mode: ProcessMode;
  /** Selected path label, or "" for the whole document. */
  selectedPath: string;
  /** All addressable paths in the parsed input (empty if N/A). */
  pathOptions: PathOption[];
  /** True when the path list was capped for very large documents. */
  pathsTruncated: boolean;
  /** Live validation status of the *input*. */
  inputStatus: InputStatus;
  /** Error produced while transforming, if any. */
  outputError: string | null;
}

export interface JsonProcessorApi extends JsonProcessorState {
  setInput: (value: string) => void;
  setMode: (mode: ProcessMode) => void;
  setSelectedPath: (label: string) => void;
}

/**
 * Headless controller for the JSON processor.
 *
 * Validation runs on every input change (derived, not effect-driven) so the
 * UI always reflects the current text. The output is likewise derived from
 * (input, mode, selectedPath), keeping the component tree free of manual
 * synchronization.
 */
export function useJsonProcessor(initialInput = ""): JsonProcessorApi {
  const [input, setInputState] = useState(initialInput);
  const [mode, setMode] = useState<ProcessMode>("parse");
  const [selectedPath, setSelectedPath] = useState("");

  // Parse once; everything downstream (paths, status, output) is derived.
  const parsed = useMemo(() => parseJson(input), [input]);

  const inputStatus = useMemo<InputStatus>(() => {
    if (input.trim() === "") {
      return { kind: "idle", message: "" };
    }
    return parsed.ok
      ? { kind: "valid", message: "Valid JSON" }
      : { kind: "error", message: formatJsonError(parsed.error) };
  }, [input, parsed]);

  const { options: pathOptions, truncated: pathsTruncated } = useMemo(
    () =>
      parsed.ok
        ? enumeratePaths(parsed.value)
        : { options: [] as PathOption[], truncated: false },
    [parsed],
  );

  const { output, outputError } = useMemo(() => {
    if (input.trim() === "") {
      return { output: "", outputError: null };
    }
    // Resolve the selected label back to its path segments; ignore a stale
    // selection that no longer exists in the current document.
    const match = pathOptions.find((option) => option.label === selectedPath);
    const result = processJson(input, mode, { path: match?.segments });
    return result.ok
      ? { output: result.value, outputError: null }
      : { output: "", outputError: formatJsonError(result.error) };
  }, [input, mode, selectedPath, pathOptions]);

  const setInput = useCallback((value: string) => {
    setInputState(value);
  }, []);

  return {
    input,
    output,
    mode,
    selectedPath,
    pathOptions,
    pathsTruncated,
    inputStatus,
    outputError,
    setInput,
    setMode,
    setSelectedPath,
  };
}
