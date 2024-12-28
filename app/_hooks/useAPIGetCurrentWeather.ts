"use client";

import useFetch from "./useFetch";

export default function useAPIGetCurrentWeather() {
  return useFetch({
    method: "GET",
    url: "http://localhost:4000/currentWeather.json",
  });
}
