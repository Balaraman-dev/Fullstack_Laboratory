import React, { useState, useEffect } from 'react';
import { Projects } from './Projects';
import { Skills } from './Skills';
import { Contact } from './Contact';
import { Home } from './Home';

const Main = () => {
  const [user, setUser] = useState({});

  const getUsers = async () => {
    try {
      const userid =localStorage.getItem('userId');
      const res = await fetch(`http://localhost:3000/getportfolio/${userid}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setUser(data);

      console.log("Fetched User Data:", data);
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(user);
  const aboutText = user?.data?.about || "Loading...";
  const projects = user?.data?.projects || []  ;
  const skills = user?.data?.skills || [];
  const certificate = user?.data?.certificate || "Loading...";

  console.log(projects);


  return (
    <div className="flex flex-col gap-16 items-center justify-center py-4">
      <Home about={aboutText} />
      <Projects projects={projects}/>
      <Skills skills={skills}/> 
      <Contact />
    </div>
  );
};

export default Main;