import { Alert } from "@mui/material";

interface Props {
  message: string | null;
}

export default function ErrorMessage({
  message,
}: Props) {
  if (!message) return null;

  return (
    <Alert severity="error">
      {message}
    </Alert>
  );
}
