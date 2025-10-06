import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Todos from './pages/Todos';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  function saveToken(t) {
    localStorage.setItem('token', t);
    setToken(t);
  }
  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin saveToken={saveToken} />} />
        <Route
          path="/todos"
          element={token ? <Todos token={token} logout={logout}/> : <Navigate to="/signin" />}
        />
        <Route path="*" element={<Navigate to="/todos" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
