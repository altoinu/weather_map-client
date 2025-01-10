"use client";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  AppBar,
  AppBarProps,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

type HeaderBarProps = Pick<AppBarProps, "sx"> & {
  onMenuDrawerButtonClick?: (open: boolean) => void;
};

export default function HeaderBar({
  sx,
  onMenuDrawerButtonClick,
}: HeaderBarProps) {
  const [open, setOpen] = useState(false);

  const handleMenuDrawerButtonClick = () => {
    const menuOpenState = !open;

    setOpen(menuOpenState);

    if (onMenuDrawerButtonClick) onMenuDrawerButtonClick(menuOpenState);
  };

  return (
    <AppBar sx={sx}>
      <Toolbar>
        <IconButton
          aria-label="open menu drawer"
          color="inherit"
          edge="start"
          sx={{
            display: {
              sm: "none",
              xs: "",
            },
          }}
          onClick={handleMenuDrawerButtonClick}
        >
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Typography
          variant="h2"
          noWrap
          textAlign="center"
          sx={{
            width: "100%",
          }}
        >
          Weather Forecast Application
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
