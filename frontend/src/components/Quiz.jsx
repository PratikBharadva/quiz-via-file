import React, { useContext, useRef, useState } from "react";
import Question from "./Question";
import { quizContext } from "../App";
import { useNavigate } from "react-router";
import "../assets/style.css";

const Quiz = () => {
  const navigate = useNavigate();
  const { quiz } = useContext(quizContext);
  const quizRef = useRef(quiz);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerList, setSelectedAnswerList] = useState(
    new Array(quizRef.current.questions?.length).fill("")
  ); //fill array with empty string
  const [result, setResult] = useState(0);

  const handleSubmitQuiz = (e) => {
    let correctAnswers = quizRef.current.answers?.filter(
      (ans, index) => ans === selectedAnswerList[index]
    );
    console.log(quizRef.current.answers);

    setResult(correctAnswers?.length);
  };

  const handleRestartQuiz = () => {
    setResult(0);
    setSelectedAnswerList(
      new Array(quizRef.current.questions?.length).fill("")
    );
    setCurrentIndex(0);
  };

  return (
    <section className="bg-dark question-container">
      {Object.keys(quiz).length > 0 ? (
        <div className="card">
          <div className="card-header">Question {currentIndex + 1}</div>
          <Question
            currentQuestion={quiz?.questions[currentIndex]}
            currentOptions={quiz?.options[currentIndex]}
            setSelectedAnswerList={setSelectedAnswerList}
            selectedAnswerList={selectedAnswerList}
            current={currentIndex}
          />

          <button
            className="btn btn-warning rounded-circle"
            style={{
              width: "2.5rem",
              position: "absolute",
              top: "50%",
              left: "-22px",
            }}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0}
          >
            {"<"}
          </button>
          <button
            className="btn btn-warning rounded-circle"
            style={{
              width: "2.5rem",
              position: "absolute",
              top: "50%",
              right: "-22px",
            }}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            disabled={currentIndex >= quizRef.current.questions?.length - 1}
          >
            {">"}
          </button>
          {currentIndex >= quizRef.current.questions?.length - 1 && (
            <button
              className="mx-auto btn btn-primary m-2"
              onClick={handleSubmitQuiz}
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Submit
            </button>
          )}
        </div>
      ) : (
        <div className="container card p-3" style={{ display: "flex" }}>
          <div className="image-container mx-auto my-2">
            <img src="error-image.jpg" alt="Error-Image" id="error-image" />
          </div>
          <p className="text-center text-secondary">No quiz found</p>
          <button
            className="btn btn-warning text-white mx-auto"
            onClick={() => navigate("/")}
          >
            back to home
          </button>
        </div>
      )}

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Score
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body flex">
              <div className="image-container mx-auto">
                {result >= Math.round((currentIndex + 1) / 2) ? (
                  <img src="celebrate.png" alt="celebrate" id="celebrate-image"/>
                ) : (
                  <img src="failed.jpg" alt="disappointment" id="error-image"/>
                )}
              </div>
              <div className="text-center mt-2">
                {`You got ${result} out of ${selectedAnswerList.length}`}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleRestartQuiz}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
