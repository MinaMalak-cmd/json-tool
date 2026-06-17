import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithTheme, screen } from "../../../test/utils";
import PropertySelector from "./PropertySelector";

describe("PropertySelector", () => {
  it("renders nothing when there are no keys", () => {
    const { container } = renderWithTheme(
      <PropertySelector keys={[]} value="" onChange={() => {}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("lists the provided keys plus a whole-document option", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <PropertySelector
        keys={["customer", "items"]}
        value=""
        onChange={() => {}}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    expect(
      screen.getByRole("option", { name: "Whole document" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "customer" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "items" })).toBeInTheDocument();
  });

  it("emits the selected key", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithTheme(
      <PropertySelector
        keys={["customer", "items"]}
        value=""
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "items" }));
    expect(onChange).toHaveBeenCalledWith("items");
  });
});
