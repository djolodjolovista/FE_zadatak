import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { selectUser } from '../features/userSlice';

const ProjectScreen = () => {

    const navigate = useNavigate();
    const user = useSelector(selectUser);

    useEffect(() => {
      
    if(!user){
        navigate("/");
    }
     
    })
    
  return (
    <div>ProjectScreen</div>
  )
}

export default ProjectScreen