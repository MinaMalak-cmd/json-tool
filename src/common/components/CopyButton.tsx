import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  IconButton,
  Tooltip,
} from "@mui/material";

interface Props {
  value: string;
}

export default function CopyButton({
  value,
}: Props) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      value
    );
  };

  return (
    <Tooltip title="Copy">
      <IconButton onClick={handleCopy}>
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  );
}
