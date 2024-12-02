import React from "react";
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import Stack from '@mui/material/Stack';

const CustomLinearProgress = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full height of the viewport
      }}
    >
      <Stack spacing={2} direction="row">
        <CircularProgress sx={{ color: 'green' }} />
        <CircularProgress sx={{ color: 'yellow' }} />
        <CircularProgress sx={{ color: 'red' }} />
      </Stack>
    </Box>
  )
}

export default CustomLinearProgress;
