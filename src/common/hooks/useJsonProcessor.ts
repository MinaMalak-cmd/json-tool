import { useState } from "react";
import { validateJson } from "../utils/validateJson";
import { parseJson, stringifyJson } from "../services/jsonService";

export function useJsonProcessor() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    const validation = validateJson(input);

    if (!validation.isValid) {
      setError(validation.error ?? "Invalid JSON");
      setOutput("");
      return;
    }

    try {
      const result = parseJson(input);
      setOutput(result);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleStringify = () => {
    const validation = validateJson(input);

    if (!validation.isValid) {
      setError(validation.error ?? "Invalid JSON");
      setOutput("");
      return;
    }

    try {
      const result = stringifyJson(input);
      setOutput(result);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return {
    input,
    output,
    error,
    setInput,
    handleParse,
    handleStringify
  };
}