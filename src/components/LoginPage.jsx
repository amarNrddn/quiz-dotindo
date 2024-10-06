import React, { useEffect, useState } from 'react'
import { paswords } from '../constans/passwords'
import { useNavigate } from 'react-router-dom'

import Form from '../atoms/Form'
import Button from '../atoms/Button'

const LoginPage = () => {
   const [form, setForm] = useState({
      userName: '',
      password: ''
   })
   const [timeOutId, setTimeOutId] = useState(null)
   const navigate = useNavigate()
   const [messageError, setMessageError]  = useState('')

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value })
      resetTimeout()
   }

   const handleLogin = () => {
      const isLoginSuccess = paswords.some((item) => {
         return item.userName === form.userName && item.pasword === form.password
      })

      if (isLoginSuccess) {
         console.log('Login Success')
         localStorage.setItem('user', form.userName)
         navigate('/home')
      } else {
         setMessageError('User Tidak Terdaftar')
      }
   }

   setTimeout(() => {
      setMessageError("")
   }, 5000)

   const setLogoutTimer = () => {
      const id = setTimeout(() => {
         localStorage.removeItem('user')
         navigate('/')
         console.log('Auto-logout karena tidak ada aktivitas');
      }, 5 * 60 * 1000)
      setTimeOutId(id)
   }

   const resetTimeout = () => {
      if (timeOutId) {
         clearTimeout(timeOutId)
      }
      setLogoutTimer()
   }

   useEffect(() => {
      const loggedInUser = localStorage.getItem('user')
      if (loggedInUser) {
         navigate('/home')
      }

   }, [navigate])

   return (
      <div className="flex flex-col items-center justify-center h-screen">
         {messageError && <p className='text-red-500'>{messageError}</p>}
         <Form
            type={'text'}
            name={'userName'}
            value={form.userName}
            placeholder={'Masukan User Name'}
            onChange={handleChange}
         />
         <br />
         <Form
            type={'password'}
            name={'password'}
            value={form.password}
            placeholder={'Masukan Password'}
            onChange={handleChange}
         />
         <br />
         <Button variant='default' onClick={handleLogin}>Login</Button>
      </div>
   )
}

export default LoginPage