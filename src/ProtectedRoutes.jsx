import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { selectUser } from './features/userSlice';


const useAuth = () => {
    const user = useSelector(selectUser);
    return (user && user.isLogged);

}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
  return ( isAuth ? (<Outlet />) : (<Navigate to="/" />) 
  )
}

export default ProtectedRoutes