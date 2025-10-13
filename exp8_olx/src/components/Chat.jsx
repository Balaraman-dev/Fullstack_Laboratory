import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

export default function Chat() {
  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');
    socketRef.current.emit('join', { room });
    socketRef.current.on('message', (m) => setMessages(prev => [...prev, m]));
    return () => socketRef.current.disconnect();
  }, [room]);

  const send = () => {
    if (!text) return;
    const msg = { room, text, from: localStorage.getItem('me') ? JSON.parse(localStorage.getItem('me')).uname : 'Anon', at: Date.now() };
    socketRef.current.emit('message', msg);
    setText('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
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
