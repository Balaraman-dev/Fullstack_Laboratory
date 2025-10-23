import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userObj = localStorage.getItem("me") ? JSON.parse(localStorage.getItem("me")) : null;
  const userId = userObj ? userObj.id : null;
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("me");
    navigate("/signin");
  };
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow bg-gray-900 sticky top-0 z-10">
      <Link to="/" className="font-bold text-xl text-white">OLX - Buying Anywhere</Link>
      <div className="space-x-4 flex items-center">

        <Link to="/" className="text-white px-3 py-2 rounded bg-blue-800">Products</Link>
        <Link to="/postproducts" className="text-white px-3 py-2 rounded bg-green-600">Post</Link>

        {token ? (
          <button onClick={logout} className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
        ) : (
          <>
            <Link to="/signin" className="px-3 py-2 rounded bg-blue-600 text-white">Sign in</Link>
            <Link to="/signup" className="px-3 py-2 rounded border bg-white">Sign up</Link>
          </>
        )}

      </div>
    </nav>
  );
}
