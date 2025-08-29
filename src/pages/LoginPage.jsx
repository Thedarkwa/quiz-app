import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem("playerName", trimmed);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Quiz App</h1>
        <p className="text-sm text-gray-500 mb-6">Test your knowledge — quick, fun, and free.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={!name.trim()}
            className={`w-full py-2 rounded-lg font-semibold transition 
              ${name.trim() ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            Start Quiz
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-400">
          Questions are fetched live from the Open Trivia Database.
        </p>
      </div>
    </div>
  );
}
