"use client";

import GPSResultComponent from "../_components/GPSResultComponent";
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
  const [gpsPosition, setGPSPosition] = useState<GeolocationPosition | null>();
  const [gpsError, setGPSError] = useState<GeolocationPositionError | null>();

  // Get current location at start
  useEffect(() => {
    if (!navigator.geolocation) {
      setGPSStatus("Geolocation is not available");
    } else {
      setGPSStatus("Trying to deteremine your location…");

      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setGPSPosition(position);
          setGPSStatus("");
          setGPSError(null);
        },
        (positionError: GeolocationPositionError) => {
          setGPSPosition(null);
          setGPSStatus("Unable to retrieve your location");
          setGPSError(positionError);
        },
      );
    }
  }, []);

  // Once location determined, load weather data
  useEffect(() => {
    if (gpsPosition && fetchCurrentWeather && fetch5DayWeather) {
      const latitude = gpsPosition.coords.latitude;
      const longitude = gpsPosition.coords.longitude;

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
    }
  }, [gpsPosition, fetchCurrentWeather, fetch5DayWeather]);

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
