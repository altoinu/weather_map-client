"use client";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {
  CSSObject,
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Theme,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import { useMemo } from "react";

const drawerWidth = 240;
const drawerWidth_xs = 56;

const openedMixin = (theme: Theme): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

type NavigationProps = Pick<DrawerProps, "sx"> & {
  open?: boolean;
};

export default function Navigation({ open = false, sx }: NavigationProps) {
  const drawerStyles = useMemo(
    () => (theme: Theme) => ({
      ...sx,
      ...(open ? openedMixin(theme) : closedMixin(theme)),
      minWidth: 0,
      width: {
        sm: drawerWidth,
        xs: open ? drawerWidth : drawerWidth_xs,
      },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: {
          sm: drawerWidth,
          xs: open ? drawerWidth : drawerWidth_xs,
        },
        ...(open ? openedMixin(theme) : closedMixin(theme)),
      },
    }),
    [open, sx],
  );

  const links = [
    {
      href: "/",
      icon: <CalendarTodayIcon />,
      text: "Current Temperature",
    },
    {
      href: "/5day",
      icon: <DateRangeIcon />,
      text: "5 Day Temperatures",
    },
  ];

  return (
    <Drawer open={open} sx={drawerStyles} variant="permanent">
      <Toolbar />
      <List>
        {links.map((link, index) => (
          <ListItem key={index} disablePadding>
            <Link
              href={link.href}
              style={{
                color: "red",
                textDecoration: "underline",
                width: "100%",
              }}
            >
              <ListItemButton>
                <Stack direction="row" gap={1}>
                  <ListItemIcon
                    sx={{
                      mb: 0.5,
                      mt: 0.5,
                      minWidth: 0,
                      alignItems: "center",
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: { sm: "block", xs: open ? "block" : "none" },
                      minWidth: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.text}
                  </ListItemText>
                </Stack>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
