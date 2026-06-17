import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

/** Sentinel value representing "use the whole document". */
export const WHOLE_DOCUMENT = "";

export interface PropertySelectorProps {
  /** Top-level keys of the parsed input object. */
  keys: string[];
  /** Currently selected key, or {@link WHOLE_DOCUMENT}. */
  value: string;
  onChange: (key: string) => void;
  disabled?: boolean;
}

/**
 * Dropdown built from `Object.keys` of the input object that lets the user
 * narrow processing to a single property. Hidden entirely when the input has
 * no selectable keys (arrays / primitives / invalid).
 */
export default function PropertySelector({
  keys,
  value,
  onChange,
  disabled,
}: PropertySelectorProps) {
  if (keys.length === 0) return null;

  return (
    <FormControl size="small" sx={{ minWidth: 180 }} disabled={disabled}>
      <InputLabel id="property-selector-label">Property</InputLabel>
      <Select
        labelId="property-selector-label"
        label="Property"
        value={value}
        onChange={(event: SelectChangeEvent) => onChange(event.target.value)}
        aria-label="Select property to parse"
      >
        <MenuItem value={WHOLE_DOCUMENT}>
          <em>Whole document</em>
        </MenuItem>
        {keys.map((key) => (
          <MenuItem key={key} value={key}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
