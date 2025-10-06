import React, { useEffect, useState } from 'react';

export default function Todos({ token, logout }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  async function load() {
    const res = await fetch('http://localhost:5000/todos', {
      headers: { Authorization: 'Bearer ' + token }
    });
    setTodos(await res.json());
  }

  async function add(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ text })
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]);
    setText('');
  }

  async function toggle(id, completed) {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type':'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ completed: !completed })
    });
    const updated = await res.json();
    setTodos(todos.map(t => t._id === id ? updated : t));
  }

  async function remove(id) {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token }
    });
    setTodos(todos.filter(t => t._id !== id));
  }

  useEffect(() => { load(); }, []);

  return (
    <div className='w-full flex items-center justify-center'>
        <div className='w-1/4  bg-black rounded-xl mt-32 py-8 px-16 text-white flex flex-col justify-center items-center gap-8'>
        <h2 className='text-2xl font-semibold text-center'>My Todos</h2>
        <form onSubmit={add} className='flex  gap-4'>
          <input value={text} onChange={e=>setText(e.target.value)} className='bg-white rounded-xl text-black px-2' placeholder="New todo" />
          <button className='bg-green-800  py-2 px-4 rounded-xl'>Add</button>
        </form>
        <ul className='flex flex-col gap-2'>
          {todos.map(t => (
            <li className='w-full px-4 justify-around flex bg-white items-center rounded-xl py-2' key={t._id}>
              <input type="checkbox"  className='text-4xl text-white' checked={t.completed} onChange={() => toggle(t._id, t.completed)} />
              <p  className='text-xl text-black ml-2'>{t.text}</p>
              <button className='bg-red-600 px-4 py-2 rounded-xl ml-12' onClick={() => remove(t._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
          <button onClick={logout} className='bg-red-600 text-white rounded-xl  py-2 px-4 ml-8'>Logout</button>  
    </div>
    
  );
}
