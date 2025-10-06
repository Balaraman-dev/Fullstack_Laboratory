import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [user, setUser] = useState({ email: "", password: "" });
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) return alert("Fill all");
    try {
      const res = await axios.post("http://localhost:5000/api/signin", {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("me", JSON.stringify(res.data.user));
      nav("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error");
    }
  };
  return (
    <div className="flex h-[90vh] justify-center items-center">
    <div className="w-1/3 px-4 py-16 items-center mt-8 border bg-slate-900 rounded-xl flex flex-col gap-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-400">Sign in</h2>
      <form onSubmit={submit} className="space-y-3 flex flex-col gap-8 w-3/4">
        <input className="w-full p-2 border-2 text-white border-gray-500 rounded-xl" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" />
        <input className="w-full p-2 border-2 rounded-xl text-white border-gray-500" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="Password" type="password" />
        <p className="text-white">Already don't have Account ? <a className="text-blue-600 underline" href="/signup">Sign up</a> </p> 
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500">Sign in</button>
      </form>
    </div>
    </div>
  );
}
