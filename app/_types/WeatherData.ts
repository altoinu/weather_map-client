export interface CurrentWeather {
  main: {
    temp: number;
  };
}

export function isCurrentWeatherData(value: unknown): value is CurrentWeather {
  return (
    value !== undefined &&
    value !== null &&
    (value as CurrentWeather).main !== undefined &&
    (value as CurrentWeather).main.temp !== undefined
  );
}

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

export interface FiveDayForecast {
  list: ForecastItem[];
}

export function isForecastData(value: unknown): value is FiveDayForecast {
  return (
    value !== undefined &&
    value !== null &&
    Array.isArray((value as FiveDayForecast).list) &&
    (value as FiveDayForecast).list.every(isForecastItem)
  );
}
