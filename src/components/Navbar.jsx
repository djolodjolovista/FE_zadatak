import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logout from './Logout';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';





const Navbar = () => {

  

  
  
  const user = useSelector(selectUser);

 

  
  
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        
          {user ? (<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Companies</ Typography>) : 
            (<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Home</Typography>)}
            
          
          {user && (<Logout />)}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;