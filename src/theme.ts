import { createTheme } from "@mui/material/styles";

/**
 * A refined dark theme tuned for a developer tool: deep slate surfaces, a
 * cyan→violet accent, and a monospace stack reserved for code surfaces.
 */
export const ACCENT = "#5eead4";
export const ACCENT_ALT = "#818cf8";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: ACCENT },
    secondary: { main: ACCENT_ALT },
    background: {
      default: "#0b1120",
      paper: "#0f172a",
    },
    success: { main: "#34d399" },
    error: { main: "#f87171" },
    divider: "rgba(148, 163, 184, 0.16)",
    text: {
      primary: "#e2e8f0",
      secondary: "#94a3b8",
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h6: { fontWeight: 700, letterSpacing: "-0.01em" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
    },
  },
});

/** Monospace stack used for all code/editor surfaces. */
export const MONO_FONT =
  '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, monospace';

export default theme;
