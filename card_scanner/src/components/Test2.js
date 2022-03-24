import React, { useState } from "react";
import axios from "axios";

const Test2 = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("file", selectedFile, selectedFile.name);

    // Details of the uploaded file
    console.log(selectedFile);

    // Request made to the backend api
    // Send formData object
    axios
      .post("http://127.0.0.1:5000/predict_image", formData)
      .then((res) => console.log(res.data));
  };
  return (
    <>
      <div>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button className="submitButton uploadBtn" onClick={onFileUpload}>
          Upload
        </button>
      </div>
    </>
  );
};

export default Test2;
