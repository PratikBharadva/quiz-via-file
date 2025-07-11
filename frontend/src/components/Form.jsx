import React, { useContext, useState } from "react";
import axios from "axios";
import "../assets/style.css"
import {ToastContainer, toast} from "react-toastify";
import { useNavigate } from "react-router";
import { quizContext } from "../App";

const Form = () => {
  const [inputfile, setInputfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disableStartQuiz, setDisableStartQuiz] = useState(true);

  const {setQuiz} = useContext(quizContext);
  const navigate = useNavigate();

  function handleSetFile(e) {
    setInputfile(e.target.files[0]);
    // console.log(e.target.files[0]);
  }

  async function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if(!inputfile){
      toast.error("Select file to generate quiz")
      return
    };
    setLoading(true);

    await sleep(3000);

    const formData = new FormData()
    formData.append("inputfile", inputfile)

    // formData.entries().forEach(([key, val]) => console.log(key+": "+val))

    axios.post("http://localhost:3000/api/upload", formData, {
      Headers:{
        'Content-Type': 'multipart/formdata'
      }
    }).then((res) => {
      console.log(res.data)
      setDisableStartQuiz(false)
      setLoading(false);
      setInputfile(null); 

      if(res.data.quiz){
        setQuiz(res.data.quiz)
      }
    }).catch((err) => {
      console.log(err)
      setLoading(false);
      toast.error("Failed to generate quiz")
    })
  }

  const handleStartQuiz = () => navigate("/quiz");

  return (
    <section className="text-light bg-dark form-container">
      <form className="container py-3 px-5">
        <h5 style={{color: "white"}}>Upload File to start a quiz</h5>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Upload</span>
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="inputfile"
              name="inputfile"
              onChange={handleSetFile}
            />
            <label className="custom-file-label" htmlFor="inputfile" style={{overflow: "hidden"}}>
              {inputfile ? inputfile.name :"Choose file"}
            </label>
          </div>
        </div>
        <button type="button" name="submit" className="btn btn-info p-2 px-3" onClick={handleSubmit} disabled={loading}>
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </form>

      {!disableStartQuiz && <div id="start-quiz-div" className="container">
        <h3>Your quiz is ready!!</h3>
        <button className="btn btn-success" onClick={handleStartQuiz}>Attempt now</button>
      </div>}
      <ToastContainer />
    </section>
  );
};

export default Form;
