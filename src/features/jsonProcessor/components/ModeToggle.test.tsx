import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithTheme, screen } from "../../../test/utils";
import ModeToggle from "./ModeToggle";

describe("ModeToggle", () => {
  it("marks the active mode as pressed", () => {
    renderWithTheme(<ModeToggle mode="parse" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Parse JSON" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("invokes onChange when a different mode is chosen", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<ModeToggle mode="parse" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Stringify JSON" }));
    expect(onChange).toHaveBeenCalledWith("stringify");
  });

  it("does not fire when re-selecting the active mode", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(<ModeToggle mode="parse" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Parse JSON" }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
