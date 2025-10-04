import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";

export default function Peoples() {
  const [users, setUsers] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState([]);
  const token = localStorage.getItem("token");
  const me = localStorage.getItem("me") ? JSON.parse(localStorage.getItem("me")) : null;

  const fetch = async () => {
    try {
      setLoading(true);
      let res;
      if (search) {
        res = await axios.get(`http://localhost:5000/api/users/search?q=${search}`);
      } else {
        res = await axios.get("http://localhost:5000/api/users");
      }
      setUsers(res.data);
      if (token) {
        const feedRes = await axios.get("http://localhost:5000/api/feeds", {
          headers: { Authorization: "Bearer " + token }
        });
        setFeeds(feedRes.data);
        // Get my following list
        if (me?.id) {
          const myProfile = await axios.get(`http://localhost:5000/api/users/${me.id}`);
          setFollowed(myProfile.data.following || []);
        }
      }
      setLoading(false);
    } catch (err) { console.error(err); setLoading(false); }
  };

  useEffect(() => { fetch(); }, [search]);

  const handleFollow = async (userId) => {
    if (!token) return alert("Sign in to follow");
    try {
      await axios.post(`http://localhost:5000/api/users/${userId}/follow`, {}, {
        headers: { Authorization: "Bearer " + token }
      });
      fetch();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All People</h2>
      <input
        className="w-full mb-4 p-2 border rounded-xl bg-gray-100"
        placeholder="Search users by username..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? <div className="text-gray-500">Loading...</div> : (
        <ul className="space-y-4 mb-8">
          {users.map((user) => (
            <li key={user._id} className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">
                {user.uname?.charAt(0).toUpperCase()}
              </div>
              <Link to={`/profile/${user._id}`} className="text-blue-600 hover:underline">
                {user.uname}
              </Link>
              {me && me.id !== user._id && (
                <button
                  className={`ml-2 px-3 py-1 rounded ${followed.includes(user._id) ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
                  onClick={() => handleFollow(user._id)}
                >
                  {followed.includes(user._id) ? "Unfollow" : "Follow"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Feeds (Followed Users' Posts)</h3>
      <div className="space-y-4">
        {feeds.length ? feeds.map((p) => (
          <PostCard key={p._id} post={p} onAction={fetch} />
        )) : <div className="text-gray-500">No feeds yet.</div>}
      </div>
    </div>
  );
}