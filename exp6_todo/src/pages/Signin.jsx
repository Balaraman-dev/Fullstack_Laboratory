import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin({ saveToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const navigate=useNavigate();
  async function submit(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/signin', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      saveToken(data.token);
      navigate('/todos');

    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <div className='w-full flex rounded-2xl  flex-col justify-center items-center'>
        <form onSubmit={submit} className='w-1/4 bg-black py-16 px-8 flex flex-col rounded-xl mt-32'>
        <h2 className='text-white text-2xl text-center mb-4 font-semibold'>Signin</h2>
        <input className='bg-gray-400 py-2  px-2 rounded-xl text-md  hover:bg-white ' placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <input className='bg-gray-400 py-2  px-2 rounded-xl text-md  hover:bg-white ' placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
        <button className='bg-blue-900 text-white py-2 rounded-2xl hover:bg-white hover:text-black  duration-300 text-xl'>Signin</button>
        </form>
    </div>
  );
}
