import React from 'react';

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex gap-4">
      <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
        {post.image ? <img src={post.image} alt={post.pname} className="object-cover w-full h-full rounded" /> : <span className="text-gray-500">No Image</span>}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{post.pname}</h3>
        <p className="text-sm text-gray-600">{post.desc}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-gray-500">By: {post.author?.uname || 'Unknown'}</div>
          <div className="text-lg font-bold">{post.price ? '$' + post.price : ''}</div>
        </div>
      </div>
    </div>
  );
}
