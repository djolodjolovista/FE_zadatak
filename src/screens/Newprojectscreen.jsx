import React from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import './NewProject.css';

const NewProjectScreen = () => {
  return (
    <div className="newproject_container">
    <Box
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        
      }}
    >
        <Typography sx={{ml:3}} variant="h5">NEW PROJECT</Typography>
        <TextField sx={{mt:2}} id="outlined-basic" label="Project name" variant="outlined" />
        <Button sx={{mt:2, width:'50%', ml:'25%'}} variant="contained">Save</Button>

    </Box>
    </div>
  );
};

export default NewProjectScreen;
