import React from 'react';
import man from '../../assets/man.png';

export const Home = ({ about }) => {
  return (
    <div className="w-[95vw] h-auto text-white bg-black rounded-4xl">
      <h3 className="text-7xl font-serif text-white flex items-end justify-end pt-16 pr-32 hover:animate-bounce hover:text-amber-400">
        Intro
      </h3>

      <div className="w-3/4 flex relative">
        <img src={man} className="w-1/2" alt="profile" />

        <div className="flex flex-col justify-center items-center pl-32">
          <h3 className="text-[8vw] font-serif text-amber-400 ">
            {about.name}
          </h3>
          <h3 className="text-4xl font-serif text-white">{about.role}</h3>
          <p className="text-center pt-4 text-white">{about.description}</p>
        </div>
      </div>
    </div>
  );
};
