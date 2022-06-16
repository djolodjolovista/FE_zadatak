import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";

const Loader = () => {
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    
  >
    <Box sx={{ display: 'flex' }}>
      <CircularProgress sx={{mt:2, mb:2, width:"100%"}}/>
    </Box>
    </Grid>
  )
}

export default Loader