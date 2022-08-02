import React, { useState } from "react";
import "./CardScanner.css";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CardScanner = () => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [add, setAdd] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [Img, setImg] = useState("");
  const [val, setVal] = useContext(UserContext);
  const navigate = useNavigate();

  async function onFileUpload() {
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);
    setSelectedFile(setSelectedFile);
    setImg(URL.createObjectURL(selectedFile));
    console.log({ selectedFile });

    // encode input file as base64 string for upload
    let file = selectedFile;
    let converter = new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result.toString().replace(/^data:(.*,)?/, ""));
      reader.onerror = (error) => reject(error);
    });
    let encodedString = await converter;

    // make server call to upload image and return the server upload promise
    return fetch("http://127.0.0.1:8000/images", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: file.name, filebytes: encodedString }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json();
      }
    });
  }

  function translateImage() {
    // make server call to translate image and return the server upload promise
    console.log({ selectedFile });
    return fetch(
      "http://127.0.0.1:8000" +
        "/images/" +
        selectedFile["name"] +
        "/translate-text",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromLang: "auto", toLang: "en" }),
      }
    )
      .then(function (response) {
        // The response is a Response instance.
        return response.json();
      })
      .then(function (res) {
        console.log({ res });
        setData(res);
        const result = Object.entries(data).map(([key, value]) => {
          return { [value]: key };
        });
        result.map((item) => {
          setName(item.NAME);
          setContact1(item.PHONE_OR_FAX);
          setContact2(item.PHONE_OR_FAX);
          setEmail(item.EMAIL);
          setWebsite(item.URL);
          setAdd(item.ADDRESS);
        });
        console.log({ name, contact1, email, website, add });
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userData = {
      userId: val,
      CardName: name,
      contact1: contact1,
      contact2: contact2,
      email: email,
      website: website,
      add: add,
    };
    axios
      .post("http://127.0.0.1:8000/store", userData)
      .then((res) => {
        console.log(res);
        navigate("/contacts");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <div className="main_container">
        <div className="card__info">
          <div className="card__form">
            <div className="upload_card">
              <>
                <div className="topBtns">
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />

                  <button
                    className="submitButton uploadBtn"
                    onClick={onFileUpload}
                  >
                    Upload
                  </button>

                  <button
                    className="submitButton uploadBtn"
                    onClick={translateImage}
                  >
                    Transalate
                  </button>
                </div>
              </>
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

              {/* <label>Telephone Number: </label>
              <input
                name="contact_2"
                id="contact_2"
                type="tel"
                placeholder="+1 (123)-456-7890)"
                value={contact2}
                onChange={(e) => setContact2(e.target.value)}
              ></input> */}

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

          {Img == "" ? (
            ""
          ) : (
            <div className="card__finalView">
              <img src={Img} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardScanner;
