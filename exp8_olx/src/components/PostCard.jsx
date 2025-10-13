import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  const pid = post._id || post.id;
  const authorId = post.author?._id || post.author?.id;
  const room = `product_${pid}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow flex gap-4">
      <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
        {post.image ? (
          <img src={(post.image.startsWith && post.image.startsWith('/uploads')) ? `http://localhost:5000${post.image}` : post.image} alt={post.pname} className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{post.pname}</h3>
        <p className="text-sm text-gray-600">{post.desc}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-gray-500">By: {post.author?.uname || 'Unknown'}</div>
          <div className="text-lg font-bold">{post.price ? '$' + post.price : ''}</div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link to={`/chat/${room}`} className="px-3 py-2 bg-blue-600 text-white rounded">Chat with seller</Link>
          <Link to={`/payment?productId=${pid}`} className="px-3 py-2 bg-green-600 text-white rounded">Buy</Link>
        </div>
      </div>
    </div>
  );
}
