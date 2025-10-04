import React from "react";
import { Link } from "react-router-dom";

export default function FollowersList({ followers }) {
  if (!followers.length) return <div className="text-lg font-semibold mb-4 ml-8">No followers yet.</div>;
  return (
    <div>
      <h5 className="text-lg font-semibold mb-4 ml-8">Followers :</h5>
      <ul className="space-y-2">
        {followers.map((follower) => (
          <li key={follower._id} className="mx-8 py-2 border-b">
            <Link
              to={`/profile/${follower._id}`}
              className="flex items-center space-x-2 hover:underline text-blue-600"
            >
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-lg font-bold text-white">
                {follower.uname?.charAt(0).toUpperCase()}
              </div>
              <span className="capitalize">{follower.uname}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}