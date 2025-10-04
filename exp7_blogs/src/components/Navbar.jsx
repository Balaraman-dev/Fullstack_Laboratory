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
    <nav className="flex items-center justify-between px-24 py-4 shadow bg-gray-900">
      <Link to="/" className="font-bold text-lg px-3 py-1 text-white rounded-md">MicroBlogs</Link>
      <div className="space-x-4 flex">
        {token ? (
          <button onClick={logout} className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
        ) : (
          <>
            <Link to="/signin" className="px-3 py-2 rounded bg-blue-600 text-white">Sign in</Link>
            <Link to="/signup" className="px-3 py-2 rounded border bg-white">Sign up</Link>
          </>
        )}
         {userId && (
          <Link to={`/profile/${userId}`} className="ml-4 flex items-center text-white">
            <span className="bg-green-600 px-4 py-2 rounded">Profile</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
