"use client";

import { ForecastItem } from "../_types/WeatherData";
import WeatherConditionIcon from "./WeatherConditionIcon";
import { Stack, StackProps, Typography } from "@mui/material";

type ForecastComponentProps = Pick<StackProps, "sx"> & {
  value: ForecastItem;
};

export default function ForecastComponent({
  sx,
  value,
}: ForecastComponentProps) {
  return (
    <Stack
      direction="row"
      gap={1}
      sx={{ ...sx, alignItems: "center", justifyContent: "space-between" }}
    >
      <Typography variant="h5">{value.dt_txt}</Typography>
      <Typography variant="body1">{value.main.temp} F</Typography>
      <WeatherConditionIcon condition={value.weather[0]} />
    </Stack>
  );
}
