import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useJsonProcessor } from "./useJsonProcessor";

describe("useJsonProcessor", () => {
  it("starts idle with empty input and output", () => {
    const { result } = renderHook(() => useJsonProcessor());
    expect(result.current.input).toBe("");
    expect(result.current.output).toBe("");
    expect(result.current.inputStatus.kind).toBe("idle");
  });

  it("validates input live and reports errors", () => {
    const { result } = renderHook(() => useJsonProcessor());

    act(() => result.current.setInput("{bad}"));
    expect(result.current.inputStatus.kind).toBe("error");
    expect(result.current.inputStatus.message.length).toBeGreaterThan(0);

    act(() => result.current.setInput('{"a":1}'));
    expect(result.current.inputStatus.kind).toBe("valid");
  });

  it("parses and deep-unwraps stringified JSON by default", () => {
    const { result } = renderHook(() => useJsonProcessor());
    act(() => result.current.setInput('{"payload":"{\\"x\\":1}"}'));
    expect(JSON.parse(result.current.output)).toEqual({ payload: { x: 1 } });
  });

  it("exposes nested paths for the path selector", () => {
    const { result } = renderHook(() => useJsonProcessor());
    act(() => result.current.setInput('{"data":{"state":"x"}}'));
    const labels = result.current.pathOptions.map((o) => o.label);
    expect(labels).toContain("data");
    expect(labels).toContain("data.state");
  });

  it("narrows output to a selected nested path", () => {
    const { result } = renderHook(() => useJsonProcessor());
    act(() =>
      result.current.setInput(
        '{"data":{"getTitleV2":{"state":"{\\"x\\":1}"}}}',
      ),
    );
    act(() => result.current.setSelectedPath("data.getTitleV2.state"));
    expect(JSON.parse(result.current.output)).toEqual({ x: 1 });
  });

  it("ignores a stale selected path that no longer exists", () => {
    const { result } = renderHook(() => useJsonProcessor());
    act(() => result.current.setInput('{"keep":1}'));
    act(() => result.current.setSelectedPath("keep"));
    // Replace input with one lacking the previously-selected key.
    act(() => result.current.setInput('{"other":2}'));
    expect(JSON.parse(result.current.output)).toEqual({ other: 2 });
  });

  it("switches to stringify mode", () => {
    const { result } = renderHook(() => useJsonProcessor());
    act(() => result.current.setInput('{"a":1}'));
    act(() => result.current.setMode("stringify"));
    expect(result.current.output).toBe('"{\\"a\\":1}"');
  });

  it("surfaces transform errors in outputError", () => {
    const { result } = renderHook(() => useJsonProcessor());
    act(() => result.current.setInput("{nope}"));
    expect(result.current.outputError).not.toBeNull();
    expect(result.current.output).toBe("");
  });
});
