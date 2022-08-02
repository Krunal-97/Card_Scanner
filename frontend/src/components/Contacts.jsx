import React, { useState, useContext } from "react";
import axios from "axios";
import "./Contacts.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "./UserContext";

const Contacts = () => {
  const [searchValue, setSearchValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [cardInfo, setCardInfo] = useState([]);
  const [val, setVal] = useContext(UserContext);

  function emailData(event) {
    event.preventDefault();

    const searchQues = {
      ques: searchValue,
    };

    console.log(searchQues);

    axios
      .post(`http://127.0.0.1:8000/fetchByNameAndEmail/${val}/${searchValue}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const searchQues = {
      ques: searchValue,
    };

    console.log(searchQues);

    axios
      .get(`http://127.0.0.1:8000/fetchByName/${val}/${searchValue}`)
      .then((res) => {
        console.log(res.data[0]);
        setAnswer(res.data);
        console.log(answer);
        answer.map((item) => {
          console.log(item.CardName);
        });
      })
      .catch((err) => console.log(err));
  }

  function verifyEmailUser() {
    axios
      .get(`http://127.0.0.1:8000/verify/${val}`)
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    async function fetchAllData() {
      try {
        console.log("fetchAllData start");
        const resp = await axios.get(
          `http://127.0.0.1:8000/fetchByUserId/${val}`
        );
        setCardInfo((prevState) => [...prevState, ...(resp.data || [])]);
        console.log("fetchAllData end");
      } catch (e) {
        console.log(e);
      }
    }
    fetchAllData();
    verifyEmailUser();
  }, []);
  console.log({ cardInfo });

  return (
    <div>
      <button className="addNewCard">
        <Link to="/addCard">Add New Card</Link>
      </button>
      <form className="search_form_container">
        <div className="head_text">
          <h4>
            Hi 🙋‍♂️ <span className="userVal">{val}</span>, which contact do you
            want to search?
          </h4>
        </div>
        <div className="searchSec">
          <div className="search_input">
            <input
              id="search"
              name="search"
              type="text"
              placeholder="🔍 Search"
              size="50"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="topBtns">
            <button onClick={handleSubmit} className="searchBtn">
              🔍 Search
            </button>
            <button onClick={emailData} className="searchBtn">
              📧 E-mail the result
            </button>
          </div>
        </div>

        {answer == "" ? (
          ""
        ) : (
          <div className="ans">
            <table id="customers">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Website</th>
                <th>Contact 1</th>
                <th>Address</th>
              </tr>
              {answer.map((item) => {
                return (
                  <>
                    <tr>
                      <td>{item.CardName}</td>
                      <td>{item.email}</td>
                      <td>{item.website}</td>
                      <td>{item.contact1}</td>
                      <td>{item.add}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        )}

        <table id="customers">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Contact 1</th>
            <th>Address</th>
          </tr>

          {cardInfo.map((item) => {
            return (
              <>
                <tr>
                  <td>{item.CardName}</td>
                  <td>{item.email}</td>
                  <td>{item.website}</td>
                  <td>{item.contact1}</td>
                  <td>{item.add}</td>
                </tr>
              </>
            );
          })}
        </table>
      </form>
    </div>
  );
};

export default Contacts;
