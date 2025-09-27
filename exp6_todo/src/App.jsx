import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/api/todos');
    setTodos(res.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTodo = { text };
    const res = await axios.post('http://localhost:5000/api/todos', newTodo);
    setTodos([...todos, res.data]);
    setText('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className='w-full h-[100vh] flex items-center justify-center '>
    <div className='flex flex-items justify-center p-12 border-2 flex-col  rounded-xl '>
      <h1 className='text-3xl font-bold text-center mb-4'> Todo </h1>

      <form onSubmit={addTodo} className=' flex gap-4 '>
        <input type="text" className='border-2 rounded-xl px-2 py-2 bg-white' value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a new todo"/>
        <button className='bg-green-600  text-white font-semibold px-4 py-2 rounded-xl hover:bg-green-500' type="submit">Add</button>
      </form>

      <ul className='flex flex-col gap-2 w-full justify-around pt-4' >
        {todos.map((todo) => (
          <li key={todo._id} className='w-full flex justify-between px-4 border-2 py-2 rounded-xl items-center'>
            <span className='text-xl'>{todo.text}</span>
            <button className='bg-red-600 px-3 py-2 rounded-xl text-white hover:bg-red-500' onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;