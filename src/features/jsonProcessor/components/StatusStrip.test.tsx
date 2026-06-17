import { describe, expect, it } from "vitest";
import { renderWithTheme, screen } from "../../../test/utils";
import StatusStrip from "./StatusStrip";

describe("StatusStrip", () => {
  it("renders nothing when idle with no message", () => {
    const { container } = renderWithTheme(
      <StatusStrip kind="idle" message="" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("announces a valid status politely", () => {
    renderWithTheme(<StatusStrip kind="valid" message="Valid JSON" />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Valid JSON");
  });

  it("announces errors assertively via the alert role", () => {
    renderWithTheme(
      <StatusStrip kind="error" message="Unexpected token (line 2, column 5)" />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Unexpected token (line 2, column 5)",
    );
  });
});
