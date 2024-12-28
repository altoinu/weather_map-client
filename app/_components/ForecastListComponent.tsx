"use client";

import ForecastComponent, { ForecastItem } from "./ForecastComponent";
import { Chip, Divider } from "@mui/material";

type ForecastListComponentProps = {
  date: string;
  value: ForecastItem[];
};

export default function ForecastListComponent({
  date,
  value,
}: ForecastListComponentProps) {
  return (
    <>
      <Divider>
        <Chip label={date} />
      </Divider>
      {value.map((item) => (
        <ForecastComponent key={item.dt} value={item} />
      ))}
    </>
  );
}
