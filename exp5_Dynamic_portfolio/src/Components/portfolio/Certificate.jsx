import React from 'react'

export const Certificate = ({cert}) => {
  return (
    <div className="w-[95%] h-auto text-white bg-black rounded-4xl py-8">
        <h3 className='text-7xl font-serif text-white flex items-end justify-end pr-32 hover:animate-bounce hover:text-amber-400 mt-16'>certificate</h3>

          <a className='w-[100%] mt-8 ml-24  px-16 py-4 text-xl p-2 hover:scale-95 duration-500  text-center bg-blue-900 hover:bg-amber-400 hover:text-black hover:shadow-white  text-white rounded-2xl shadow-md shadow-amber-300 font-semibold' href={cert.link}>{cert.name}</a>

    </div>
  )
}


