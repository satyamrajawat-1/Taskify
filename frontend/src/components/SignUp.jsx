import { useForm } from 'react-hook-form'
import React, { useState } from 'react';
import { Input, Button } from './index.js'
// import { login as authLogin } from '../app/authSlice.js';
import { api } from '../lib/api.js';
import { useNavigate ,Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
function SignUp() {
  const navigate = useNavigate()
  const [errmsg,setErrMsg] = useState("")
  const dispatch = useDispatch()
  const signUp = async (data) => {
    const formData = new FormData()
    formData.append("fullname", data.fullname)
    formData.append("username", data.username)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("avatar", data.avatar[0])

    try {
      const res = await api.post('/api/v1/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(res.data)
      // dispatch(authLogin(res.data.data))
      navigate("/")
    } catch (error) {
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT" || error.code === "ENOTFOUND") {
          setErrMsg("Server is taking too long to respond. Please try again.");
        } else if (error.response) {
          setErrMsg(error.response.data?.message || "Invalid credentials.");
        } else {
          setErrMsg("Something went wrong. Please try again.");
        }
    }
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const selectedFile = watch('avatar')
  return (
    <div className='w-full h-full loginPage flex justify-center items-center font-[Roboto]'>
      <div className='flex justify-around items-center border-4 border-white bg-white w-3/4 h-4/5 rounded-2xl'>
        <div className='flex justify-center items-center  w-1/2'>
          <img src="/signUp.png" alt="Todo Image" className=' xl:h-2/3 xl:w-2/3 lg:h-2/3 lg:w-2/3 md:h-90 md:w-60 sm:h-40 sm:w-40 h-30 w-30' />
        </div>
        <div className=' lg:w-1/2 lg:h-1/2 xl:h-2/3 flex flex-col justify-center h-1/3 signUp'>
          <h1 className='xl:text-2xl font-bold md:mb-4 md:ml-2 lg:text-xl mb:1 text-sm '>
            Sign Up
          </h1>
          <p className='text-red-500 md:text-sm text-xs'>{errmsg}</p>
          <form onSubmit={handleSubmit(signUp)}>
            <div className='xl:w-md sm:text-sm xl:text-lg lg:h-1/3 lg:w-96'>
              <div className='flex items-center gap-4 my-3 border-1 border-gray-700 pl-3 md:h-12 rounded-sm  md:rounded-xl sm:focus-within:shadow-lg sm:focus-within:shadow-gray-700 focus-within:shadow-lg focus-within:shadow-gray-700'>
                <img src='/user-avatar.png' className='md:h-6 md:w-6 h-3 w-3 '></img>
                <Input
                  className="xl:w-96 sm:ml-2 ml-0.5"
                  placeholder="Enter Your Full Name"
                  {...register('fullname', {
                    required: "Fullname Required"
                  })}
                />
              </div>
              {errors.fullname && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.fullname.message}
                </p>
              )}
              <div className='flex items-center gap-4 my-2 border-1 border-gray-700 pl-4 md:h-11 rounded-sm  md:rounded-xl sm:focus-within:shadow-lg sm:focus-within:shadow-gray-700 focus-within:shadow-lg focus-within:shadow-gray-500'>
                <img src='/user.png' className='md:h-5 md:w-5 h-2 w-2'></img>
                <Input
                  className="xl:w-96 sm:ml-2 ml-0.5"
                  placeholder="Enter Your Username"
                  {...register('username', {
                    required: "Username Required"
                  })}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.username.message}
                </p>
              )}
              <div className='flex items-center gap-4 my-2 border-1 border-gray-700 pl-4 md:h-11 rounded-sm md:rounded-xl sm:focus-within:shadow-lg sm:focus-within:shadow-gray-700 focus-within:shadow-lg focus-within:shadow-gray-500 '>
                <img src='/mail.png' className='md:h-5 md:w-5 h-2 w-2'></img>
                <Input
                  className="xl:w-96 sm:ml-2 ml-0.5"
                  placeholder="Enter Your Email"
                  type="email"
                  {...register('email', {
                    required: true,
                    validate: {
                      matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.email.message}
                </p>
              )}
              <div className='flex items-center gap-4 my-2 border-1 border-gray-700 pl-4 md:h-11 rounded-sm md:rounded-xl sm:focus-within:shadow-lg sm:focus-within:shadow-gray-700 focus-within:shadow-lg focus-within:shadow-gray-500'>
                <img src='/padlock.png' className='md:h-5 md:w-5 h-2 w-2'></img>
                <Input
                  className="xl:w-96 sm:ml-2 ml-0.5"
                  placeholder="Enter Your Password"
                  {...register('password', {
                    required: "Password Required"
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.password.message}
                </p>
              )}
              <div className='flex items-center gap-4  my-2 border-1 border-gray-700 pl-4 md:h-11 rounded-sm md:rounded-xl sm:focus-within:shadow-lg sm:focus-within:shadow-gray-700 focus-within:shadow-lg focus-within:shadow-gray-500 overflow-hidden'>
                <img src="/avatar.png" alt="" className='md:h-5 md:w-5 h-2 w-2' />
                {selectedFile?.length > 0 ? (
                  <span className="absolute sm:ml-8 ml-6 md:ml-11 text-gray-500 font-[Roboto] cursor-pointer overflow-hidden whitespace-nowrap fileName">
                    {selectedFile[0]?.name}
                  </span>
                ) : (<span className="absolute md:ml-11 ml-6 sm:ml-8 text-zinc-500 font-[Roboto] cursor-pointer">
                  {"Upload Avatar"}
                </span>)}

                <Input
                  type="file"
                  className="xl:w-96 sm:ml-2 ml-0.5 opacity-0"
                  accept="image/*"
                  {...register('avatar', { required: "Avatar is required" })}
                />
              </div>
              {errors.avatar && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.avatar.message}
                </p>
              )}
              <Button
                type='submit'
                text="Sign In"
                className='text-white md:w-20 lg:w-20 sm:w-14 sm:h-6 md:h-8 lg:h-10 button w-10 h-4 text-center rounded-xs xl:text-md lg:text-md md:text-sm sm:text-xs mt-3'
              />
            </div>

          </form>

          <div className='flex justify-start items-center xl:gap-6 xl:text-sm md:gap-2 md:text-sm mt-2 sm:ml-2 gap-2 sm:mt-4'>
            <p>Already have an account?</p>
            <Link className='hover:text-blue-500' to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp