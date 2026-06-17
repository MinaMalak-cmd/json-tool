import { Divider, Link, Stack, Typography } from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { OWNER } from "../config";

/** Footer carrying copyright, contact details and a contribution invite. */
export default function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <Stack
      component="footer"
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 1, md: 2 }}
      alignItems="center"
      justifyContent="center"
      sx={{
        px: 2,
        py: 1.5,
        borderTop: "1px solid",
        borderColor: "divider",
        color: "text.secondary",
        flexWrap: "wrap",
      }}
    >
      <Typography variant="caption">
        © {year} {OWNER.name}. All rights reserved.
      </Typography>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", md: "block" } }}
      />

      {/* Business / contact links */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Work with me:
        </Typography>
        <Link
          href={`mailto:${OWNER.email}`}
          color="text.secondary"
          underline="hover"
          sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
          aria-label="Email Mina Malak"
        >
          <EmailRoundedIcon fontSize="inherit" />
          <Typography variant="caption">{OWNER.email}</Typography>
        </Link>
        <Link
          href={OWNER.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          color="text.secondary"
          underline="hover"
          sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
          aria-label="Mina Malak on LinkedIn"
        >
          <LinkedInIcon fontSize="inherit" />
          <Typography variant="caption">LinkedIn</Typography>
        </Link>
      </Stack>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", md: "block" } }}
      />

      <Typography variant="caption" sx={{ opacity: 0.7 }}>
        Open to contributions from developers everywhere.
      </Typography>
    </Stack>
  );
}
