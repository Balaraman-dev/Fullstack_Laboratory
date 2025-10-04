import React, { useState } from "react";
import axios from "axios";

export default function PostForm({ onPosted }) {
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");
  const submit = async (e) => {
    e.preventDefault();
    if (!content) return;
    try {
      await axios.post("http://localhost:5000/api/posts", { content }, { headers: { Authorization: "Bearer " + token } });
      setContent("");
      onPosted && onPosted();
    } catch (err) {
      console.error(err);
      alert("Error creating post");
    }
  };
  return (
    <form onSubmit={submit} className="mb-4">
      <textarea className="w-full border rounded-xl bg-gray-900 text-white p-5" value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's happening?" maxLength={280} />
      <div className="flex justify-end mt-2"><button className="px-8 py-2 bg-blue-800  text-white rounded-xl hover:bg-blue-600 ">Post</button></div>
    </form>
  );
}
