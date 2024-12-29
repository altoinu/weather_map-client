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
  const { forecast, isFetching } = use(FiveDayWeatherContext);

  const parsedForecastData = isForecastData(forecast)
    ? forecast.list.reduce<ParsedForecastData>((forecastData, item) => {
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
      {!forecast && isFetching && <LoadingSpinner />}
      {forecast && (
        <Stack direction="column">
          <Typography variant="h5">5 day forecast:</Typography>
          {forecastContents.map((item) => (
            <Fragment key={item.id}>{item.content}</Fragment>
          ))}
        </Stack>
      )}
    </>
  );
}
