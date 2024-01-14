import React from "react";
import { Box, Typography, Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
        404: Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        The page you're looking for doesn't seem to exist.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
