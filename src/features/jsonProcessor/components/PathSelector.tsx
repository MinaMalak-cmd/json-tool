import { Autocomplete, TextField } from "@mui/material";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import { InputAdornment } from "@mui/material";
import type { PathOption } from "../../../core/json";

export interface PathSelectorProps {
  /** Every addressable path in the parsed input. */
  options: PathOption[];
  /** Currently selected path label, or "" for the whole document. */
  value: string;
  onChange: (label: string) => void;
  disabled?: boolean;
}

/**
 * A searchable selector over every nested path in the document. The user can
 * type to filter (e.g. "state" finds `data.getTitleV2.state`) and pick a
 * single property — at any depth — to extract and parse. Clearing the field
 * falls back to processing the whole document.
 *
 * Hidden entirely when the input exposes no addressable paths.
 */
export default function PathSelector({
  options,
  value,
  onChange,
  disabled,
}: PathSelectorProps) {
  if (options.length === 0) return null;

  const labels = options.map((option) => option.label);

  return (
    <Autocomplete
      size="small"
      sx={{ minWidth: 280, maxWidth: 420 }}
      options={labels}
      value={value === "" ? null : value}
      onChange={(_event, next) => onChange(next ?? "")}
      autoHighlight
      disabled={disabled}
      // Large documents: virtualize-friendly cap on rendered matches.
      filterOptions={(opts, state) => {
        const query = state.inputValue.toLowerCase();
        const filtered = query
          ? opts.filter((o) => o.toLowerCase().includes(query))
          : opts;
        return filtered.slice(0, 100);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Property / path to extract"
          placeholder="Search a property, e.g. state…"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <AccountTreeRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
}
