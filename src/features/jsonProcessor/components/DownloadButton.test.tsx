import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithTheme, screen } from "../../../test/utils";
import DownloadButton from "./DownloadButton";

describe("DownloadButton", () => {
  beforeEach(() => {
    // jsdom doesn't implement object URLs; stub them.
    URL.createObjectURL = vi.fn(() => "blob:mock");
    URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("is disabled when there is nothing to download", () => {
    renderWithTheme(
      <DownloadButton value="" fileName="parsed.json" label="Download output" />,
    );
    expect(
      screen.getByRole("button", { name: "Download output" }),
    ).toBeDisabled();
  });

  it("triggers an anchor download with the given file name", async () => {
    const user = userEvent.setup();
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click");

    renderWithTheme(
      <DownloadButton
        value='{"a":1}'
        fileName="parsed.json"
        label="Download output"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Download output" }));

    expect(URL.createObjectURL).toHaveBeenCalledOnce();
    expect(clickSpy).toHaveBeenCalledOnce();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock");
  });
});
