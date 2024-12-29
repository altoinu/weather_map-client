"use client";

import LoadingSpinner from "../_components/LoadingSpinner";
import { CurrentWeatherContext } from "../_context/WeatherContext";
import { isCurrentWeatherData } from "../_types/WeatherData";
import { Typography } from "@mui/material";
import { use } from "react";

export default function CurrentWeatherPage() {
  const { currentWeather, isFetching } = use(CurrentWeatherContext);

  return (
    <>
      {!currentWeather && isFetching && <LoadingSpinner />}
      {currentWeather && (
        <Typography variant="body1">
          current temperature:
          {isCurrentWeatherData(currentWeather) && currentWeather.main.temp} F
        </Typography>
      )}
    </>
  );
}
