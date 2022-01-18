import { Alert, Stack } from "@mui/material";

const ErrorMessage = ({ error }) => {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">{error}</Alert>
      </Stack>
    );
  };

  export default ErrorMessage;