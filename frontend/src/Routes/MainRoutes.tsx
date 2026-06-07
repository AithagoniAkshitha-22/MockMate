import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import {Interview} from "../Components/Interview"
import { InterviewTypes } from '../Components/InterviewTypes'
import { Contact } from '../Pages/Contact'
import { Home } from '../Pages/Home'


export const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/interviews' element={<InterviewTypes/>}/>
            <Route path='/about' element={<Navigate to="/?scroll=about" replace />}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/interview/:techStack' element={<Interview/>}/>
        </Routes>
    </div>
  )
}
