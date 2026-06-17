import { describe, expect, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithTheme, screen } from "../../../test/utils";
import CopyButton from "./CopyButton";

describe("CopyButton", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("is disabled when there is nothing to copy", () => {
    renderWithTheme(<CopyButton value="" label="Copy input" />);
    expect(screen.getByRole("button", { name: "Copy input" })).toBeDisabled();
  });

  it("writes the value to the clipboard and confirms", async () => {
    // userEvent.setup() installs its own clipboard stub, so spy afterwards.
    const user = userEvent.setup();
    const writeText = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();

    renderWithTheme(<CopyButton value='{"a":1}' label="Copy output" />);
    await user.click(screen.getByRole("button", { name: "Copy output" }));

    expect(writeText).toHaveBeenCalledWith('{"a":1}');
    // Confirmation: the icon swaps to a checkmark after a successful copy.
    expect(await screen.findByTestId("CheckRoundedIcon")).toBeInTheDocument();
  });
});
