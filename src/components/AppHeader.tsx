import { Box, Link, Stack, Typography } from "@mui/material";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ACCENT, ACCENT_ALT } from "../theme";
import { OWNER } from "../config";
import BuyMeCoffeeButton from "./BuyMeCoffeeButton";

/** Top app bar: brand mark, product name, tagline and a repo link. */
export default function AppHeader() {
  return (
    <Stack
      component="header"
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        px: { xs: 2, md: 4 },
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: 44,
          height: 44,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_ALT})`,
          color: "#0b1120",
          flexShrink: 0,
        }}
        aria-hidden
      >
        <DataObjectRoundedIcon />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="h6"
          component="h1"
          sx={{
            lineHeight: 1.1,
            background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_ALT})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          JSON Studio
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Parse, stringify &amp; unwrap nested JSON — entirely in your browser.
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <BuyMeCoffeeButton />

      <Link
        href={OWNER.github}
        target="_blank"
        rel="noopener noreferrer"
        color="text.secondary"
        sx={{ display: "inline-flex" }}
        aria-label="View source on GitHub"
      >
        <GitHubIcon />
      </Link>
    </Stack>
  );
}
