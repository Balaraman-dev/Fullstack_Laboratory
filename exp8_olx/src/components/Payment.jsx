import React, { useState } from 'react';
import axios from 'axios';

export default function Payment() {
  const [amount, setAmount] = useState(0);
  const [res, setRes] = useState(null);
  const pay = async () => {
    const token = localStorage.getItem('token');
    const r = await axios.post('http://localhost:5000/api/payments/create-intent', { amount, currency: 'usd' }, { headers: { Authorization: 'Bearer ' + token } });
    setRes(r.data);
  };
  return (
    <div className="max-w-md mx-auto mt-12 p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold mb-4">Mock Payment</h3>
      <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" className="w-full p-2 border rounded mb-4" />
      <button onClick={pay} className="px-4 py-2 bg-green-600 text-white rounded">Pay</button>
      {res && <pre className="mt-4 bg-gray-100 p-2 rounded">{JSON.stringify(res, null, 2)}</pre>}
    </div>
  );
}
