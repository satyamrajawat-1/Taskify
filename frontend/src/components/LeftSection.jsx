import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../app/authSlice.js'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { api } from '../lib/api.js'

function LeftSection() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const avatar = (useSelector((state) => (state.auth.userData.avatar)))
    const username = (useSelector((state) => (state.auth.userData.username)))

    const logout = () => {
        console.log('clicked')
        api.post('/api/v1/user/logout')
            .then((res) => {
                console.log(res)
                navigate('/login')
            })
        dispatch(logOut())
    }

    return (
        <>
            <div className='box-border xl:w-2xs xl:h-3/4 leftSection mt-12 md:rounded-r-md rounded-r-sm md:w-50 lg:w-60 sm:w-40 w-30 mr-6 lg:mr-0'>
                <div>
                    <div className='profile flex flex-col items-center'>
                        <img src={avatar} alt="" className='xl:h-20 xl:w-20  md:h-15 md:w-15 lg:h-20 lg:w-20 sm:w-10 sm:h-10 w-5 h-5 absolute xl:top-18 md:top-17 sm:top-21 top-20 items-center rounded-full md:border-2 border-white border object-cover bg-white' />
                        <p className='lg:mt-14 md:mt-10 sm:mt-6 mt-4 lg:font-semibold md:font-medium font-light text-white'>{username}</p>
                    </div>
                </div>
                <div>
                    <ul className='text-white flex flex-col text-center xl:gap-10 xl:mt-10 items-center xl:text-lg gap-7 md:mt-6 mt-4'>
                        <NavLink to='/dashboard' className={({ isActive }) => `flex xl:gap-4 w-4/5 xl:py-2 xl:pl-3 xl:rounded-md py-1  md:w-3/4 pl-1.5 md:gap-4 gap-2 rounded-sm hover:bg-white hover:text-[#FF6767] hover:cursor-pointer ${isActive ? "bg-white cursor-pointer text-[#FF6767]" : ""}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='md:w-5 md:h-5 lg:w-6 lg:h-6 w-4 h-4' >
                                <path d="M13.3333 8V0H24V8H13.3333ZM0 13.3333V0H10.6667V13.3333H0ZM13.3333 24V10.6667H24V24H13.3333ZM0 24V16H10.6667V24H0Z" fill="currentColor" />
                            </svg>

                            <h1 className='xl:text-[18px] md:text-[14px] sm:text-[12px] text-[10px] md:font-semibold font-medium'>Dashboard</h1>
                        </NavLink>
                        <NavLink to='/my-tasks' className={({ isActive }) => `flex items-center xl:gap-4 w-4/5 xl:py-2 xl:pl-3 xl:rounded-md py-1 md:pl-2 md:w-3/4 pl-1.5  md:gap-4 gap-2 rounded-sm hover:bg-white hover:text-[#FF6767] hover:cursor-pointer ${isActive ? "bg-white cursor-pointer text-[#FF6767]" : ""}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='md:w-5 md:h-5 lg:w-6 lg:h-6 w-4 h-4'>
                                <path d="M5 22H19C20.103 22 21 21.103 21 20V5C21 3.897 20.103 3 19 3H17C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2H8C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3H5C3.897 3 3 3.897 3 5V20C3 21.103 3.897 22 5 22ZM5 5H7V7H17V5H19V20H5V5Z" fill="currentColor" />
                                <path d="M11 13.586L9.20697 11.793L7.79297 13.207L11 16.414L16.207 11.207L14.793 9.79297L11 13.586Z" fill="currentColor" />
                            </svg>

                            <h1 className='xl:text-[18px] md:text-[14px] sm:text-[12px] text-[10px] md:font-semibold font-medium'>My Tasks</h1>
                        </NavLink>
                        <NavLink to='change-password' className={({ isActive }) => `flex items-center xl:gap-4 w-4/5 xl:py-2 xl:pl-3 xl:rounded-md py-1 md:pl-2 md:w-3/4 pl-1.5  md:gap-4 gap-2 rounded-sm hover:bg-white hover:text-[#FF6767] hover:cursor-pointer ${isActive ? "bg-white cursor-pointer text-[#FF6767]" : ""}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>

                            <h1 className='xl:text-[18px] md:text-[14px] sm:text-[12px] text-[10px] md:font-semibold font-medium'>Change Password</h1>
                        </NavLink>
                        <NavLink to='/update-profile' className={({ isActive }) => `flex items-center text-center xl:gap-4 w-4/5 xl:py-2 xl:pl-3 xl:rounded-md py-1 md:pl-2 md:w-3/4 pl-1.5 md:gap-4 gap-2 rounded-sm hover:bg-white hover:text-[#FF6767] hover:cursor-pointer ${isActive ? "bg-white cursor-pointer text-[#FF6767]" : ""}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='md:w-5 md:h-5 lg:w-6 lg:h-6 w-4 h-4'>
                                <path d="M11.94 19.2C12.36 19.2 12.7152 19.0548 13.0056 18.7644C13.296 18.474 13.4408 18.1192 13.44 17.7C13.44 17.28 13.2952 16.9248 13.0056 16.6344C12.716 16.344 12.3608 16.1992 11.94 16.2C11.52 16.2 11.1652 16.3452 10.8756 16.6356C10.586 16.926 10.4408 17.2808 10.44 17.7C10.44 18.12 10.5852 18.4752 10.8756 18.7656C11.166 19.056 11.5208 19.2008 11.94 19.2ZM10.86 14.58H13.08C13.08 13.92 13.1552 13.4 13.3056 13.02C13.456 12.64 13.8808 12.12 14.58 11.46C15.1 10.94 15.51 10.4448 15.81 9.9744C16.11 9.504 16.26 8.9392 16.26 8.28C16.26 7.16 15.85 6.3 15.03 5.7C14.21 5.1 13.24 4.8 12.12 4.8C10.98 4.8 10.0548 5.1 9.3444 5.7C8.634 6.3 8.1392 7.02 7.86 7.86L9.84 8.64C9.94 8.28 10.1652 7.89 10.5156 7.47C10.866 7.05 11.4008 6.84 12.12 6.84C12.76 6.84 13.24 7.0152 13.56 7.3656C13.88 7.716 14.04 8.1008 14.04 8.52C14.04 8.92 13.92 9.2952 13.68 9.6456C13.44 9.996 13.14 10.3208 12.78 10.62C11.9 11.4 11.36 11.99 11.16 12.39C10.96 12.79 10.86 13.52 10.86 14.58ZM12 24C10.34 24 8.78 23.6848 7.32 23.0544C5.86 22.424 4.59 21.5692 3.51 20.49C2.43 19.41 1.5752 18.14 0.9456 16.68C0.316 15.22 0.0008 13.66 0 12C0 10.34 0.3152 8.78 0.9456 7.32C1.576 5.86 2.4308 4.59 3.51 3.51C4.59 2.43 5.86 1.5752 7.32 0.9456C8.78 0.316 10.34 0.0008 12 0C13.66 0 15.22 0.3152 16.68 0.9456C18.14 1.576 19.41 2.4308 20.49 3.51C21.57 4.59 22.4252 5.86 23.0556 7.32C23.686 8.78 24.0008 10.34 24 12C24 13.66 23.6848 15.22 23.0544 16.68C22.424 18.14 21.5692 19.41 20.49 20.49C19.41 21.57 18.14 22.4252 16.68 23.0556C15.22 23.686 13.66 24.0008 12 24Z" fill="currentColor" />
                            </svg>

                            <h1 className='xl:text-[18px] md:text-[14px] sm:text-[12px] text-[10px] md:font-semibold font-medium'>Update Profile</h1>
                        </NavLink>
                    </ul>
                </div>
                <div className='text-white logout flex items-center  mt-8  rounded-sm box-border text-center md:h-10 xl:w-30 md:w-30 w-20 mx-auto h-6 hover:bg-white hover:text-[#FF6767]'>
                    <button onClick={logout} className='cursor-pointer flex justify-between items-center gap-2'>

                        <svg className='md:w-5 md:h-5 lg:w-6 lg:h-6 w-4 h-4 ml-2' fill="currentColor" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 384.971 384.971" xml:space="preserve">
                            <g>
                                <g id="Sign_Out">
                                    <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z"/>
                                    <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                            </g>
                        </svg>
                        <p className='xl:text-[18px] md:text-[14px] sm:text-[12px] text-[10px] md:font-semibold font-medium'>Log Out</p>
                    </button>
                </div>
            </div>

        </>
    )
}

export default LeftSection