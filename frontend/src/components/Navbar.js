import React, { Component, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import axios from "axios";
import "./Navbar.css";
import { UserContext } from "./UserContext";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const globalUser = sessionStorage.getItem("globalUser");

  const [val, setVal] = useContext(UserContext);

  console.log("Nav", { val });
  console.log({ globalUser });

  const clickHandler = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="navbar-items">
      <Link to="/" className="nav-links nav-logo">
        <span className="navbar-logo">
          CardScanner <i className="fa-brands fa-searchengin"></i>
        </span>
      </Link>

      <div className="menu-icon" onClick={clickHandler}>
        <i className={clicked ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to="/" className="nav-links">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/addCard" className="nav-links">
            Add a New Card
          </Link>
        </li>

        {val && val != "" ? (
          <li className="nav-item">
            <Link to="/contacts" className="nav-links">
              Contacts
            </Link>
          </li>
        ) : (
          ""
        )}

        {val && val != "" ? (
          <li className="nav-item">
            <Link to="/logout" className="nav-links">
              Log Out
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-links">
              Log In
            </Link>
          </li>
        )}

        <li className="nav-item">
          <Link to="/signup" className="nav-links">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
