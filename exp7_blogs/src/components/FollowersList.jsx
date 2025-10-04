import React from "react";
import { Link } from "react-router-dom";

export default function FollowersList({ followers }) {
  if (!followers.length) return <div className="text-gray-500">No followers yet.</div>;
  return (
    <div>
      <h5 className="text-lg font-semibold mb-2 text-gray-700">Followers</h5>
      <ul className="space-y-2">
        {followers.map((follower) => (
          <li key={follower._id}>
            <Link
              to={`/profile/${follower._id}`}
              className="flex items-center space-x-2 hover:underline text-blue-600"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">
                {follower.uname?.charAt(0).toUpperCase()}
              </div>
              <span>{follower.uname}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}