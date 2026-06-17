import { useRef } from "react";
import { Button } from "@mui/material";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";

export interface FileUploadButtonProps {
  /** Called with the file's text contents once it has been read. */
  onFileLoaded: (contents: string, fileName: string) => void;
  /** Optional error reporter, e.g. when the file cannot be read. */
  onError?: (message: string) => void;
}

/**
 * Upload a `.json`/text file and hand its contents back to the caller.
 * Uses a hidden native input behind a styled MUI button.
 */
export default function FileUploadButton({
  onFileLoaded,
  onError,
}: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Always reset so selecting the same file twice re-triggers change.
    event.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onFileLoaded(String(reader.result ?? ""), file.name);
    reader.onerror = () =>
      onError?.(`Could not read file "${file.name}".`);
    reader.readAsText(file);
  };

  return (
    <Button
      variant="outlined"
      color="inherit"
      size="small"
      startIcon={<FileUploadRoundedIcon />}
      onClick={() => inputRef.current?.click()}
    >
      Upload
      <input
        ref={inputRef}
        type="file"
        accept=".json,application/json,text/plain"
        hidden
        aria-label="Upload JSON file"
        onChange={handleChange}
      />
    </Button>
  );
}
