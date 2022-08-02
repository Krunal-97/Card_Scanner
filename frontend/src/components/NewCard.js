import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

function NewCard() {
  const [val, setVal] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (val && val != "") navigate("/cardScanner");
    else navigate("/login");
  }, []);
  return <div>NewCard</div>;
}

export default NewCard;
