import React from "react";
import { useParams } from "react-router-dom";

const ScoreSummary = () => {
  const { score, totalQuestions } = useParams();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Quiz Complete!</h1>
      <div className="border p-6 rounded-lg shadow-lg bg-white text-center">
        <p className="text-xl">
          Your Score: <span className="font-bold">{score}</span> /{" "}
          {totalQuestions}
        </p>
        <a
          href="/"
          className="block mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Take Another Quiz
        </a>
      </div>
    </div>
  );
};

export default ScoreSummary;
