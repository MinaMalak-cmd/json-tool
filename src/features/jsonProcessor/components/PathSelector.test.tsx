import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithTheme, screen } from "../../../test/utils";
import PathSelector from "./PathSelector";
import type { PathOption } from "../../../core/json";

const OPTIONS: PathOption[] = [
  { label: "data", segments: ["data"] },
  { label: "data.getTitleV2", segments: ["data", "getTitleV2"] },
  { label: "data.getTitleV2.state", segments: ["data", "getTitleV2", "state"] },
];

describe("PathSelector", () => {
  it("renders nothing when there are no options", () => {
    const { container } = renderWithTheme(
      <PathSelector options={[]} value="" onChange={() => {}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("shows a descriptive label and placeholder", () => {
    renderWithTheme(
      <PathSelector options={OPTIONS} value="" onChange={() => {}} />,
    );
    expect(
      screen.getByLabelText(/property \/ path to extract/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search a property/i),
    ).toBeInTheDocument();
  });

  it("filters by typed text and emits the chosen nested path", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <PathSelector options={OPTIONS} value="" onChange={onChange} />,
    );

    const combo = screen.getByRole("combobox");
    await user.click(combo);
    await user.type(combo, "state");

    await user.click(
      await screen.findByRole("option", { name: "data.getTitleV2.state" }),
    );
    expect(onChange).toHaveBeenCalledWith("data.getTitleV2.state");
  });
});
