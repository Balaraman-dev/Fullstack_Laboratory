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
    // validate product name
    if (!product.pname || product.pname.trim().length < 2) return alert('Please enter a valid product name');
    try {
      const body = { pname: product.pname.trim(), desc: product.desc, price: product.price || 0, location: product.location || '', image: '' };
      console.log('Submitting product, token:', token, 'body:', body);
      const res = await axios.post('http://localhost:5000/api/products', body, { headers: { Authorization: 'Bearer ' + token } });
      if (res.status === 200 || res.status === 201) {
        alert('Product posted');
        window.location.href = '/';
      } else {
        alert('Unexpected server response');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error creating product');
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={submit} className="w-1/2 mt-16 bg-gray-900 text-white flex flex-col item-center justify-center gap-4 py-8 px-4 rounded-xl" >
        <input type="text" placeholder="Product Name" name="pname"  className="placeholder-blue-100 bg-gray-300 rounded-xl text-black p-2"  value={product.pname}  onChange={handleChange}/>
        <input type="text" placeholder="About Product" name="desc" className="bg-gray-300 rounded-xl text-black p-2" value={product.desc} onChange={handleChange} />
  <input type="file" name="image" id="" className="bg-blue px-4 py-1" onChange={handleFileChange}/>
  <input type="number" name="price" placeholder="Price" className="bg-gray-300 rounded-xl text-black p-2" value={product.price || ''} onChange={handleChange} />
  <input type="text" name="location" placeholder="Location" className="bg-gray-300 rounded-xl text-black p-2" value={product.location || ''} onChange={handleChange} />
  <div className="flex justify-end mt-2"><button className="px-8 py-2 bg-blue-800  text-white rounded-xl hover:bg-blue-600 ">Submit</button></div>
      </form>
    </div>
  );
}
