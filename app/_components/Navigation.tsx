"use client";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
} from "@mui/material";
import Link from "next/link";

type NavigationProps = Pick<DrawerProps, "sx">;

export default function Navigation({ sx }: NavigationProps) {
  const drawerWidth = 240;
  const drawerWidth_xs = 56;

  const combinedStyles = {
    minWidth: 0,
    [`& .MuiDrawer-paper`]: {
      boxSizing: "border-box",
    },
    ...sx,
  };

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
    <>
      <Drawer
        variant="permanent"
        sx={{
          ...combinedStyles,
          width: {
            sm: drawerWidth,
            xs: drawerWidth_xs,
          },
          [`& .MuiDrawer-paper`]: {
            width: {
              sm: drawerWidth,
              xs: drawerWidth_xs,
            },
          },
        }}
      >
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
                      sx={{ display: { sm: "block", xs: "none" }, minWidth: 0 }}
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
    </>
  );
}
