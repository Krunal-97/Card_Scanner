import "./App.css";
import CardScanner from "./components/CardScanner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contacts from "./components/Contacts";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import { UserContext } from "./components/UserContext";
import { useState } from "react";
import Home from "./components/Home";
import NewCard from "./components/NewCard";

function App() {
  const [userToken, setUserToken] = useState("");
  return (
    <>
      <div className="App">
        <Router>
          <UserContext.Provider value={[userToken, setUserToken]}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addCard" element={<NewCard />} />
              <Route path="/cardScanner" element={<CardScanner />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </UserContext.Provider>
        </Router>
      </div>
    </>
  );
}

export default App;
