const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateQuiz(text) {
  console.log("Text received by gemini: ", text);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Suppose you are a teacher/mentor who is good in making question paper from given any content or subject.
    Make sure that given text is relevant/worth to make quiz questions for.
    Question must be type of multiple choice questions.
    Now generate good and tricky quiz question with it's options and answer key to prepare a user 
    for examination from this text content:
    ---start of text---
    ${text}
    ---end of text---
    Give me the response with json format like given below:
    {
        questions: [question1, question2, ...],
        options: [
            [option for question1],
            [option for question2],
            ...
        ],
        answers: [answer1, answer2, ...]
    }
    Example:
    input text: Long long ago a zulu hunter was sitting under a tree.
    expected response:
    {
        question: ["who was sitting under a tree?"]
        options: [
            ["me","you","zulu hunter","nobody"]
        ],
        answers: ["zulu hunter"]
    }
    `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  // console.log(response.text())
  let responseText = response.text();

  const start = responseText.indexOf("```json") + 7;
  const end = responseText.indexOf("```", start);

  const jsonString = responseText.substring(start, end).trim();

  // Convert to object
  let parsedObject;
  try {
    parsedObject = JSON.parse(jsonString);
    // console.log("Parsed Object:", parsedObject);
    return parsedObject;
  } catch (err) {
    console.error("Invalid JSON:", err.message);
  }
}

module.exports = { generateQuiz };
