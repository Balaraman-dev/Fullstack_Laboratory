import React from "react";
import dark from "../../../public/dark.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!user.username || !user.email || !user.password){
        alert("Fill all fields ...");
        return;
    }
    
    try{
       const res = await axios.post("http://localhost:5000/signup", {
        uname: user.username,
        email: user.email,
        password: user.password,
});
    }catch(e){
        console.log("Error occuring in post",e);
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center relative">
      <img className="w-[100vw] h-[100vh] opacity-90" src={dark} alt="Img" />

      <div className="w-1/4 flex flex-col justify-center items-center border-2 border-black gap-8 py-10 px-4 absolute top-[25%] left-[40%] bg-black opacity-60 rounded-2xl text-white ">

        <h3 className="text-2xl font-bold">Register Here</h3>

        <form className="w-4/5 flex flex-col gap-8" action="">
          <input
            className="p-2 border rounded-lg"
            value={user.username}
            onChange={(e) => {
              setUser((x) => ({ ...x, username: e.target.value }));
            }}
            placeholder="Enter Username"
            type="text"
          />
          <input
            className="p-2 border rounded-lg"
            value={user.email}
            onChange={(e) => {
              setUser((x) => ({ ...x, email: e.target.value }));
            }}
            type="email"
            placeholder="Enter Email"
          />
          <input
            className="p-2 border rounded-lg"
            value={user.password}
            onChange={(e) => {
              setUser((x) => ({ ...x, password: e.target.value }));
            }}
            type="password"
            placeholder="Enter Password"
          />
          <button
            className="ml-18 py-2 w-1/2 rounded-lg bg-blue-900 hover:bg-gray-600 "
            onClick={handleSubmit}
          ><a href="/signin">
            Sign Up </a>
          </button>
        </form>

      </div>
    </div>
  );
};

export default Signup;
