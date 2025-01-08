"use client";

import { AppBar, Theme, Typography } from "@mui/material";

export default function HeaderBar() {
  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Typography variant="h2" noWrap textAlign="center">
        Weather Forecast Application
      </Typography>
    </AppBar>
  );
}
