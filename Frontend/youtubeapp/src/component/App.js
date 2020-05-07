import React, { useState } from "react";
import axios from "axios";
import './App.css';


const App = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    file: ""
  });

  const handleChange = event => {
    const inputValue =
      event.target.name === "file" ? event.target.files[0] : event.target.value;
    setForm({
      ...form,
      [event.target.name]: inputValue
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const videoData = new FormData();
    videoData.append("videoFile", form.file);
    videoData.append("title", form.title);
    videoData.append("description", form.description);

    axios.post("http://localhost:3000/upload", videoData).then(response => {
      console.log(response.data);
    });
  };
  return (
    <div className="body">
      <h1 className="h1">Upload Youtube Video</h1>
      <form onSubmit={handleSubmit}>
        <div className="textarea">
          <input
            onChange={handleChange}
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Title"
          />
        </div>
        <div className="textarea">
          <textarea
            onChange={handleChange}
            type="text"
            name="description"
            autoComplete="off"
            placeholder="Description"
          />
        </div>
        <div className="label">
          <input
            onChange={handleChange}
            accept="video/mp4"
            type="file"
            name="file"
            placeholder="Add Video file"
          />
        </div>
        <button className="label" type="submit">
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default App;