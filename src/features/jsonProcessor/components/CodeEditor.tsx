import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { Box } from "@mui/material";

export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  /** Accessible label, forwarded to the underlying editable element. */
  ariaLabel: string;
}

/**
 * Thin wrapper around CodeMirror 6 configured for JSON: syntax highlighting,
 * line numbers, code folding and a dark theme. When `readOnly` is set the
 * surface still allows selection/copy but blocks edits — used for the output
 * pane.
 */
export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  placeholder,
  ariaLabel,
}: CodeEditorProps) {
  const extensions = useMemo(
    () => [json(), EditorView.lineWrapping],
    [],
  );

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "auto",
        "& .cm-editor": { height: "100%", fontSize: 13.5 },
        "& .cm-editor.cm-focused": { outline: "none" },
        "& .cm-scroller": { fontFamily: "inherit" },
      }}
      data-testid={readOnly ? "output-editor" : "input-editor"}
    >
      <CodeMirror
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        editable={!readOnly}
        placeholder={placeholder}
        theme={oneDark}
        extensions={extensions}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: !readOnly,
          autocompletion: false,
        }}
        aria-label={ariaLabel}
      />
    </Box>
  );
}
