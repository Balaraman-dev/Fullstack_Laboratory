import React from "react";
// import dark from "../../../public/dark.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user.email || !user.password) {
    alert("Fill all fields ...");
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/login", {
      email: user.email,
      password: user.password,
    });
    
  const userId = response.data.user._id || response.data.user.id;

  console.log("User ID:", response); 

 
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  localStorage.setItem("userId", userId);

  alert("Login successful!");
  navigate("/portfolio");
      
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);  
    } else if (error.request) {
      alert("Server not responding. Try again later.");
    } else {
      alert("An error occurred while signing in.");
    }
  }
  
  }
  
  return (
    <div className="w-full h-[100vh] flex items-center justify-center relative">
      {/* <img className="w-[100vw] h-[100vh] opacity-90" src={dark} alt="Img" /> */}

      <div className="w-1/4 flex flex-col justify-center items-center border-2 border-black gap-8 py-10 px-4 absolute top-[25%] left-[40%] bg-black  rounded-2xl text-white ">

        <h3 className="text-2xl font-bold">Login Here</h3>

        <form className="w-4/5 flex flex-col gap-8" action="">
         
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
          <p>Already don't have Account  <a className="text-blue-500" href="/signup">Signup</a></p>
          <button
            className="ml-18 py-2 w-1/2 rounded-lg bg-blue-900 hover:bg-gray-600 "
            onClick={handleSubmit}
          >
            Sign in
          </button>
        </form>

      </div>
    </div>
  );
};

export default Signin;
