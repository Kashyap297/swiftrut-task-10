import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons
import { useParams } from "react-router-dom";
import api from "../api/api";

const ScoreSummary = () => {
  const { score, totalQuestions, quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    api
      .get(`/quizzes/${quizId}`)
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, [quizId]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Quiz Complete!</h1>
      <div className="border p-6 rounded-lg shadow-lg bg-white text-center">
        <p className="text-xl mb-4">
          Your Score: <span className="font-bold">{score}</span> /{" "}
          {totalQuestions}
        </p>

        <div className="text-left mt-6">
          <h2 className="text-2xl font-bold mb-4">Exam Results</h2>
          <ul className="space-y-4">
            {quiz.questions.map((question, index) => (
              <li key={index} className="p-4 border rounded-lg bg-gray-100">
                <p className="font-semibold mb-2">
                  {index + 1}. {question.question}
                </p>
                <p className="text-green-600 flex items-center">
                  <FaCheckCircle className="mr-2" /> Correct Answer:{" "}
                  {question.correctAnswer}
                </p>
              </li>
            ))}
          </ul>
        </div>

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
