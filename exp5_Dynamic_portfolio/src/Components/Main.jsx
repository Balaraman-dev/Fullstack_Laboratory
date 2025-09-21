import React from 'react'
import Port from '../Components/Port_compo/Port_content.jsx'; 
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signin from './Auth_compo/Signin.jsx';
import Signup from './Auth_compo/Signup.jsx';
import Portfolio from './portfolio/Main.jsx';

export  const Main = () => {
  return (
    <div>         
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path='/portfolio' element={<Port/>}/>
        <Route path='/load' element={<Portfolio/>}/>
        <Route path="*" element={<h1 className="text-center text-red-600 p-4">404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}
  