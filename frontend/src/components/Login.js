import React, { useContext, useEffect, useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { UserContext } from "./UserContext";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [systemUser, setSystemUser] = useState("");
  const globalUser = sessionStorage.getItem("globalUser");
  const navigate = useNavigate();

  const [val, setVal] = useContext(UserContext);
  const onSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess: ", data);
        console.log(data.idToken.payload.email);
        setSystemUser(data.idToken.payload.email);
        const saveToken = () => setVal(data.idToken.payload.email);
        saveToken();

        console.log({ val });
        console.log({ systemUser });
        localStorage.setItem("globalUser", systemUser);
        console.log("Login user", globalUser);
        navigate("/contacts");
      },
      onFailure: (err) => {
        console.error("onFailure: ", err);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
      },
    });
  };

  return (
    <div className="container-login">
      <form className="form-container" onSubmit={onSubmit}>
        <h2 className="head">Login</h2>
        <input
          value={email}
          placeholder="Enter Your E-mail"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          value={password}
          placeholder="Enter Your Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <button className="btn" type="submit">
          Login
        </button>

        <p>Don't you have account?</p>
        <button className="btn new">
          <Link to="/signup">Create New Account</Link>
        </button>
      </form>
    </div>
  );
};

export default Login;
