import { describe, expect, it, vi } from "vitest";
import { fireEvent, renderWithTheme, screen, waitFor } from "../../../test/utils";
import FileUploadButton from "./FileUploadButton";

describe("FileUploadButton", () => {
  it("reads a selected file and forwards its contents", async () => {
    const onFileLoaded = vi.fn();
    renderWithTheme(<FileUploadButton onFileLoaded={onFileLoaded} />);

    const input = screen.getByLabelText("Upload JSON file") as HTMLInputElement;
    const file = new File(['{"a":1}'], "data.json", {
      type: "application/json",
    });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() =>
      expect(onFileLoaded).toHaveBeenCalledWith('{"a":1}', "data.json"),
    );
  });
});
