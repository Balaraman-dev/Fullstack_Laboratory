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

    if (!product.pname || product.pname.trim().length < 2) return alert('Please enter a valid product name');
    try {
      const form = new FormData();
      form.append('pname', product.pname.trim());
      form.append('desc', product.desc);
      form.append('price', product.price || 0);
      form.append('location', product.location || '');
      if (product.image && product.image instanceof File) {
        form.append('image', product.image);
      }
  if (!token) return alert('You must be signed in to post a product');
  console.log('Submitting product (multipart), token:', token);
  // Do NOT set Content-Type manually for multipart/form-data; the browser will set the correct boundary.
  const res = await axios.post('http://localhost:5000/api/products', form, { headers: { Authorization: 'Bearer ' + token } });
      if (res.status === 200 || res.status === 201) {
        alert('Product posted');
        window.location.href = '/';
      } else {
        alert('Unexpected server response');
      }
    } catch (err) {
      console.error('Post product error:', err.response || err.message || err);
      const serverMessage = err.response?.data?.message || err.response?.data?.error || err.message;
      alert(serverMessage || 'Error creating product');
    }
  };

  return (
    <div className="w-5/8 m-auto flex items-center justify-center">
      <form onSubmit={submit} className="w-1/2 m-16 bg-gray-900 text-white flex flex-col item-center justify-center gap-4 py-8 px-16 rounded-xl" >
      <h1 className="text-2xl font-bold text-amber-400 m-auto py-4 ">New Post</h1>

      <input type="text" placeholder="Location" name="pname"  className="placeholder-blue-100 bg-gray-300 rounded-xl text-black p-2"  value={product.pname}  onChange={handleChange}/>

      <input type="text"  name="desc" className="bg-gray-300 rounded-xl text-black p-2" value={product.desc || ''} onChange={handleChange} placeholder="About"/>

      <input type="number" name="price" className="bg-gray-300 rounded-xl text-black p-2" value={product.price || ''} onChange={handleChange}  placeholder="Price"/>

      <input type="text" name="location" placeholder="Location" className="bg-gray-300 rounded-xl text-black p-2" value={product.location || ''} onChange={handleChange} />
      <input type="file" name="image" id="" className="bg-blue px-4 py-1 ring rounded-xl bg-gray-300 text-gray-500" onChange={handleFileChange}/>
  <div className="flex justify-end mt-2"><button className="px-8 py-2 bg-blue-800  text-white rounded-xl hover:bg-blue-600 ">Submit</button></div>
      </form>
    </div>
  );
}
