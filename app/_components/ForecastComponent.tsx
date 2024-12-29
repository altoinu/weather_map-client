"use client";

import { ForecastItem } from "../_types/WeatherData";
import WeatherConditionIcon from "./WeatherConditionIcon";

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
