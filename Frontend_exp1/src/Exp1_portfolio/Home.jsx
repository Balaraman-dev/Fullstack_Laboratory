import React from 'react'
import man from '../assets/man.png';

export const Home = () => {
  return (
    <div className='w-[95vw] h-auto text-white bg-black rounded-4xl'>
        <h3 className='text-7xl font-serif text-white flex items-end justify-end pt-16 pr-32 hover:animate-bounce hover:text-amber-400'>Intro</h3>
        <div className='w-3/4 flex  relative'>
           <img src={man} className='w-1/2' alt="" />
           <div className='flex flex-col justify-center items-center pl-32'>
                <h3 className=' text-[8vw] font-serif text-amber-400 hover:animate-spin'>Balaraman</h3>
                <h3 className='text-4xl font-serif text-white'>Frotend-Developer</h3>
                <p className=' text-center pt-4 text-white'>A Frontend Developer is a programmer who builds the visual and interactive parts of websites and web applications using technologies like HTML, CSS, and JavaScript. They focus on creating user-friendly interfaces that work smoothly across devices and browsers, often using frameworks like React or Tailwind CSS to enhance design and functionality.</p>
           </div>
            
        </div>
        <div>
        </div>
    </div>
  )
}
