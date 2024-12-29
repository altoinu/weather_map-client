"use client";

import WeatherContext from "../_context/WeatherContext";
import { isCurrentWeatherData } from "../_types/WeatherData";
import { Typography } from "@mui/material";
import { use } from "react";

export default function CurrentWeatherPage() {
  const { currentWeather } = use(WeatherContext);

  return (
    currentWeather && (
      <Typography variant="body1">
        current temperature:
        {isCurrentWeatherData(currentWeather) && currentWeather.main.temp} F
      </Typography>
    )
  );
}
