import { type ReactElement, type ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

/** Render a component wrapped in the app's MUI theme provider. */
export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from "@testing-library/react";
