import React, { useEffect, useState } from 'react'
import { StartedTaskCard, TaskCard } from '../index'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Login from '../../pages/Login.jsx'
import { logOut } from '../../app/authSlice.js'
import { useNavigate , Link , NavLink} from 'react-router-dom'
import { addTodo } from '../../app/todoSlice.js'
function Container() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = (useSelector((state) => (state.auth.userData._id)))
    const avatar = (useSelector((state) => (state.auth.userData.avatar)))
    const username = (useSelector((state) => (state.auth.userData.username)))
    console.log(avatar)
    const data = () => (axios.get(`/api/v1/todo/get-todo?userId=${id}`, { withCredentials: true })
        .then((response) => {
            // console.log(response.data.data)
            const array = response.data.data
            array.map((todo) => {
                const dateString = todo.createdAt;
                const date = new Date(dateString);
                const createdAt = date.toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                })
                dispatch(addTodo({ text: todo.task, status: todo.status, createdAt: createdAt }))
                // console.log("todos added")
            })
        })
        .catch((error) => console.log(error)))

    useEffect(() => {
        data()
    }, [])
    const todos = useSelector((state) => state.todo.todos)
    const StartedTodos = todos.filter((todo) => todo.status === 'started')
    console.log(StartedTodos)
    // console.log(todos)
    const CompletedTodos = todos.filter((todo) => todo.status === 'completed')
    const NOtStartedTodos = todos.filter((todo) => todo.status === 'not started')
    const logout = () => {
        console.log('clicked')
        axios.post('/api/v1/user/logout')
            .then((res) => {
                console.log(res)
                navigate('/login')
            })
        dispatch(logOut())
    }


    return (
        <div className='section'>
            <div className='box-border xl:w-2xs xl:h-3/4 leftSection mt-12 md:rounded-r-md rounded-r-sm md:w-50 lg:w-60 sm:w-40 w-30 mr-6 lg:mr-0'>
                <div>
                    <div className='profile flex flex-col items-center'>
                        <img src={avatar} alt="" className='xl:h-20 xl:w-20  md:h-15 md:w-15 lg:h-20 lg:w-20 sm:w-10 sm:h-10 w-5 h-5 absolute xl:top-18 md:top-17 sm:top-21 top-20 items-center rounded-full md:border-2 border-white border object-cover bg-white' />
                        <p className='lg:mt-14 md:mt-10 sm:mt-6 mt-4 lg:font-semibold md:font-medium font-light text-white'>{username}</p>
                    </div>
                </div>
                <div>
                    <ul className='text-white flex flex-col text-center xl:gap-10 xl:mt-10 items-center xl:text-lg gap-7 md:mt-6 mt-4'>
                        <li className='flex xl:gap-4 border-2 border-black w-4/5 xl:py-2 xl:pl-3 xl:rounded-md py-1  md:w-3/4 pl-1.5 md:gap-4 gap-2 rounded-sm'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='md:w-5 md:h-5 lg:w-6 lg:h-6 w-4 h-4' >
                                <path d="M13.3333 8V0H24V8H13.3333ZM0 13.3333V0H10.6667V13.3333H0ZM13.3333 24V10.6667H24V24H13.3333ZM0 24V16H10.6667V24H0Z" fill="currentColor" />
                            </svg>

                            <h1>Dashboard</h1>
                        </li>
                        <li className='flex items-center xl:gap-4 border-2 border-black w-4/5 xl:py-2 xl:pl-3 xl:rounded-md py-1 md:pl-2 md:w-3/4 pl-1.5  md:gap-4 gap-2 rounded-sm'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='md:w-5 md:h-5 lg:w-6 lg:h-6 w-4 h-4'>
                                <path d="M5 22H19C20.103 22 21 21.103 21 20V5C21 3.897 20.103 3 19 3H17C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2H8C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3H5C3.897 3 3 3.897 3 5V20C3 21.103 3.897 22 5 22ZM5 5H7V7H17V5H19V20H5V5Z" fill="currentColor" />
                                <path d="M11 13.586L9.20697 11.793L7.79297 13.207L11 16.414L16.207 11.207L14.793 9.79297L11 13.586Z" fill="currentColor" />
                            </svg>

                            <h1>My Tasks</h1>
                        </li>
                        <li className='flex xl:gap-4 items-center border-2 border-black w-4/5 xl:py-2 xl:pl-3 xl:rounded-md py-1 md:pl-2 md:w-3/4 pl-1.5 md:gap-4 gap-2 rounded-sm'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='md:w-5 md:h-5 lg:w-6 lg:h-6 w-4 h-4'>
                                <path d="M8.71642 24L8.23881 20.16C7.9801 20.06 7.73612 19.94 7.50687 19.8C7.27761 19.66 7.05393 19.51 6.83582 19.35L3.28358 20.85L0 15.15L3.07463 12.81C3.05473 12.67 3.04478 12.5348 3.04478 12.4044V11.5956C3.04478 11.4652 3.05473 11.33 3.07463 11.19L0 8.85L3.28358 3.15L6.83582 4.65C7.05473 4.49 7.28358 4.34 7.52239 4.2C7.76119 4.06 8 3.94 8.23881 3.84L8.71642 0H15.2836L15.7612 3.84C16.0199 3.94 16.2639 4.06 16.4931 4.2C16.7224 4.34 16.9461 4.49 17.1642 4.65L20.7164 3.15L24 8.85L20.9254 11.19C20.9453 11.33 20.9552 11.4652 20.9552 11.5956V12.4044C20.9552 12.5348 20.9353 12.67 20.8955 12.81L23.9701 15.15L20.6866 20.85L17.1642 19.35C16.9453 19.51 16.7164 19.66 16.4776 19.8C16.2388 19.94 16 20.06 15.7612 20.16L15.2836 24H8.71642ZM12.0597 16.2C13.2139 16.2 14.199 15.79 15.0149 14.97C15.8308 14.15 16.2388 13.16 16.2388 12C16.2388 10.84 15.8308 9.85 15.0149 9.03C14.199 8.21 13.2139 7.8 12.0597 7.8C10.8856 7.8 9.89532 8.21 9.08896 9.03C8.28259 9.85 7.8798 10.84 7.8806 12C7.8806 13.16 8.28338 14.15 9.08896 14.97C9.89453 15.79 10.8848 16.2 12.0597 16.2Z" fill="currentColor" />
                            </svg>

                            <h1>Setting</h1>
                        </li>
                        <li className='flex items-center text-center xl:gap-4 border-2 border-black w-4/5 xl:py-2 xl:pl-3 xl:rounded-md py-1 md:pl-2 md:w-3/4 pl-1.5 md:gap-4 gap-2 rounded-sm'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='md:w-5 md:h-5 lg:w-6 lg:h-6 w-4 h-4'>
                                <path d="M11.94 19.2C12.36 19.2 12.7152 19.0548 13.0056 18.7644C13.296 18.474 13.4408 18.1192 13.44 17.7C13.44 17.28 13.2952 16.9248 13.0056 16.6344C12.716 16.344 12.3608 16.1992 11.94 16.2C11.52 16.2 11.1652 16.3452 10.8756 16.6356C10.586 16.926 10.4408 17.2808 10.44 17.7C10.44 18.12 10.5852 18.4752 10.8756 18.7656C11.166 19.056 11.5208 19.2008 11.94 19.2ZM10.86 14.58H13.08C13.08 13.92 13.1552 13.4 13.3056 13.02C13.456 12.64 13.8808 12.12 14.58 11.46C15.1 10.94 15.51 10.4448 15.81 9.9744C16.11 9.504 16.26 8.9392 16.26 8.28C16.26 7.16 15.85 6.3 15.03 5.7C14.21 5.1 13.24 4.8 12.12 4.8C10.98 4.8 10.0548 5.1 9.3444 5.7C8.634 6.3 8.1392 7.02 7.86 7.86L9.84 8.64C9.94 8.28 10.1652 7.89 10.5156 7.47C10.866 7.05 11.4008 6.84 12.12 6.84C12.76 6.84 13.24 7.0152 13.56 7.3656C13.88 7.716 14.04 8.1008 14.04 8.52C14.04 8.92 13.92 9.2952 13.68 9.6456C13.44 9.996 13.14 10.3208 12.78 10.62C11.9 11.4 11.36 11.99 11.16 12.39C10.96 12.79 10.86 13.52 10.86 14.58ZM12 24C10.34 24 8.78 23.6848 7.32 23.0544C5.86 22.424 4.59 21.5692 3.51 20.49C2.43 19.41 1.5752 18.14 0.9456 16.68C0.316 15.22 0.0008 13.66 0 12C0 10.34 0.3152 8.78 0.9456 7.32C1.576 5.86 2.4308 4.59 3.51 3.51C4.59 2.43 5.86 1.5752 7.32 0.9456C8.78 0.316 10.34 0.0008 12 0C13.66 0 15.22 0.3152 16.68 0.9456C18.14 1.576 19.41 2.4308 20.49 3.51C21.57 4.59 22.4252 5.86 23.0556 7.32C23.686 8.78 24.0008 10.34 24 12C24 13.66 23.6848 15.22 23.0544 16.68C22.424 18.14 21.5692 19.41 20.49 20.49C19.41 21.57 18.14 22.4252 16.68 23.0556C15.22 23.686 13.66 24.0008 12 24Z" fill="currentColor" />
                            </svg>

                            <h1>Help</h1>
                        </li>
                    </ul>
                </div>
                <div className='text-white logout flex items-center  mt-8  rounded-sm box-border border-2 border-black  text-center md:h-10 xl:w-30 md:w-30 w-20 mx-auto h-6'>
                    <button onClick={logout} className='cursor-pointer'>
                        <svg width="288" height="59" viewBox="0 0 288 59" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-40 h-10 md:w-2xs md:h-14 shrink-0 md:pr-4'>
                            <path d="M34.6667 23.6667L32.8 25.5333L34.9333 27.6667H24V30.3333H34.9333L32.8 32.4667L34.6667 34.3333L40 29L34.6667 23.6667ZM18.6667 19.6667H28V17H18.6667C17.2 17 16 18.2 16 19.6667V38.3333C16 39.8 17.2 41 18.6667 41H28V38.3333H18.6667V19.6667Z" fill="currentColor" />
                            <path d="M56.2784 35V23.3636H58.0341V33.4886H63.3068V35H56.2784ZM68.8494 35.1761C68.0313 35.1761 67.3172 34.9886 66.7074 34.6136C66.0975 34.2386 65.6241 33.714 65.2869 33.0398C64.9498 32.3655 64.7812 31.5777 64.7812 30.6761C64.7812 29.7708 64.9498 28.9792 65.2869 28.3011C65.6241 27.6231 66.0975 27.0966 66.7074 26.7216C67.3172 26.3466 68.0313 26.1591 68.8494 26.1591C69.6676 26.1591 70.3816 26.3466 70.9915 26.7216C71.6013 27.0966 72.0748 27.6231 72.4119 28.3011C72.7491 28.9792 72.9176 29.7708 72.9176 30.6761C72.9176 31.5777 72.7491 32.3655 72.4119 33.0398C72.0748 33.714 71.6013 34.2386 70.9915 34.6136C70.3816 34.9886 69.6676 35.1761 68.8494 35.1761ZM68.8551 33.75C69.3854 33.75 69.8248 33.6098 70.1733 33.3295C70.5218 33.0492 70.7794 32.6761 70.946 32.2102C71.1165 31.7443 71.2017 31.2311 71.2017 30.6705C71.2017 30.1136 71.1165 29.6023 70.946 29.1364C70.7794 28.6667 70.5218 28.2898 70.1733 28.0057C69.8248 27.7216 69.3854 27.5795 68.8551 27.5795C68.321 27.5795 67.8778 27.7216 67.5256 28.0057C67.1771 28.2898 66.9176 28.6667 66.7472 29.1364C66.5805 29.6023 66.4972 30.1136 66.4972 30.6705C66.4972 31.2311 66.5805 31.7443 66.7472 32.2102C66.9176 32.6761 67.1771 33.0492 67.5256 33.3295C67.8778 33.6098 68.321 33.75 68.8551 33.75ZM78.473 38.4545C77.7798 38.4545 77.1832 38.3636 76.6832 38.1818C76.187 38 75.7817 37.7595 75.4673 37.4602C75.1529 37.161 74.9181 36.8333 74.7628 36.4773L76.223 35.875C76.3253 36.0417 76.4616 36.2178 76.6321 36.4034C76.8063 36.5928 77.0412 36.7538 77.3366 36.8864C77.6359 37.0189 78.0204 37.0852 78.4901 37.0852C79.134 37.0852 79.6662 36.928 80.0866 36.6136C80.5071 36.303 80.7173 35.8068 80.7173 35.125V33.4091H80.6094C80.5071 33.5947 80.3594 33.8011 80.1662 34.0284C79.9768 34.2557 79.7154 34.4527 79.3821 34.6193C79.0488 34.786 78.6151 34.8693 78.081 34.8693C77.3916 34.8693 76.7704 34.7083 76.2173 34.3864C75.6681 34.0606 75.2325 33.5814 74.9105 32.9489C74.5923 32.3125 74.4332 31.5303 74.4332 30.6023C74.4332 29.6742 74.5904 28.8788 74.9048 28.2159C75.223 27.553 75.6586 27.0455 76.2116 26.6932C76.7647 26.3371 77.3916 26.1591 78.0923 26.1591C78.634 26.1591 79.0715 26.25 79.4048 26.4318C79.7382 26.6098 79.9976 26.8182 80.1832 27.0568C80.3726 27.2955 80.5185 27.5057 80.6207 27.6875H80.7457V26.2727H82.4105V35.1932C82.4105 35.9432 82.2363 36.5587 81.8878 37.0398C81.5393 37.5208 81.0677 37.8769 80.473 38.108C79.8821 38.339 79.2154 38.4545 78.473 38.4545ZM78.456 33.4602C78.9446 33.4602 79.3575 33.3466 79.6946 33.1193C80.0355 32.8883 80.2931 32.5587 80.4673 32.1307C80.6454 31.6989 80.7344 31.1818 80.7344 30.5795C80.7344 29.9924 80.6473 29.4754 80.473 29.0284C80.2988 28.5814 80.0431 28.233 79.706 27.983C79.3688 27.7292 78.9522 27.6023 78.456 27.6023C77.9446 27.6023 77.5185 27.7348 77.1776 28C76.8366 28.2614 76.5791 28.6174 76.4048 29.0682C76.2344 29.5189 76.1491 30.0227 76.1491 30.5795C76.1491 31.1515 76.2363 31.6534 76.4105 32.0852C76.5848 32.517 76.8423 32.8542 77.1832 33.0966C77.5279 33.339 77.9522 33.4602 78.456 33.4602ZM88.3651 35.1761C87.5469 35.1761 86.8329 34.9886 86.223 34.6136C85.6132 34.2386 85.1397 33.714 84.8026 33.0398C84.4654 32.3655 84.2969 31.5777 84.2969 30.6761C84.2969 29.7708 84.4654 28.9792 84.8026 28.3011C85.1397 27.6231 85.6132 27.0966 86.223 26.7216C86.8329 26.3466 87.5469 26.1591 88.3651 26.1591C89.1832 26.1591 89.8973 26.3466 90.5071 26.7216C91.117 27.0966 91.5904 27.6231 91.9276 28.3011C92.2647 28.9792 92.4332 29.7708 92.4332 30.6761C92.4332 31.5777 92.2647 32.3655 91.9276 33.0398C91.5904 33.714 91.117 34.2386 90.5071 34.6136C89.8973 34.9886 89.1832 35.1761 88.3651 35.1761ZM88.3707 33.75C88.901 33.75 89.3404 33.6098 89.6889 33.3295C90.0374 33.0492 90.295 32.6761 90.4616 32.2102C90.6321 31.7443 90.7173 31.2311 90.7173 30.6705C90.7173 30.1136 90.6321 29.6023 90.4616 29.1364C90.295 28.6667 90.0374 28.2898 89.6889 28.0057C89.3404 27.7216 88.901 27.5795 88.3707 27.5795C87.8366 27.5795 87.3935 27.7216 87.0412 28.0057C86.6927 28.2898 86.4332 28.6667 86.2628 29.1364C86.0961 29.6023 86.0128 30.1136 86.0128 30.6705C86.0128 31.2311 86.0961 31.7443 86.2628 32.2102C86.4332 32.6761 86.6927 33.0492 87.0412 33.3295C87.3935 33.6098 87.8366 33.75 88.3707 33.75ZM99.858 31.3807V26.2727H101.562V35H99.892V33.4886H99.8011C99.6004 33.9545 99.2784 34.3428 98.8352 34.6534C98.3958 34.9602 97.8485 35.1136 97.1932 35.1136C96.6326 35.1136 96.1364 34.9905 95.7045 34.7443C95.2765 34.4943 94.9394 34.125 94.6932 33.6364C94.4508 33.1477 94.3295 32.5436 94.3295 31.8239V26.2727H96.0284V31.6193C96.0284 32.214 96.1932 32.6875 96.5227 33.0398C96.8523 33.392 97.2803 33.5682 97.8068 33.5682C98.125 33.5682 98.4413 33.4886 98.7557 33.3295C99.0739 33.1705 99.3371 32.9299 99.5455 32.608C99.7576 32.286 99.8617 31.8769 99.858 31.3807ZM107.919 26.2727V27.6364H103.152V26.2727H107.919ZM104.43 24.1818H106.129V32.4375C106.129 32.767 106.179 33.0152 106.277 33.1818C106.375 33.3447 106.502 33.4564 106.658 33.517C106.817 33.5739 106.989 33.6023 107.175 33.6023C107.311 33.6023 107.43 33.5928 107.533 33.5739C107.635 33.5549 107.714 33.5398 107.771 33.5284L108.078 34.9318C107.98 34.9697 107.839 35.0076 107.658 35.0455C107.476 35.0871 107.249 35.1098 106.976 35.1136C106.529 35.1212 106.112 35.0417 105.726 34.875C105.339 34.7083 105.027 34.4508 104.788 34.1023C104.55 33.7538 104.43 33.3163 104.43 32.7898V24.1818Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className='grid h-full'>
                <div className='grid grid-cols-2 grid-rows-2 border-2 border-black h-11/12 w-11/12 xl:mt-11 md:gap-8 gap-4'>
                    <div className='border-2 border-yellow-500 row-span-2 h-11/12 xl:mt-6 xl:ml-4 xl:rounded-md xl:shadow-lg xl:shadow-zinc-700'>
                        <div className='border-2 border-red-500 h-1/12 '></div>
                        <ul className='border-2 border-purple-700 xl:my-2 overflow-auto box-border tasks'>
                            {
                                StartedTodos.map((todo) => {
                                    return (<StartedTaskCard key={todo.id} text={todo.text} status={todo.status} createdAt={todo.createdAt}></StartedTaskCard>)
                                })
                            }

                        </ul>
                    </div>
                    <div className='border-2 border-red-800 xl:mt-6 xl:mr-4 xl:rounded-md xl:shadow-lg xl:shadow-zinc-700 h-64 box-border'>
                        <div className='border-2 border-amber-600 h-1/12 box-border'>hello</div>
                        <ul className='border-2 border-blue-900 box-border overflow-auto md:my-2 h-56'>
                            {
                                CompletedTodos.map((todo) => {
                                    return (<TaskCard key={todo.id} text={todo.text} status={todo.status} createdAt={todo.createdAt}></TaskCard>)
                                })
                            }
                        </ul>
                    </div>
                    <div className='border-2 border-green-800 xl:mb-2 xl:mr-4 xl:rounded-md xl:shadow-lg xl:shadow-zinc-700 h-64'>
                        <div className='border-2 border-amber-600 h-1/12 box-border'>hello</div>
                        <ul className='border-2 border-blue-900 box-border overflow-auto md:my-2 h-56'>
                            {
                                NOtStartedTodos.map((todo) => {
                                    return (<TaskCard key={todo.id} text={todo.text} status={todo.status} createdAt={todo.createdAt}></TaskCard>)
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container