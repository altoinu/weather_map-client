"use client";

import useFetch from "./useFetch";

export default function useAPIGet5DayWeather() {
  return useFetch({
    method: "GET",
    url: "http://localhost:4000/5DayWeather.json",
  });
}
