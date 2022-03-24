import React, { useState } from "react";
import "./CardScanner.css";
import Test2 from "./Test2";
import axios from "axios";

const CardScanner = () => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [add, setAdd] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get("http://127.0.0.1:8000/transalate")
      .then((res) => {
        setData(res.data[1]);
        // console.log(Object.keys(data));

        // const result = Object.keys(data).map((key) => {
        //   console.log(key);
        //   // console.log(data[key]);

        //   return { [key]: data[key] };
        // });

        const result = Object.entries(data).map(([key, value]) => {
          // console.log(value);
          // console.log(key);

          return { [value]: key };
        });

        result.map((item) => {
          setName(item.NAME);

          setAdd(item.ADDRESS);

          setWebsite(item.URL);

          setContact1(item.PHONE_OR_FAX);

          console.log(item.ADDRESS);
          console.log(item.PHONE_OR_FAX);
          console.log(item.NAME);
          console.log(item.URL);
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Card Scanner</h1>
        <a className="header_btn" href="#">
          View Contacts
        </a>
      </div>

      <div className="main_container">
        <div className="card__info">
          <div className="card__form">
            <div className="upload_card">
              <Test2 />
            </div>
            <form className="card__formDetails">
              <label>Name: </label>
              <input
                name="name"
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>

              <label>Telephone Number: </label>
              <input
                name="contact_1"
                id="contact_1"
                type="tel"
                placeholder="+1 (123)-456-7890)"
                value={contact1}
                onChange={(e) => setContact1(e.target.value)}
              ></input>

              <label>Telephone Number: </label>
              <input
                name="contact_2"
                id="contact_2"
                type="tel"
                placeholder="+1 (123)-456-7890)"
                value={contact2}
                onChange={(e) => setContact2(e.target.value)}
              ></input>

              <label>E-mail Address: </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="john@gmail.comm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>

              <label>Company Website: </label>
              <input
                name="website"
                id="website"
                type="url"
                placeholder="www.john.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              ></input>

              <label>Company Address: </label>
              <textarea
                name="address"
                address="address"
                rows="4"
                cols="30"
                placeholder="123 Scarborough Street, Toronto, ON, M1D 2A1"
                value={add}
                onChange={(e) => setAdd(e.target.value)}
              ></textarea>

              <button
                onClick={handleSubmit}
                className="submitButton"
                type="submit"
              >
                Submit Details
              </button>
            </form>
          </div>
          <div className="card__finalView">
            <h1>Final Card</h1>
            <h3>Name: {name}</h3>
            <h3>Telephone Number: {contact1}</h3>
            <h3>Telephone Number: {contact2}</h3>
            <h3>Email Address: {email}</h3>
            <h3>Website: {website}</h3>
            <h3>Address: {add}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardScanner;
