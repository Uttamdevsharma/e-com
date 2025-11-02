import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

    const [message,setMessage] = useState('Please Provide a valid email and password!')
  return (
    <>
    <section className='h-screen flex items-center justify-center'>
         <div className='shadow bg-white p-8 max-w-sm mx-auto '>
            <h2 className='font-semibold text-2xl pt-5'>Please Login!</h2>

            <form action="" className='pt-5 space-y-5 max-w-sm mx-auto'>
                <input  type="email" placeholder='your email'  className='w-full bg-gray-200 focus:outline-none px-5 py-3'  />
                <input  type="password" placeholder='your password'  className='w-full bg-gray-200 focus:outline-none px-5 py-3'  />

                {
                    message && (
                        <p className='text-red-500 font-semibold'>{message}</p>
                    )
                }

                <button className='w-full bg-red-500 text-white flex justify-center items-center py-2 hover:bg-red-600'>Login</button>
            </form>
            <div className='text-center mt-2'>
            Don't have an account?<Link to='/register' className='underline text-red-500 cursor-pointer '>Register </Link>here.
            </div>
         </div>
    </section>
    
    </>
  )
}

export default Login
