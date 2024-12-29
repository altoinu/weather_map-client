import { CircularProgress, Stack, Typography } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="body1">Loading...</Typography>
      <CircularProgress />
    </Stack>
  );
}
