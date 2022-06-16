import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { selectUser } from '../features/userSlice';

const Projectscreen = () => {
  
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    useEffect(() => {
      
    if(!user){
        navigate("/");
    }
     
    })
    
  return (
    <div>Projectscreen</div>
  )
}

export default Projectscreen