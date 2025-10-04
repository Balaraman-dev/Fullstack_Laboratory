import React from "react";
import axios from "axios";

export default function PostCard({ post, onAction }) {
  const token = localStorage.getItem("token");
  const me = localStorage.getItem("me") ? JSON.parse(localStorage.getItem("me")) : null;
  const liked = post.likes?.includes(me?.id);
  const like = async () => {
    if (!token) return alert("Sign in");
    try {
      await axios.post(`http://localhost:5000/api/posts/${post._id}/like`, {}, { headers: { Authorization: "Bearer " + token } });
      onAction && onAction();
    } catch (err) { console.error(err); }
  };
  const del = async () => {
    if (!token) return alert("Sign in");
    if (!confirm("Delete post?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, { headers: { Authorization: "Bearer " + token } });
      onAction && onAction();
    } catch (err) { console.error(err); }
  };
  return (
    <div className="px-3 py-4 border rounded-xl bg-gray-900 mb-2 ">
      <div className="flex justify-between">
        <p className="mt-2 text-lg font-mono px-2 text-white ">{post.content}</p>
        <div className="space-x-2 flex items-center">
          <button onClick={like} className="px-2 text-xl">
            {liked ? "💖" : "💟"} <span className="ml-1 text-white text-sm">{post.likes?.length || 0}</span>
          </button>
          {me?.id === post.author?._id && <button onClick={del} className=" bg-red-500  text-white  px-4 py-2 rounded-xl hover:bg-red-400">Delete</button>}
        </div>
      </div>
      <div className="bg-gray-100 rounded-xl px-4 py-1 mt-3">{post.author?.uname || "Unknown"}  | <span className="text-sm text-gray-500"> {new Date(post.createdAt).toLocaleString()}</span></div>
    </div>
  );
}
