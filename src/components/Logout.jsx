import React from 'react';
import {GoogleLogout} from 'react-google-login';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';



const Logout = () => {

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const dispatch = useDispatch();

    const onSuccess = () => {

       
       dispatch(logout());
        console.log("Log out successfully!")
    }


  return (
    <div>
        <GoogleLogout
        clientId={clientId}
        buttonText='Logout'
        onLogoutSuccess={onSuccess}
        
        /> 
        
    </div>
  )
}

export default Logout