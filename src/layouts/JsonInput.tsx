import { TextField } from "@mui/material";

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
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}
