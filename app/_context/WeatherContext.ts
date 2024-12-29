import { FetchResponseData } from "../_hooks/useFetch";
import { createContext } from "react";

export type CurrentWeatherContextData = {
  currentWeather: FetchResponseData | null | undefined;
  isFetching: boolean;
};

export const CurrentWeatherContext = createContext<CurrentWeatherContextData>({
  currentWeather: null,
  isFetching: false,
});

export type FiveDayWeatherContextData = {
  forecast: FetchResponseData | null | undefined;
  isFetching: boolean;
};

export const FiveDayWeatherContext = createContext<FiveDayWeatherContextData>({
  forecast: null,
  isFetching: false,
});
