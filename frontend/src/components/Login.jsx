import { useForm } from 'react-hook-form'
import React, { useState, useEffect } from 'react';
import { login as authLogin } from '../app/authSlice.js';
import { Input, Button } from './index.js'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = (useSelector((state) => state.auth.userData))

  const [error, setError] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm()
  const handleLogin = async (data) => {
    axios.post('/api/v1/user/login', data)
      .then((response) => {
        dispatch(authLogin(response.data.data.user))
        navigate("/dashboard")
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT" || error.code === "ENOTFOUND") {
          setError("Server is taking too long to respond. Please try again.");
        } else if (error.response) {
          setError(error.response.data?.message || "Invalid credentials.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
      )
  }
  return (
    <div className='w-full h-full loginPage flex justify-center items-center font-[Roboto]'>
      <div className='flex justify-around items-center border-4 border-white bg-white w-3/5 h-4/5 rounded-2xl'>
        <div className=' lg:w-1/2 lg:h-1/2 xl:h-2/3 flex flex-col justify-center h-1/3 signUp xl:ml-8 lg:ml-4'>

          <h1 className='xl:text-2xl font-bold md:mb-4 md:ml-3 lg:text-xl mb:1 text-sm sm
                ml-2 xl:ml-2'>
            Login
          </h1>
          {error && (
            <p className=' text-red-500 md:text-sm text-xs mx-2'>{error}</p>
          )}
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className='xl:w-md sm:text-sm xl:text-lg lg:h-1/3 lg:w-90 sm:ml-2'>
              <div className='flex items-center sm:gap-4 gap-2 sm:my-4 my-2 border-1 border-gray-700 sm:pl-4 pl-1 md:h-11 rounded-sm  md:rounded-xl  sm:focus-within:shadow-lg sm:focus-within:shadow-gray-700 focus-within:shadow-lg focus-within:shadow-gray-500 lg:w-80 w-25 md:w-60 sm:w-50 '>
                <img src='/user.png' className='md:h-5 md:w-5 h-2 w-2 '></img>
                <Input
                  className="lg:w-66 xl:w-66 w-20   md:w-48 sm:w-40"
                  placeholder="Enter Username or Email"
                  {...register('identifier', {
                    required: "Email Or Username Required"
                  })}
                />
              </div>
              {errors.identifier && (
                <p className="text-red-500 md:text-sm text-xs">
                  {errors.identifier.message}
                </p>
              )}
              <div className='flex items-center sm:gap-4 gap-2.5 sm:my-5 my-2 border-1 border-gray-700 sm:pl-4 pl-1 md:h-11 rounded-sm md:rounded-xl  sm:focus-within:shadow-lg sm:focus-within:shadow-gray-700 focus-within:shadow-lg focus-within:shadow-gray-500 lg:w-80 w-25 md:w-60 sm:w-50'>
                <img src='/padlock.png' className='md:h-5 md:w-5 h-2 w-2'></img>
                <Input
                  className="lg:w-66 xl:w-66 w-20 md:48 sm:w-40"
                  placeholder="Enter Password"
                  {...register('password', {
                    required: "Password Required"
                  })}
                />
              </div>
              {errors.password && (
                <div className="flex items-center text-red-500 text-xs md:text-sm mb-2 lg:w-80 w-25 md:w-60 sm:w-50">
                  {errors.password.message}
                </div>
              )}
            </div>

            <Button
              type='submit'
              text="Login"
              className='text-white md:w-16 lg:w-20 sm:w-14 sm:h-6 md:h-8 lg:h-10 button w-10 h-4 text-center rounded-xs xl:text-lg lg:text-lg md:text-sm sm:text-xs xl:ml-2 md:ml-2 sm:ml-2 lg:mt-19 md:mt-2'
            />
          </form>
          <div className='flex justify-start items-center xl:gap-6 xl:text-sm md:gap-2 md:text-sm mt-2 sm:ml-2'>
            <p>don't have an account?</p>
            <Link to='/signup' className='hover:text-blue-600'>create one</Link>
          </div>
        </div>
        <div className='flex justify-center items-center  w-1/2'>
          <img src="/login.svg" alt="Todo Image" className=' xl:h-3/4 xl:w-3/4 lg:h-3/4 lg:w-3/4 md:h-90 md:w-60 sm:h-60 sm:w-60 h-100 w-100 mt-50 xl:mr-40 box-border lg:mr-30 mb-20 xl:ml-20 lg:ml-20 md:mb-15 ' />
        </div>
      </div>
    </div>
  )
}

export default Login