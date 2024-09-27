import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api"; // Import the centralized API

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For navigating between routes
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
    <div className="min-h-screen bg-indigo-50 flex justify-center items-center px-6">
      {/* Main content wrapper */}
      <div className="flex space-x-10 w-full max-w-screen-lg items-start">
        {/* Question panel */}
        <div className="flex-grow bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-blue-600 mb-6">
            {currentQuestion + 1}) {quiz.questions[currentQuestion].question}
          </h1>
          <div className="mb-6 space-y-3">
            {quiz.questions[currentQuestion].choices.map((choice, index) => (
              <label
                key={index}
                className="block border border-gray-300 p-3 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`} // Each question gets a unique name
                  value={choice}
                  checked={answers[currentQuestion] === choice} // Check if the current choice matches the stored answer
                  onChange={() => handleAnswerChange(currentQuestion, choice)}
                  className="mr-3"
                />
                {choice}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            {currentQuestion > 0 && (
              <button
                className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous Question
              </button>
            )}

            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next Question
              </button>
            ) : (
              <button
                className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                onClick={handleSubmit}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>

        {/* Sidebar for question numbers and answer status */}
        <div className="w-80 bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-700">Answered Status</h2>
            <div className="flex items-center justify-between mt-4">
              <div className="text-center">
                <div className="bg-green-400 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
                  {Object.keys(answers).length}
                </div>
                <p className="text-xs mt-1">Answered</p>
              </div>
              <div className="text-center">
                <div className="bg-red-400 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
                  {quiz.questions.length - Object.keys(answers).length}
                </div>
                <p className="text-xs mt-1">Not Answered</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-300 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
                  {quiz.questions.length}
                </div>
                <p className="text-xs mt-1">Total</p>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-600 mb-2">Questions</h2>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                className={`h-10 w-10 font-bold rounded-lg ${
                  currentQuestion === index
                    ? "bg-blue-500 text-white"
                    : answers[index]
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setCurrentQuestion(index)} // Jump to the selected question
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors w-full mt-4"
            onClick={() => navigate("/")} // Redirect to the home page
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
