import React from 'react'

export const Projects = ({ projects }) => {

  return (
    <div className='w-[95vw] h-auto text-white bg-black py-16 rounded-4xl'>
      <h3 className='text-7xl font-serif text-white flex items-end justify-end pr-32 hover:animate-bounce hover:text-amber-400'>Projects</h3>
      <div className='w-full flex justify-center items-center'>
        <div className='w-11/12 flex justify-center items-center gap-8 pt-16'>
          {projects && projects.length > 0 ? (
            projects.map((pro, idx) => (
              <div
                key={pro._id || idx}
                className="w-1/3 hover:shadow-lg shadow-gray-50 p-4 rounded-xl flex flex-col gap-4 justify-center items-center hover:scale-105 duration-300"
              >
                <p className="text-4xl font-mono text-amber-400">
                  <a href={pro?.link || "#"} target="_blank" rel="noreferrer">
                    {pro?.name}
                  </a>
                </p>
                <img
                  className="w-11/12 rounded-2xl min-h-[220px]"
                  src={pro?.img || pro?.name}
                  alt={pro?.name || "project"}
                />
                <p className="w-11/12 text-center">{pro?.description }</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No projects available</p>
          )}
        </div>
      </div>
    </div>
  )
}
