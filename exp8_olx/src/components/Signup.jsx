import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!user.username || !user.email || !user.password) {
      setError("Fill all fields");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/signup", {
        uname: user.username,
        email: user.email,
        password: user.password,
      });
      alert("Signup successful");
      nav("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex h-[90vh] justify-center items-center">
      <div className="w-1/3 px-4 py-16 items-center mt-8 border bg-slate-900 rounded-xl flex flex-col gap-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-400">Register</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded w-3/4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={submit} className="space-y-3 flex flex-col gap-8 w-3/4">
          <input
            className="w-full p-2 border-2 text-white border-gray-500 rounded-xl"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />
          <input
            className="w-full p-2 border-2 text-white border-gray-500 rounded-xl"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            type="email"
          />
          <input
            className="w-full p-2 border-2 text-white border-gray-500 rounded-xl"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            type="password"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}