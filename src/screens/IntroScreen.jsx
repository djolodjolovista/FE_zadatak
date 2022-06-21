import React, { useEffect } from "react";
import Login from "../components/Login";
import Logout from "../components/Logout";
import "./IntroScreen.css";
import { gapi } from "gapi-script";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const IntroScreen = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      
      navigate("/companies");
      
    }
    gapi.load("client:auth2", start);
    // eslint-disable-next-line
  }, [user, navigate]);

  const start = () => {
    gapi.client.init({
      clientId: clientId,
      scope: "",
    });
  };

  return (
    <div className="intro_container">
      <Typography variant="h5">
        Ovo je aplikacija za menadzment projekta, molimo vas ulogujte se preko
        googla:
      </Typography>
      <div className="intro_text_container">
        {user ? <Logout /> : <Login />}
      </div>
    </div>
  );
};

export default IntroScreen;
