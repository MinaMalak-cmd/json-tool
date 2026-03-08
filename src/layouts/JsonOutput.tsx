import { TextField } from "@mui/material";

interface Props {
  value: string;
}

export default function JsonOutput({
  value,
}: Props) {
  return (
    <TextField
      label="Output"
      multiline
      fullWidth
      minRows={15}
      value={value}
    />
  );
}
