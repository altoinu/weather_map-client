"use client";

import GPSResultComponent, {
  GPSPostion,
} from "../_components/GPSResultComponent";
import WeatherContext, { WeatherContextData } from "../_context/WeatherContext";
import useAPIGet5DayWeather from "../_hooks/useAPIGet5DayWeather";
import useAPIGetCurrentWeather from "../_hooks/useAPIGetCurrentWeather";
import { Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

export default function WeatherForecastApplicationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const {
    fetch: fetchCurrentWeather,
    //isFetching: isFetchingCurrentWeather,
    data: currentWeatherData,
  } = useAPIGetCurrentWeather();
  const {
    fetch: fetch5DayWeather,
    //isFetching: isFetching5DayWeather,
    data: forecastData,
  } = useAPIGet5DayWeather();

  const [gpsStatus, setGPSStatus] = useState<string>();
  const [gpsPosition, setGPSPosition] = useState<GPSPostion>();
  const [gpsError, setGPSError] = useState<GeolocationPositionError>();

  useEffect(() => {
    if (fetchCurrentWeather && fetch5DayWeather) {
      if (!navigator.geolocation) {
        setGPSStatus("Geolocation is not available");
      } else {
        setGPSStatus("Trying to deteremine your location…");

        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setGPSPosition({
              latitude,
              longitude,
            });

            setGPSStatus("");

            fetchCurrentWeather({
              query: {
                lat: latitude.toString(),
                lon: longitude.toString(),
              },
            });

            fetch5DayWeather({
              query: {
                lat: latitude.toString(),
                lon: longitude.toString(),
              },
            });
          },
          (positionError: GeolocationPositionError) => {
            setGPSStatus("Unable to retrieve your location");
            setGPSError(positionError);
          },
        );
      }
    }
  }, [fetchCurrentWeather, fetch5DayWeather]);

  useEffect(() => {
    if (currentWeatherData) console.log(currentWeatherData);
  }, [currentWeatherData]);

  useEffect(() => {
    if (forecastData) console.log(forecastData);
  }, [forecastData]);

  const weatherData = useMemo<WeatherContextData>(
    () => ({
      currentWeather: currentWeatherData,
      forecast: forecastData,
    }),
    [currentWeatherData, forecastData],
  );

  return (
    <Stack direction="column">
      <GPSResultComponent {...{ gpsStatus, gpsPosition, gpsError }} />
      <WeatherContext value={weatherData}>{children}</WeatherContext>
    </Stack>
  );
}
