import { Button } from "@mui/material";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import { BUY_ME_A_COFFEE_URL } from "../config";

/**
 * Support link to the owner's Buy Me a Coffee page. Renders nothing when no
 * URL is configured.
 */
export default function BuyMeCoffeeButton() {
  if (!BUY_ME_A_COFFEE_URL) return null;

  return (
    <Button
      component="a"
      href={BUY_ME_A_COFFEE_URL}
      target="_blank"
      rel="noopener noreferrer"
      size="small"
      variant="contained"
      startIcon={<LocalCafeRoundedIcon />}
      sx={{
        backgroundColor: "#FFDD00",
        color: "#0b1120",
        fontWeight: 700,
        "&:hover": { backgroundColor: "#f5d400" },
      }}
    >
      Buy me a coffee
    </Button>
  );
}
