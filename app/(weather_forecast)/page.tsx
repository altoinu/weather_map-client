"use client";

import LoadingSpinner from "../_components/LoadingSpinner";
import { CurrentWeatherContext } from "../_context/WeatherContext";
import { isCurrentWeatherData } from "../_types/WeatherData";
import { Stack, Typography } from "@mui/material";
import { use } from "react";

export default function CurrentWeatherPage() {
  const { currentWeather, isFetching } = use(CurrentWeatherContext);

  return (
    <>
      {!currentWeather && isFetching && <LoadingSpinner />}
      {currentWeather && (
        <Stack direction="column">
          <Typography variant="h4">Current Weather:</Typography>
          <Stack direction="row" gap={1}>
            <Typography variant="body1">current temperature:</Typography>
            <Typography variant="body1">
              {isCurrentWeatherData(currentWeather) && currentWeather.main.temp}{" "}
              F
            </Typography>
          </Stack>
        </Stack>
      )}
    </>
  );
}
