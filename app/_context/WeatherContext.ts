import { FetchResponseData } from "../_hooks/useFetch";
import { createContext } from "react";

export type CurrentWeatherContextData = {
  data?: FetchResponseData | null;
  isFetching: boolean;
  error?: Error | unknown;
};

export const CurrentWeatherContext = createContext<CurrentWeatherContextData>({
  isFetching: false,
});

export type FiveDayWeatherContextData = {
  data?: FetchResponseData | null;
  isFetching: boolean;
  error?: Error | unknown;
};

export const FiveDayWeatherContext = createContext<FiveDayWeatherContextData>({
  isFetching: false,
});
