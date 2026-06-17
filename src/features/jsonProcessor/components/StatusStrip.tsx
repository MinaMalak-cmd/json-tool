import { Box, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

export type StatusKind = "valid" | "error" | "idle";

export interface StatusStripProps {
  kind: StatusKind;
  message: string;
}

const COLOR: Record<StatusKind, string> = {
  valid: "success.main",
  error: "error.main",
  idle: "text.secondary",
};

/**
 * A compact status line shown beneath an editor: a green confirmation when the
 * JSON is valid, or a red, descriptive error message when it is not.
 */
export default function StatusStrip({ kind, message }: StatusStripProps) {
  if (kind === "idle" && !message) return null;

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      role={kind === "error" ? "alert" : "status"}
      sx={{
        px: 1.5,
        py: 0.75,
        borderTop: "1px solid",
        borderColor: "divider",
        color: COLOR[kind],
        backgroundColor:
          kind === "error"
            ? "rgba(248, 113, 113, 0.08)"
            : "rgba(148, 163, 184, 0.04)",
      }}
    >
      {kind === "error" ? (
        <ErrorRoundedIcon fontSize="small" />
      ) : kind === "valid" ? (
        <CheckCircleRoundedIcon fontSize="small" />
      ) : null}
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, whiteSpace: "pre-wrap" }}
      >
        {message}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
    </Stack>
  );
}
