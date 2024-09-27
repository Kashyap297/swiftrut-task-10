import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api"; // Import the centralized API

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({}); // Stores the answers for each question
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    // Use centralized API to fetch a specific quiz by ID
    api
      .get(`/quizzes/${id}`)
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
      });
  }, [id]);

  const handleAnswerChange = (index, answer) => {
    setAnswers({ ...answers, [index]: answer }); // Store the answer for the specific question
  };

  const handleSubmit = () => {
    const quizData = {
      quizId: id,
      answers: Object.values(answers), // Convert the object to an array for submission
    };
    // Submit the quiz answers using the centralized API
    api
      .post("/quizzes/submit", quizData)
      .then((response) => {
        // Navigate to score summary page with score
        window.location.href = `/score/${response.data.score}/${quiz.questions.length}`;
      })
      .catch((error) => {
        console.error("Error submitting quiz:", error);
      });
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
      <div className="border p-6 rounded-lg shadow-lg bg-white">
        <p className="text-lg font-bold">
          {quiz.questions[currentQuestion].question}
        </p>
        <div className="mt-4 space-y-2">
          {quiz.questions[currentQuestion].choices.map((choice, index) => (
            <label
              key={index}
              className="block bg-gray-100 p-2 rounded-lg cursor-pointer"
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`} // Each question gets a unique name
                value={choice}
                checked={answers[currentQuestion] === choice} // Check if the current choice matches the stored answer
                onChange={() => handleAnswerChange(currentQuestion, choice)}
              />
              <span className="ml-2">{choice}</span>
            </label>
          ))}
        </div>
        <div className="mt-6">
          {currentQuestion < quiz.questions.length - 1 ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Next Question
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
