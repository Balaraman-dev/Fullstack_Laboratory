import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "./PostCard";
import FollowersList from "./FollowersList";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const me = localStorage.getItem("me") ? JSON.parse(localStorage.getItem("me")) : null;

  const fetch = async () => {
    try {
      const u = await axios.get(`http://localhost:5000/api/users/${id}`);
      setUser(u.data);
      setBio(u.data.bio || "");
      const p = await axios.get(`http://localhost:5000/api/users/${id}/posts`);
      setPosts(p.data);
    } catch (err) { console.error(err); }
  };
  useEffect(() => { fetch(); }, [id]);
  const toggleFollow = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/users/${id}/follow`,
        {},
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      fetch();
    } catch (err) { console.error(err); }
  };

  const saveBio = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, { bio }, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setEditing(false);
      fetch();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      {user && (
        <div className="flex flex-col items-center mb-8 bg-gray-400 py-6 px-2 rounded-xl ">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-500 mb-4">
            {user.uname?.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-2xl font-bold text-gray-800  capitalize ">{user.uname}</h3>
          {editing ? (
            <div className="mt-2 w-full flex flex-col items-center">
              <textarea
                className="w-3/4 p-2 border rounded-xl bg-gray-100"
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl" onClick={saveBio}>Save</button>
                <button className="px-4 py-2 bg-gray-400 text-white rounded-xl" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 mt-2">{user.bio}</p>
          )}
          <div className="mt-4 flex items-center space-x-4">
            {me?.id !== user._id && (
              <button
                onClick={toggleFollow}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                Follow/Unfollow
              </button>
            )}
            {me?.id === user._id && !editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-green-600 text-white rounded transition"
              >
                Edit Profile
              </button>
            )}
            <span className="text-gray-700 font-medium">
              Followers: {user.followers?.length || 0}
            </span>
          </div>
          <div className="mt-6 w-full">
            <FollowersList followers={user.followers || []} />
          </div>
        </div>
      )}
      <div>
        <h4 className="text-xl font-semibold mb-4 text-gray-800">Posts</h4>
        <div className="space-y-4">
          {posts.map((p) => (
            <PostCard key={p._id} post={p} onAction={fetch} />
          ))}
        </div>
      </div>
    </div>
  );
}