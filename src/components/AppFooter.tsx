import { Stack, Typography } from "@mui/material";

/** Footer carrying the copyright notice and a contribution invite. */
export default function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <Stack
      component="footer"
      direction={{ xs: "column", sm: "row" }}
      spacing={0.5}
      alignItems="center"
      justifyContent="center"
      sx={{
        px: 2,
        py: 1.5,
        borderTop: "1px solid",
        borderColor: "divider",
        color: "text.secondary",
      }}
    >
      <Typography variant="caption">
        © {year} Mina Malak. All rights reserved.
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.7 }}>
        — Open to contributions from developers everywhere.
      </Typography>
    </Stack>
  );
}
