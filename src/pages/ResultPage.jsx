import { useNavigate } from "react-router-dom";

export default function ResultPage() {
  const navigate = useNavigate();
  const name = localStorage.getItem("playerName") || "Player";
  const score = Number(localStorage.getItem("lastScore") || 0);
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Well done, {name}!</h1>
        <p className="text-gray-600 mb-6">You scored <span className="font-semibold text-indigo-600">{score}</span> points.</p>

        <button
          onClick={() => {
            // play again -> go to quiz (keeps name)
            navigate("/quiz");
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg mr-3 hover:bg-indigo-700"
        >
          Play Again
        </button>

        <button
          onClick={() => {
            // restart -> go to login and clear name & lastScore
            localStorage.removeItem("playerName");
            localStorage.removeItem("lastScore");
            navigate("/");
          }}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Logout
        </button>

        <hr className="my-6" />

        <h2 className="text-lg font-semibold mb-3">Leaderboard</h2>
        <ul className="space-y-2 max-h-48 overflow-auto">
          {leaderboard.length === 0 && <li className="text-sm text-gray-500">No scores yet.</li>}
          {leaderboard.map((p, i) => (
            <li key={i} className="flex justify-between px-4 py-2 bg-gray-50 rounded-lg">
              <span className="font-medium">{p.name}</span>
              <span className="text-indigo-600 font-semibold">{p.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
