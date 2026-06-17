import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import type { ProcessMode } from "../../../core/json";

export interface ModeToggleProps {
  mode: ProcessMode;
  onChange: (mode: ProcessMode) => void;
}

/** Segmented control to switch between Parse and Stringify transformations. */
export default function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      size="small"
      color="primary"
      aria-label="Transformation mode"
      onChange={(_event, next: ProcessMode | null) => {
        if (next) onChange(next);
      }}
    >
      <ToggleButton value="parse" aria-label="Parse JSON">
        <DataObjectRoundedIcon fontSize="small" sx={{ mr: 0.75 }} />
        Parse
      </ToggleButton>
      <ToggleButton value="stringify" aria-label="Stringify JSON">
        <FormatQuoteRoundedIcon fontSize="small" sx={{ mr: 0.75 }} />
        Stringify
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
