import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useJsonProcessor } from "./useJsonProcessor";
import EditorPane from "./components/EditorPane";
import ModeToggle from "./components/ModeToggle";
import PathSelector from "./components/PathSelector";
import FileUploadButton from "./components/FileUploadButton";
import DownloadButton from "./components/DownloadButton";
import StatusStrip from "./components/StatusStrip";
import { SAMPLE_JSON } from "./sample";

/**
 * The full JSON processing workspace: a toolbar of controls above two parallel
 * editor panes (editable input + read-only output). All transformation state
 * lives in {@link useJsonProcessor}; this component is purely presentational
 * wiring.
 */
export default function JsonProcessor() {
  const {
    input,
    output,
    mode,
    selectedPath,
    pathOptions,
    inputStatus,
    outputError,
    setInput,
    setMode,
    setSelectedPath,
  } = useJsonProcessor();

  const [inputCollapsed, setInputCollapsed] = useState(false);
  const [outputCollapsed, setOutputCollapsed] = useState(false);

  const isParse = mode === "parse";
  const outputTitle = isParse ? "Output · Parsed" : "Output · String";
  const downloadName = isParse ? "parsed.json" : "stringified.txt";
  const downloadMime = isParse ? "application/json" : "text/plain";

  return (
    <Stack spacing={2} sx={{ height: "100%", minHeight: 0 }}>
      {/* Toolbar */}
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        flexWrap="wrap"
        useFlexGap
      >
        <ModeToggle mode={mode} onChange={setMode} />
        {isParse && (
          <PathSelector
            options={pathOptions}
            value={selectedPath}
            onChange={setSelectedPath}
          />
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="text"
          color="inherit"
          size="small"
          startIcon={<AutoAwesomeRoundedIcon />}
          onClick={() => setInput(SAMPLE_JSON)}
        >
          Load sample
        </Button>
        <Button
          variant="text"
          color="inherit"
          size="small"
          startIcon={<RestartAltRoundedIcon />}
          onClick={() => setInput("")}
          disabled={!input}
        >
          Clear
        </Button>
      </Stack>

      {/* Parallel editors */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        }}
      >
        <EditorPane
          title="Input"
          value={input}
          onChange={setInput}
          placeholder="Paste JSON here, or upload a file…"
          collapsed={inputCollapsed}
          onToggleCollapse={() => setInputCollapsed((c) => !c)}
          headerActions={
            <FileUploadButton onFileLoaded={(contents) => setInput(contents)} />
          }
          footer={
            <StatusStrip kind={inputStatus.kind} message={inputStatus.message} />
          }
        />

        <EditorPane
          title={outputTitle}
          value={output}
          readOnly
          placeholder="Transformed JSON will appear here…"
          collapsed={outputCollapsed}
          onToggleCollapse={() => setOutputCollapsed((c) => !c)}
          headerActions={
            <DownloadButton
              value={output}
              fileName={downloadName}
              mimeType={downloadMime}
              label="Download output"
            />
          }
          footer={
            outputError ? (
              <StatusStrip kind="error" message={outputError} />
            ) : undefined
          }
        />
      </Box>
    </Stack>
  );
}
