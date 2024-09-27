import React, { useState, useEffect } from "react";
import { FaBook, FaArrowRight } from "react-icons/fa";
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        <FaBook className="inline-block mr-3 text-blue-600" />
        Available Quizzes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="border p-6 rounded-lg shadow-lg bg-gradient-to-r from-gray-200 to-white-200 hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold text-gray-800">{quiz.title}</h2>
            <p className="text-gray-600 mt-2 mb-4">{quiz.description}</p>
            <a
              href={`/quiz/${quiz._id}`}
              className="flex items-center justify-center mt-4 bg-blue-500 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Take Quiz <FaArrowRight className="ml-2" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
