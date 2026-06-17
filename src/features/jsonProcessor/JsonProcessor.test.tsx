import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithTheme, screen, waitFor } from "../../test/utils";
import JsonProcessor from "./JsonProcessor";

const outputText = () =>
  screen.getByTestId("output-editor").textContent ?? "";

describe("JsonProcessor (integration)", () => {
  it("loads the sample and deep-parses nested stringified JSON into the output", async () => {
    const user = userEvent.setup();
    renderWithTheme(<JsonProcessor />);

    await user.click(screen.getByRole("button", { name: /load sample/i }));

    // The sample's `customer` field is a stringified object; after deep-parse
    // its contents surface as real JSON in the read-only output.
    await waitFor(() => expect(outputText()).toContain("Ada Lovelace"));
    expect(screen.getByText("Valid JSON")).toBeInTheDocument();
  });

  it("switches to stringify mode and escapes the document", async () => {
    const user = userEvent.setup();
    renderWithTheme(<JsonProcessor />);

    await user.click(screen.getByRole("button", { name: /load sample/i }));
    await user.click(screen.getByRole("button", { name: "Stringify JSON" }));

    // Escaped string form contains backslash-escaped quotes.
    await waitFor(() => expect(outputText()).toContain('\\"'));
  });

  it("narrows the output to a single selected property", async () => {
    const user = userEvent.setup();
    renderWithTheme(<JsonProcessor />);

    await user.click(screen.getByRole("button", { name: /load sample/i }));
    await waitFor(() => expect(outputText()).toContain("order-1024"));

    // The path selector is a searchable combobox; type to filter then pick.
    const combo = screen.getByRole("combobox");
    await user.click(combo);
    await user.type(combo, "customer");
    await user.click(await screen.findByRole("option", { name: "customer" }));

    // Only the customer object should remain; the order id should be gone.
    await waitFor(() => expect(outputText()).not.toContain("order-1024"));
    expect(outputText()).toContain("Ada Lovelace");
  });

  it("clears the workspace", async () => {
    const user = userEvent.setup();
    renderWithTheme(<JsonProcessor />);

    await user.click(screen.getByRole("button", { name: /load sample/i }));
    await waitFor(() => expect(outputText()).toContain("order-1024"));

    await user.click(screen.getByRole("button", { name: /clear/i }));
    // Output empties (the editor falls back to its placeholder text).
    await waitFor(() => expect(outputText()).not.toContain("order-1024"));
  });

  it("collapses the input pane", async () => {
    const user = userEvent.setup();
    renderWithTheme(<JsonProcessor />);

    const collapseBtn = screen.getByRole("button", { name: /collapse input/i });
    expect(collapseBtn).toHaveAttribute("aria-expanded", "true");

    await user.click(collapseBtn);
    expect(
      screen.getByRole("button", { name: /expand input/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
