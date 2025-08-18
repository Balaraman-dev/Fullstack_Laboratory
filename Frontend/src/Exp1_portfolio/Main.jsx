import React from 'react'
import { Projects } from './Projects'
import { Skills } from './Skills'
import { Contact } from './Contact'
import { Home } from './Home'


export const Main = () => {
  return (
    <div className='flex flex-col gap-16 items-center justify-center py-4'>
        <Home/>
        <Projects/>
        <Skills/>
        <Contact/>
    </div>


  )
}
