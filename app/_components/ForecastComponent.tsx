"use client";

import WeatherConditionIcon from "./WeatherConditionIcon";

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
    main: string;
  }>;
}

export function isForecastItem(value: unknown): value is ForecastItem {
  return (
    value != undefined &&
    (value as ForecastItem).dt !== undefined &&
    (value as ForecastItem).dt_txt !== undefined
  );
}

type ForecastComponentProps = {
  value: ForecastItem;
};

export default function ForecastComponent({ value }: ForecastComponentProps) {
  return (
    <div>
      {value.dt_txt} {value.main.temp} F
      <WeatherConditionIcon condition={value.weather[0]} />
    </div>
  );
}
