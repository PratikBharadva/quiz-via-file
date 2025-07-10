import React, { useContext, useRef, useState } from "react";
import Question from "./Question";
import { quizContext } from "../App";

const Quiz = () => {
  const { quiz } = useContext(quizContext);
  const quizRef = useRef(quiz);
  // console.log(quizRef.current.questions?.length);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerList, setSelectedAnswerList] = useState(
    new Array(quizRef.current.questions?.length).fill("")
  ); //fill array with empty string

  const handleSubmitQuiz = (e) => {
    let currentAnswers = quizRef.current.answers?.filter((ans, index) => ans === selectedAnswerList[index])?.length;

    alert(`You got ${currentAnswers} out of ${selectedAnswerList.length}`);
  }

  return (
    <section>
      <div className="question-container card m-5">
        <div className="card-header">Question {currentIndex + 1}</div>
        {Object.keys(quiz).length > 0 && (
          <Question
            currentQuestion={quiz?.questions[currentIndex]}
            currentOptions={quiz?.options[currentIndex]}
            setSelectedAnswerList={setSelectedAnswerList}
            selectedAnswerList={selectedAnswerList}
            current={currentIndex}
          />
        )}
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
          <button className="mx-auto btn btn-primary m-2" onClick={handleSubmitQuiz}>Submit</button>
        )}
      </div>
    </section>
  );
};

export default Quiz;
