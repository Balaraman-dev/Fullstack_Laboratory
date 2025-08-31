import React from 'react'

export const Skills = ({skills}) => {
       console.log(skills);
  return (
    <div className='w-[95vw] rounded-4xl h-auto text-white bg-black py-12 '>
           <h3 className='text-7xl font-serif text-white flex items-end justify-end pr-32 hover:animate-bounce hover:text-amber-400'>skills</h3>
         <div className='w-11/12 flex gap-8 mt-8 flex-wrap justify-center'>

        {skills.length > 0 &&
          skills.map((group, ind) => (
            <div key={ind} className="mb-6">
              <h2 className="text-2xl font-bold text-center mb-4 text-amber-400">
                {group.skillsTitle}
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {group.skill.map((s, i) => (
                  <h3
                    key={i}
                    className="text-xl p-2 hover:scale-110 duration-500 text-center bg-blue-900 hover:bg-amber-400 hover:text-black hover:shadow-white text-white w-[200px] rounded-2xl shadow-md shadow-amber-300 font-semibold"
                  >
                    {s}
                  </h3>
                ))}
              </div>
            </div>
          ))}
  
            
         </div> 
          
    </div>
  )
}
