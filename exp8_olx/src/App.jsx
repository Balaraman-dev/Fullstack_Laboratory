import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Navbar from "./components/Navbar";
import PostProducts from "./components/PostProduct";
import Products from "./components/Products";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import Payment from "./components/Payment";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/postproducts" element={<PostProducts />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/chat/:room" element={<Chat />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}