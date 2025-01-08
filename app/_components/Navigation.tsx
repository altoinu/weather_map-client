"use client";

import {
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
} from "@mui/material";
import Link from "next/link";

type NavigationProps = Pick<DrawerProps, "sx">;

export default function Navigation({ sx }: NavigationProps) {
  const drawerWidth = 240;
  const combinedStyles = {
    width: drawerWidth,
    [`& .MuiDrawer-paper`]: {
      width: drawerWidth,
      boxSizing: "border-box",
    },
    ...sx,
  };

  const links = [
    {
      text: "Current Temperature",
      href: "/",
    },
    {
      text: "5 Day Temperatures",
      href: "/5day",
    },
  ];

  return (
    <Drawer variant="permanent" sx={combinedStyles}>
      <Toolbar />
      <List>
        {links.map((link, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <Link
                href={link.href}
                style={{ color: "red", textDecoration: "underline" }}
              >
                {link.text}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
