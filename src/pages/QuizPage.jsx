import { useEffect, useState } from "react";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch quiz questions
  const fetchQuestions = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple");
      const data = await res.json();

      if (data.response_code === 0) {
        setQuestions(data.results);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[current].correct_answer) {
      setScore(score + 1);
    }
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      alert(`Quiz Finished! Your score: ${score + 1}/${questions.length}`);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading questions...</p>;
  if (error)
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 font-semibold">Failed to load questions. Try again.</p>
        <button
          onClick={fetchQuestions}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );

  const question = questions[current];
  const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">
          Question {current + 1}/{questions.length}
        </h2>
        <p className="mb-4">{question.question}</p>
        <div className="space-y-2">
          {answers.map((answer, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(answer)}
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
