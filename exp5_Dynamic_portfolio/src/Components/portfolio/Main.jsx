import React, { useState, useEffect } from 'react';
import { Projects } from './Projects';
import { Skills } from './Skills';
import { Contact } from './Contact';
import { Home } from './Home';

const Main = () => {
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/getportfolio");
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

  const aboutText = user?.[0]?.data?.[0]?.about || "Loading...";
  const projects= user?.[0]?.data?.[0]?.projects ||[];
  const skills = user?.[0]?.data?.[0]?.skills || [];


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