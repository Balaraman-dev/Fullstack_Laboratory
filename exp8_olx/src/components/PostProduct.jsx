import React, { useState } from "react";
import axios from "axios";

export default function PostProducts({ onPosted }) {
  const me = JSON.parse(localStorage.getItem("me"));
  console.log(me?.id);
  const[product,setProduct]=useState({
    pname: " ",
    desc: " ",
    image: " ",
    date :Date.now(),
    author: me.id || "" ,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };
  

  const token = localStorage.getItem("token");

  
  const submit = async (e) => {
    e.preventDefault();
    console.log(JSON.parse(product));
    // if (!content) return;
    // try {
    //   await axios.post("http://localhost:5000/api/posts", { content }, { headers: { Authorization: "Bearer " + token } });
    //   setContent("");
    //   onPosted && onPosted();
    // } catch (err) {
    //   console.error(err);
    //   alert("Error creating Product posting");
    // }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={submit} className="w-1/2 mt-16 bg-gray-900 text-white flex flex-col item-center justify-center gap-4 py-8 px-4 rounded-xl" >
        <input type="text" placeholder="Product Name" name="pname"  className="placeholder-blue-100 bg-gray-300 rounded-xl text-black p-2"  value={product.pname}  onChange={handleChange}/>
        <input type="text" placeholder="About Product" name="desc" className="bg-gray-300 rounded-xl text-black p-2" value={product.desc} onChange={handleChange} />
        <input type="file" name="image" id="" className="bg-blue px-4 py-1" onChange={handleFileChange}/>
        <div className="flex justify-end mt-2"><button className="px-8 py-2 bg-blue-800  text-white rounded-xl hover:bg-blue-600 ">Submit</button></div>
      </form>
    </div>
  );
}
