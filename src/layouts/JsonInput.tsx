import { Height } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { text } from "node:stream/consumers";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function JsonInput({
  value,
  onChange,
}: Props) {
  return (
    <TextField
      label="Input JSON"
      multiline
      fullWidth
      minRows={15}
      value={value}
      style={{
        // background: "green",
        height: "600px",
      }}
      className="json-input"
      sx={{
        "& .MuiInputBase": {
          height: "600px",
          background: "green",
        },
      }}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}
