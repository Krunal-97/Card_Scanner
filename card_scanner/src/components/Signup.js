import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserPool from "../UserPool";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
      navigate("/login");
    });
  };

  return (
    <div className="container-signup">
      <form className="form-container" onSubmit={onSubmit}>
        <h2 className="head">Signup</h2>
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
