"use client";

import { Stack, Typography } from "@mui/material";

export type GPSPostion = { latitude: number; longitude: number };

type GPSResultComponentProps = {
  gpsStatus?: string;
  gpsPosition?: GPSPostion;
  gpsError?: GeolocationPositionError;
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
          Latitude: {gpsPosition.latitude} Longitude: {gpsPosition.longitude}
        </Typography>
      )}
      {gpsError && (
        <Typography variant="body1">GPS error: {gpsError.message}</Typography>
      )}
    </Stack>
  );
}
