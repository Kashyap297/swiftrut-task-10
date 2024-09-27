import React, { useState, useEffect } from "react";
import api from "../api/api"; // Import the centralized API

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Use centralized API to fetch quizzes
    api
      .get("/quizzes")
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="border p-4 rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-bold">{quiz.title}</h2>
            <p className="text-gray-700">{quiz.description}</p>
            <a
              href={`/quiz/${quiz._id}`}
              className="block mt-4 bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600"
            >
              Take Quiz
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
