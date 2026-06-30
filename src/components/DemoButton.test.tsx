import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithTheme, screen } from "../test/utils";
import DemoButton from "./DemoButton";

describe("DemoButton", () => {
  it("does not render the video until opened", () => {
    renderWithTheme(<DemoButton />);
    expect(screen.queryByTestId("demo-video")).not.toBeInTheDocument();
  });

  it("opens a dialog with the demo video on click", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DemoButton />);
    console.log("hello");
    await user.click(screen.getByRole("button", { name: /watch demo/i }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    const video = screen.getByTestId("demo-video");
    expect(video).toHaveAttribute("src", expect.stringContaining("demo.mp4"));
  });

  it("closes the dialog via the close button", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DemoButton />);

    await user.click(screen.getByRole("button", { name: /watch demo/i }));
    await screen.findByRole("dialog");

    await user.click(screen.getByRole("button", { name: /close demo/i }));
    await screen.findByRole("button", { name: /watch demo/i });
    expect(screen.queryByTestId("demo-video")).not.toBeInTheDocument();
  });
});
