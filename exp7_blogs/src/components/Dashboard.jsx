import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const fetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setPosts(res.data);
    } catch (err) { console.error(err); }
  };
  useEffect(() => { fetch(); }, []);
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard - Followers' Posts</h2>
      <div className="space-y-4">
        {posts.length ? posts.map((p) => (
          <PostCard key={p._id} post={p} onAction={fetch} />
        )) : <div className="text-gray-500">No posts from followers yet.</div>}
      </div>
    </div>
  );
}