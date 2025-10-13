import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetch = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:5000/api/products' + (q ? '?q=' + encodeURIComponent(q) : ''));
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetch(); }, [q]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products" className="flex-1 p-2 border rounded" />
        <Link to="/postproducts" className="px-4 py-2 bg-blue-600 text-white rounded">Post</Link>
      </div>
      <div className="space-y-4">
        {loading && <div className="text-center text-gray-600">Loading...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}
        {!loading && !error && products.length === 0 && <div className="text-center text-gray-600">No products found.</div>}
        {products.map(p => <PostCard key={p._id} post={p} />)}
      </div>
    </div>
  );
}
