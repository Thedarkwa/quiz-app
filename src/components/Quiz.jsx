import { useEffect, useState } from "react";
import { fetchQuestions } from "../services/api";
import QuestionCard from "./QuestionCard";

export default function Quiz({ user, onLogout }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  function loadQuestions() {
    setLoading(true);
    fetchQuestions(5)
      .then((data) => {
        const formatted = data.results.map((q) => {
          const answers = [...q.incorrect_answers, q.correct_answer];
          return { ...q, answers: answers.sort(() => Math.random() - 0.5) };
        });
        setQuestions(formatted);
        setCurrent(0);
        setScore(0);
        setSelectedAnswer(null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  const answered = selectedAnswer !== null;
  const atEnd = current >= questions.length;

  function handleAnswer(ans) {
    if (answered) return;
    setSelectedAnswer(ans);
    if (ans === questions[current].correct_answer) {
      setScore((s) => s + 1);
    }
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelectedAnswer(null);
    } else {
      setCurrent((c) => c + 1);
    }
  }

  if (loading) return <p className="text-center">Loading questions...</p>;

  if (atEnd) {
    return (
      <div className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Quiz Finished 🎉</h2>
        <p className="text-lg">You scored {score} / {questions.length}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={loadQuestions}
            className="w-full sm:w-auto px-5 py-3 rounded-lg font-semibold
            bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 
            hover:scale-105 transform transition"
          >
            Retry Quiz
          </button>
          <button
            onClick={onLogout}
            className="w-full sm:w-auto px-5 py-3 rounded-lg font-semibold
            bg-gradient-to-r from-red-700 via-red-600 to-red-500 
            hover:scale-105 transform transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="text-sm">Question {current + 1} / {questions.length}</span>
        <span className="text-sm font-semibold">Score: {score}</span>
        <div className="flex gap-2">
          <button
            onClick={loadQuestions}
            className="px-3 py-2 rounded-md text-sm font-semibold
            bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500"
          >
            Restart
          </button>
          <button
            onClick={onLogout}
            className="px-3 py-2 rounded-md text-sm font-semibold
            bg-gradient-to-r from-red-700 via-red-600 to-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Question */}
      <QuestionCard
        question={questions[current]}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
      />

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={nextQuestion}
          disabled={!answered}
          className="px-6 py-3 rounded-lg font-semibold
          bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500
          hover:scale-105 transform transition disabled:opacity-50"
        >
          {current + 1 === questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
