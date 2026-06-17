import { IconButton, Tooltip } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

export interface DownloadButtonProps {
  /** Text contents to download. */
  value: string;
  /** Suggested file name, e.g. "parsed.json". */
  fileName: string;
  /** MIME type for the blob. */
  mimeType?: string;
  label: string;
}

/**
 * Download the given text as a file. Builds an object URL on the fly and
 * triggers a hidden anchor click, so it works entirely client-side with no
 * server round-trip. Disabled when there is nothing to download.
 */
export default function DownloadButton({
  value,
  fileName,
  mimeType = "application/json",
  label,
}: DownloadButtonProps) {
  const handleDownload = () => {
    if (!value) return;
    const blob = new Blob([value], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          size="small"
          onClick={handleDownload}
          disabled={!value}
          aria-label={label}
        >
          <DownloadRoundedIcon fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  );
}
