"use client";

import WeatherContext from "../_context/WeatherContext";
import { Typography } from "@mui/material";
import { use } from "react";

interface CurrentWeather {
  main: {
    temp: number;
  };
}

function isCurrentWeatherData(value: unknown): value is CurrentWeather {
  return (
    value !== undefined &&
    (value as CurrentWeather).main !== undefined &&
    (value as CurrentWeather).main.temp !== undefined
  );
}

export default function CurrentWeatherPage() {
  const { currentWeather } = use(WeatherContext);

  return (
    <Typography variant="body1">
      current temperature:
      {isCurrentWeatherData(currentWeather) && currentWeather.main.temp} F
    </Typography>
  );
}
