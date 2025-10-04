import React, { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const fetchFeed = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feeds", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      setPosts(res.data);
    } catch (err) { console.error(err); }
  };
  useEffect(() => { fetchFeed(); }, []);
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <PostForm onPosted={fetchFeed} /> 
      {posts.map((p) => <PostCard key={p._id} post={p} onAction={fetchFeed} />)}
    </div>
  );
}
