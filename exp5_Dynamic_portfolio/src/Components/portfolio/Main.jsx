import React, { useState, useEffect } from 'react';
import { Projects } from './Projects';
import { Skills } from './Skills';
import { Contact } from './Contact';
import { Home } from './Home';
import { Certificate } from './Certificate';
import { useNavigate } from 'react-router-dom';


const Main = ({user,setUser}) => {

  const navigate =useNavigate();

  const getUsers = async () => {
    try {
      const userid =localStorage.getItem('userId');
      const res = await fetch(`http://localhost:3000/getportfolio/${userid}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setUser(data);

    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, [user]);

  const aboutText = user?.data?.about || "Loading...";
  const projects = user?.data?.projects || []  ;
  const skills = user?.data?.skills || [];
  const certificate = user?.data?.certificate || "Loading...";
  const contact= user?.data?.contact ||{} ;

    if(user?.data?.about?.name==undefined){

    navigate("/portfolio");
  }

  return (
    <div className="flex flex-col gap-16 items-center justify-center py-4">
      
      <button className='bg-red-600 ring text-white px-8 py-2 font-semibold text-lg rounded-2xl hover:bg-red-500 ml-[86%]' onClick={() => navigate("/portfolio")}>EDIT</button>
       
      <Home about={aboutText} />
      <Projects projects={projects}/>
      <Skills skills={skills}/> 
      { certificate && <Certificate cert={certificate}/>}
      <Contact contact={contact} />

    </div>
  );
};

export default Main;