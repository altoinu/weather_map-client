"use client";

import { Stack } from "@mui/material";
import Link from "next/link";

export default function Navigation() {
  return (
    <Stack direction="row" gap={1}>
      <Link href="/" style={{ color: "red", textDecoration: "underline" }}>
        Current Temperature
      </Link>
      <Link href="/5day" style={{ color: "red", textDecoration: "underline" }}>
        5 Day Temperatures
      </Link>
    </Stack>
  );
}
