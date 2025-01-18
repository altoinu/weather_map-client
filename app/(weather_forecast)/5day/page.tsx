"use client";

import ForecastListComponent from "@/app/_components/ForecastListComponent";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { FiveDayWeatherContext } from "@/app/_context/WeatherContext";
import { ForecastItem, isForecastData } from "@/app/_types/WeatherData";
import { getDateString } from "@/app/_utils/DateUtils";
import { Stack, Typography } from "@mui/material";
import { Fragment, use } from "react";

/**
 * Group together as {
 *  "date 1": [
 *    forecast data 1,
 *    forecast data 2,
 *    forecast data 3,
 *    ...
 *  ],
 *  "date 2": [...]
 *  ...
 * }
 */
type ParsedForecastData = {
  [key: string]: ForecastItem[];
};

export default function FiveDayForecastPage() {
  const { data, isFetching, error } = use(FiveDayWeatherContext);

  const parsedForecastData = isForecastData(data)
    ? data.list.reduce<ParsedForecastData>((forecastData, item) => {
        const date = getDateString(new Date(item.dt_txt));

        if (!forecastData[date]) forecastData[date] = [];

        forecastData[date].push(item);

        return forecastData;
      }, {})
    : {};

  const forecastContents = [];
  for (const date in parsedForecastData) {
    forecastContents.push({
      id: date,
      content: (
        <ForecastListComponent date={date} value={parsedForecastData[date]} />
      ),
    });
  }

  return (
    <>
      {!data && isFetching && <LoadingSpinner />}
      {error != undefined && (
        <Typography variant="body1">
          Error loading 5 day forecast... Server may be down. Please try again
          later.
        </Typography>
      )}
      {data && (
        <Stack direction="column">
          <Typography variant="h4">5 day forecast:</Typography>
          {forecastContents.map((item) => (
            <Fragment key={item.id}>{item.content}</Fragment>
          ))}
        </Stack>
      )}
    </>
  );
}
