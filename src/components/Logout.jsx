import React from 'react';
import {GoogleLogout} from 'react-google-login';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import {useNavigate} from 'react-router-dom';



const Logout = () => {

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

  const dispatch = useDispatch();

    const onSuccess = () => {

       
       dispatch(logout());
        console.log("Log out successfully!");
        navigate("/");
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