import React from 'react'
import Signup from './Signup'
import Signin from './Signin'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

export const Main = () => {
  return (
    <div className=' '>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h1 className="text-center text-red-600 p-4">404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
       
    </div>


  )
}
