"use client";

import { Stack, Typography } from "@mui/material";

type GPSResultComponentProps = {
  gpsStatus?: string;
  gpsPosition?: GeolocationPosition | null;
  gpsError?: GeolocationPositionError | null;
};

export default function GPSResultComponent({
  gpsStatus,
  gpsPosition,
  gpsError,
}: GPSResultComponentProps) {
  return (
    <Stack direction="column">
      {gpsStatus && <Typography variant="body1">{gpsStatus}</Typography>}
      {gpsPosition && (
        <Typography variant="body1">
          Latitude: {gpsPosition.coords.latitude} Longitude:{" "}
          {gpsPosition.coords.longitude}
        </Typography>
      )}
      {gpsError && (
        <Typography variant="body1">GPS error: {gpsError.message}</Typography>
      )}
    </Stack>
  );
}
