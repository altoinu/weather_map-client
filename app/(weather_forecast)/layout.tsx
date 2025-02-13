"use client";

import GPSResultComponent from "../_components/GPSResultComponent";
import HeaderBar from "../_components/HeaderBar";
import Navigation from "../_components/Navigation";
import {
  CurrentWeatherContext,
  CurrentWeatherContextData,
  FiveDayWeatherContext,
  FiveDayWeatherContextData,
} from "../_context/WeatherContext";
import useAPIGet5DayWeather from "../_hooks/useAPIGet5DayWeather";
import useAPIGetCurrentWeather from "../_hooks/useAPIGetCurrentWeather";
import { Stack, Theme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

export default function WeatherForecastApplicationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const {
    fetch: fetchCurrentWeather,
    data: currentWeatherData,
    isFetching: isFetchingCurrentWeather,
    error: currentWeatherFetchError,
  } = useAPIGetCurrentWeather();
  const {
    fetch: fetch5DayWeather,
    data: fiveDayWeatherData,
    isFetching: isFetching5DayWeather,
    error: fiveDayWeatherFetchError,
  } = useAPIGet5DayWeather();

  const [gpsStatus, setGPSStatus] = useState<string>();
  const [gpsPosition, setGPSPosition] = useState<GeolocationPosition | null>();
  const [gpsError, setGPSError] = useState<GeolocationPositionError | null>();

  const [menuOpen, setMenuOpen] = useState(false);

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
    if (fiveDayWeatherData) console.log(fiveDayWeatherData);
  }, [fiveDayWeatherData]);

  const currentWeatherContextValue = useMemo<CurrentWeatherContextData>(
    () => ({
      data: currentWeatherData,
      isFetching: isFetchingCurrentWeather,
      error: currentWeatherFetchError,
    }),
    [currentWeatherData, isFetchingCurrentWeather, currentWeatherFetchError],
  );

  const fiveDayWeatherContextValue = useMemo<FiveDayWeatherContextData>(
    () => ({
      data: fiveDayWeatherData,
      isFetching: isFetching5DayWeather,
      error: fiveDayWeatherFetchError,
    }),
    [fiveDayWeatherData, isFetching5DayWeather, fiveDayWeatherFetchError],
  );

  const handleMenuDrawerButtonClick = (open: boolean) => {
    setMenuOpen(open);
  };

  return (
    <Stack direction="column">
      <HeaderBar
        sx={{
          position: "sticky",
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        }}
        onMenuDrawerButtonClick={handleMenuDrawerButtonClick}
      />
      <Stack direction="row">
        <Navigation open={menuOpen} sx={{ flexShrink: 0 }} />
        <Stack
          component="main"
          direction="column"
          sx={{ flexGrow: 1, ml: 3, mr: 3, mt: 3, overflowX: "auto" }}
        >
          <GPSResultComponent {...{ gpsStatus, gpsPosition, gpsError }} />
          <CurrentWeatherContext value={currentWeatherContextValue}>
            <FiveDayWeatherContext value={fiveDayWeatherContextValue}>
              {children}
            </FiveDayWeatherContext>
          </CurrentWeatherContext>
        </Stack>
      </Stack>
    </Stack>
  );
}
