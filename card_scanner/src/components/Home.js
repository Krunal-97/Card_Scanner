import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import cognito from "../assets/aws_cognito.png";
import dynamodb from "../assets/aws_dynamodb.svg";
import s3 from "../assets/aws_s3.jpg";
import textract from "../assets/aws_textract.png";
import medical from "../assets/aws_medicalcom.png";
import ses from "../assets/aws_ses.png";
import home from "../assets/home.webp";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="main-container">
        <div className="main-left-container">
          <div className="left-text">
            <h3>A Full Stack Serverless Intelligent enabled Application</h3>
            <h4>
              The application will help address a real-world business problem
              that happens within the back- office processes of organizations.
            </h4>
            <div className="btns">
              <button className="btn">
                <Link to="/login">Login</Link>
              </button>
              <button className="btn">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          </div>

          <div className="right-img">
            <img src={home}></img>
          </div>
        </div>

        <div className="keyFeatures">
          <div className="feature">
            <p className="title">Amazon Textract</p>
            <img src={textract}></img>
          </div>
          <div className="feature">
            <p className="title">Amazon Comprehend Medical</p>
            <img src={medical}></img>
          </div>
          <div className="feature">
            <p className="title">Amazon Cognito</p>
            <img src={cognito}></img>
          </div>
          <div className="feature">
            <p className="title">Amazon DynamoDB</p>
            <img src={dynamodb}></img>
          </div>
          <div className="feature">
            <p className="title">Amazon S3</p>
            <img src={s3}></img>
          </div>
          <div className="feature">
            <p className="title">Amazon Simple Email Service</p>
            <img src={ses}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
