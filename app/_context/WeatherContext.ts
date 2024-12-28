import { FetchResponseData } from "../_hooks/useFetch";
import { createContext } from "react";

export type WeatherContextData = {
  currentWeather: FetchResponseData | null | undefined;
  forecast: FetchResponseData | null | undefined;
};

const WeatherContext = createContext<WeatherContextData>({
  currentWeather: null,
  forecast: null,
});

export default WeatherContext;
