import { Box, CircularProgress } from "@mui/material";
import React from "react";

type Props = {};

const ProgressSpinner = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <ProgressSpinner />
    </Box>
  );
};

export default ProgressSpinner;
