/**
 * Load weather condition icon specified by condition prop.
 * https://openweathermap.org/weather-conditions
 */

import Image from "next/image";

type WeatherConditionIconProps = {
  condition: {
    icon: string;
    main: string;
  };
};

export default function WeatherConditionIcon({
  condition,
}: WeatherConditionIconProps) {
  return (
    <>
      <Image
        src={"http://openweathermap.org/img/wn/" + condition.icon + "@2x.png"}
        alt={condition.main}
        width="100"
        height="100"
      />
      <span>{condition.main}</span>
    </>
  );
}
