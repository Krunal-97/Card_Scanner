import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Logout() {
  const [val, setVal] = useContext(UserContext);
  const navigate = useNavigate();

  // sessionStorage.removeItem("token");
  sessionStorage.removeItem("globalUser");

  useEffect(() => {
    setVal(sessionStorage.removeItem("globalUser"));
  }, [val, setVal]);
  return (
    <div>
      <h1>{navigate("/")}</h1>
    </div>
  );
}

export default Logout;
