import { type ReactNode } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import CodeEditor from "./CodeEditor";
import CopyButton from "./CopyButton";

export interface EditorPaneProps {
  title: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  /** Optional extra controls rendered in the header (e.g. upload button). */
  headerActions?: ReactNode;
  /** Optional status/error strip rendered under the editor. */
  footer?: ReactNode;
}

/**
 * A self-contained editor card: header with title, custom actions, copy and
 * collapse controls, plus a collapsible code editor body and optional footer.
 * Used for both the editable input and the read-only output.
 */
export default function EditorPane({
  title,
  value,
  onChange,
  readOnly = false,
  placeholder,
  collapsed,
  onToggleCollapse,
  headerActions,
  footer,
}: EditorPaneProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          px: 1.5,
          py: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(148, 163, 184, 0.04)",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, letterSpacing: "0.02em", flexShrink: 0 }}
        >
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {headerActions}
        <CopyButton value={value} label={`Copy ${title.toLowerCase()}`} />
        <Tooltip title={collapsed ? "Expand" : "Collapse"}>
          <IconButton
            size="small"
            onClick={onToggleCollapse}
            aria-label={`${collapsed ? "Expand" : "Collapse"} ${title.toLowerCase()}`}
            aria-expanded={!collapsed}
          >
            {collapsed ? (
              <UnfoldMoreRoundedIcon fontSize="small" />
            ) : (
              <UnfoldLessRoundedIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Stack>

      <Collapse
        in={!collapsed}
        timeout="auto"
        sx={{
          flexGrow: collapsed ? 0 : 1,
          minHeight: 0,
          "& .MuiCollapse-wrapper": { height: "100%" },
          "& .MuiCollapse-wrapperInner": { height: "100%" },
        }}
      >
        <Box sx={{ height: "100%", minHeight: 0 }}>
          <CodeEditor
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            placeholder={placeholder}
            ariaLabel={title}
          />
        </Box>
      </Collapse>

      {footer}
    </Paper>
  );
}
