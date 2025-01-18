"use client";

import LoadingSpinner from "../_components/LoadingSpinner";
import { CurrentWeatherContext } from "../_context/WeatherContext";
import { isCurrentWeatherData } from "../_types/WeatherData";
import { Stack, Typography } from "@mui/material";
import { use } from "react";

export default function CurrentWeatherPage() {
  const { data, isFetching, error } = use(CurrentWeatherContext);

  return (
    <>
      {!data && isFetching && <LoadingSpinner />}
      {error != undefined && (
        <Typography variant="body1">
          Error loading current weather... Server may be down. Please try again
          later.
        </Typography>
      )}
      {data && !error && (
        <Stack direction="column">
          <Typography variant="h4">Current Weather:</Typography>
          <Stack direction="row" gap={1}>
            <Typography variant="body1">current temperature:</Typography>
            <Typography variant="body1">
              {isCurrentWeatherData(data) && data.main.temp} F
            </Typography>
          </Stack>
        </Stack>
      )}
    </>
  );
}
