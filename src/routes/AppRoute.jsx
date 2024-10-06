import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../components/LoginPage'
import Home from '../components/Home'
import Result from '../components/Result'
import Quiz from '../components/Quiz'

const AppRoute = () => {
   return (
      <Routes>
         <Route path="/" element={<LoginPage />} />
         <Route path='/home' element={<Home />} />
         <Route path='/quiz' element={<Quiz />} />
         <Route path='/result' element={<Result />} />
      </Routes>
   )
}

export default AppRoute