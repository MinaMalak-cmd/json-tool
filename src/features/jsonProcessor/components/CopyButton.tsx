import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export interface CopyButtonProps {
  /** Text to place on the clipboard. */
  value: string;
  /** Accessible label, e.g. "Copy input". */
  label: string;
}

/**
 * Copy-to-clipboard icon button with a transient "copied" confirmation.
 * Disabled when there is nothing to copy.
 */
export default function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be denied; fail silently rather than crash.
    }
  };

  return (
    <Tooltip title={copied ? "Copied!" : label}>
      {/* span keeps the tooltip working while the button is disabled */}
      <span>
        <IconButton
          size="small"
          onClick={handleCopy}
          disabled={!value}
          aria-label={label}
          color={copied ? "success" : "default"}
        >
          {copied ? (
            <CheckRoundedIcon fontSize="small" />
          ) : (
            <ContentCopyRoundedIcon fontSize="small" />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
}
