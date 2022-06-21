import React from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const onSuccess = (res) => {
    dispatch(
      login({
        name: res.profileObj.givenName,
        lastname: res.profileObj.familyName,
        email: res.profileObj.email,
        isLogged: true,
        tokenId: res.tokenId,
      })
    );
  };

  const onFailure = (res) => {
    alert("Error Login Failed: ", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        prompt={"select_account"}
        render={(renderProps) => (
          <span
            className="loginSpan"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Google login
          </span>
        )}
      ></GoogleLogin>
    </div>
  );
};

export default Login;
