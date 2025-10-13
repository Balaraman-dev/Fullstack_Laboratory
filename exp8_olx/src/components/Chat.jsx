import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Chat() {
  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const socketRef = useRef();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');
    socketRef.current.emit('join', { room });
    socketRef.current.on('message', (m) => setMessages(prev => [...prev, m]));
    return () => socketRef.current.disconnect();
  }, [room]);

  useEffect(() => {
    // if room looks like product_<id> fetch product
    if (!room) return;
    const m = room.match(/^product_(.+)$/);
    if (m) {
      const pid = m[1];
      axios.get(`http://localhost:5000/api/products/${pid}`).then(r => setProduct(r.data)).catch(() => setProduct(null));
    }
  }, [room]);

  const send = () => {
    if (!text) return;
    const msg = { room, text, from: localStorage.getItem('me') ? JSON.parse(localStorage.getItem('me')).uname : 'Anon', at: Date.now() };
    socketRef.current.emit('message', msg);
    setText('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      {product && (
        <div className="mb-4 p-3 bg-white rounded shadow flex items-center justify-between">
          <div>
            <div className="font-semibold">{product.pname}</div>
            <div className="text-sm text-gray-600">By {product.author?.uname}</div>
          </div>
          <div>
            <Link to={`/payment?productId=${product._id}`} className="px-3 py-2 bg-green-600 text-white rounded">Buy</Link>
          </div>
        </div>
      )}
      <div className="h-80 overflow-auto space-y-2 mb-4 p-2 bg-white rounded shadow">
        {messages.map((m, i) => (
          <div key={i} className="p-2 bg-gray-100 rounded">{m.from}: {m.text}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 border rounded" />
        <button onClick={send} className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </div>
    </div>
  );
}
