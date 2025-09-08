import { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !password) {
      alert("Please enter both name and password");
      return;
    }

    
    if (password === "1234") {
      onLogin(name);
    } else {
      alert("Invalid password! Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold text-purple-500 mb-4 text-center">
          Login to Quiz
        </h2>

        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
          placeholder="Enter your name"
        />

        <label className="block mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
          placeholder="Enter password"
        />

        <button className="px-4 py-2 rounded-lg font-semibold shadow-md 
  bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 
  hover:opacity-90 transition">
  Start Quiz
</button>

      </form>
    </div>
  );
}
