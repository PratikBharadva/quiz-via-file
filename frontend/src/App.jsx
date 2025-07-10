import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Quiz from "./components/Quiz";
import { createBrowserRouter, RouterProvider } from "react-router";

export const quizContext = createContext();

function App() {
  const [quiz, setQuiz] = useState({
    questions: ["what is closure property 1", "what is high order function 2", "what is monkey patching 3"],
    options: [["one", "two", "three", "four"], [1, 2, 3, 4], ["I", "II", "III", "IV"]],
    answers: ["one", 2, "III"]
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Form />
        </>
      ),
    },
    {
      path: "/quiz",
      element: (
        <>
          <Navbar />
          <Quiz />
        </>
      ),
    },
  ]);

  return (
    <quizContext.Provider value={{ quiz, setQuiz }}>
      <RouterProvider router={router} />
    </quizContext.Provider>
  );
}

export default App;
