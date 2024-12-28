"use client";

import {
  ForecastItem,
  isForecastItem,
} from "@/app/_components/ForecastComponent";
import ForecastListComponent from "@/app/_components/ForecastListComponent";
import WeatherContext from "@/app/_context/WeatherContext";
import { Stack, Typography } from "@mui/material";
import { Fragment, use } from "react";

interface FiveDayForecast {
  list: ForecastItem[];
}

function isForecastData(value: unknown): value is FiveDayForecast {
  return (
    value !== undefined &&
    Array.isArray((value as FiveDayForecast).list) &&
    (value as FiveDayForecast).list.every(isForecastItem)
  );
}

function getCurrentMonthInString(date: Date) {
  const currentMonth = date.getMonth() + 1;
  return (currentMonth < 10 ? 0 : "") + currentMonth.toString();
}

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
  const { forecast } = use(WeatherContext);

  const parsedForecastData = isForecastData(forecast)
    ? forecast.list.reduce<ParsedForecastData>((forecastData, item) => {
        const forecastDate = new Date(item.dt_txt);
        const forecastDateString =
          forecastDate.getFullYear().toString() +
          "-" +
          getCurrentMonthInString(forecastDate) +
          "-" +
          (forecastDate.getDate() < 10 ? 0 : "") +
          forecastDate.getDate().toString();

        if (!forecastData[forecastDateString])
          forecastData[forecastDateString] = [];

        forecastData[forecastDateString].push(item);

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
    <Stack direction="column">
      <Typography variant="h5">5 day forecast:</Typography>
      {forecastContents.map((item) => (
        <Fragment key={item.id}>{item.content}</Fragment>
      ))}
    </Stack>
  );
}
