import { useCallback, useMemo, useState } from "react";
import {
  formatJsonError,
  getTopLevelKeys,
  parseJson,
  processJson,
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
  /** Selected top-level property, or "" for the whole document. */
  selectedProperty: string;
  /** Top-level keys available for selection (empty if N/A). */
  propertyKeys: string[];
  /** Live validation status of the *input*. */
  inputStatus: InputStatus;
  /** Error produced while transforming, if any. */
  outputError: string | null;
}

export interface JsonProcessorApi extends JsonProcessorState {
  setInput: (value: string) => void;
  setMode: (mode: ProcessMode) => void;
  setSelectedProperty: (key: string) => void;
}

/**
 * Headless controller for the JSON processor.
 *
 * Validation runs on every input change (derived, not effect-driven) so the
 * UI always reflects the current text. The output is likewise derived from
 * (input, mode, selectedProperty), keeping the component tree free of manual
 * synchronization.
 */
export function useJsonProcessor(initialInput = ""): JsonProcessorApi {
  const [input, setInputState] = useState(initialInput);
  const [mode, setMode] = useState<ProcessMode>("parse");
  const [selectedProperty, setSelectedProperty] = useState("");

  // Parse once; everything downstream (keys, status, output) is derived.
  const parsed = useMemo(() => parseJson(input), [input]);

  const inputStatus = useMemo<InputStatus>(() => {
    if (input.trim() === "") {
      return { kind: "idle", message: "" };
    }
    return parsed.ok
      ? { kind: "valid", message: "Valid JSON" }
      : { kind: "error", message: formatJsonError(parsed.error) };
  }, [input, parsed]);

  const propertyKeys = useMemo(
    () => (parsed.ok ? getTopLevelKeys(parsed.value) : []),
    [parsed],
  );

  const { output, outputError } = useMemo(() => {
    if (input.trim() === "") {
      return { output: "", outputError: null };
    }
    // Only honor a selected property when it still exists on the input.
    const effectiveProperty = propertyKeys.includes(selectedProperty)
      ? selectedProperty
      : "";
    const result = processJson(input, mode, {
      selectedProperty: effectiveProperty,
    });
    return result.ok
      ? { output: result.value, outputError: null }
      : { output: "", outputError: formatJsonError(result.error) };
  }, [input, mode, selectedProperty, propertyKeys]);

  const setInput = useCallback((value: string) => {
    setInputState(value);
  }, []);

  return {
    input,
    output,
    mode,
    selectedProperty,
    propertyKeys,
    inputStatus,
    outputError,
    setInput,
    setMode,
    setSelectedProperty,
  };
}
