import React from 'react'

export const Skills = ({skills}) => {
       console.log(skills.length);
  return (
    <div className='w-[95vw] rounded-4xl h-auto text-white bg-black py-12 '>
           <h3 className='text-7xl font-serif text-white flex items-end justify-end pr-32 hover:animate-bounce hover:text-amber-400'>skills</h3>
         <div className='w-11/12 flex gap-8 mt-8 flex-wrap justify-center text-white'>
          {skills.length>0 && skills.map((val,ind)=>(
            <h3 className='border-2 border-white text-black bg-amber-500 p-3 rounded-xl hover:scale-95 duration-200 font-bold'  key={ind}>{val}</h3>
          ))}
         </div> 
          
    </div>
  )
}
