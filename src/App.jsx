import { useState } from "react";
import Quiz from "./components/Quiz";

export default function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (!name.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("quizUsers")) || {};
    const existingPassword = storedUsers[name];

    if (existingPassword) {
      // Returning user
      if (existingPassword === password) {
        setUser(name);
        setError("");
      } else {
        setError("Incorrect password. Try again.");
      }
    } else {
      // New user -> create account
      storedUsers[name] = password;
      localStorage.setItem("quizUsers", JSON.stringify(storedUsers));
      setUser(name);
      setError("");
    }
  }

  function handleLogout() {
    setUser(null);
    setName("");
    setPassword("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 
    bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white">
      <div className="w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-xl 
      bg-black/30 backdrop-blur-md border border-white/10">
        
        {!user ? (
          // ✅ Login Form
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-center text-teal-300">Quiz App</h1>
            <p className="text-center text-gray-300 mb-2">
              Login or create a new account
            </p>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="mt-2 py-3 rounded-xl font-semibold shadow-lg 
              bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 
              hover:scale-105 transform transition"
            >
              Continue
            </button>
          </form>
        ) : (
          <Quiz user={user} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}
