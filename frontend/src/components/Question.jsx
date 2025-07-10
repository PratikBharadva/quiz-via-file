import React from "react";

const Question = ({ currentQuestion, currentOptions, setSelectedAnswerList, selectedAnswerList, current }) => {

  function handleChangeOption(opt){
    if(selectedAnswerList[current] === opt) opt = "";
    const updatedOptions = [...selectedAnswerList];
    updatedOptions[current] = opt;
    setSelectedAnswerList(updatedOptions);
  }

  return (
    <div className="card-body">
      <div className="card-title">{currentQuestion}</div>
      <ul className="list-group">
        {currentOptions.map((opt) => (
          <button
            className={`list-group-item list-group-item-action ${
              selectedAnswerList[current] === opt ? "active" : ""
            }`}
            onClick={() => handleChangeOption(opt)}
            key={opt}
          >
            {opt}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Question;
