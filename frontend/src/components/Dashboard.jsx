import React, { useEffect, useState , useRef} from 'react'
import { StartedTaskCard, TaskCard ,NotStartedTaskCard} from './index'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { addTodo } from '../app/todoSlice.js'
import { useForm } from 'react-hook-form'
import { Input, Button } from './index.js'
function Dashboard() {
    const newTask = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [addTask, setAddTask] = useState(false)
    const id = (useSelector((state) => (state.auth.userData._id)))
    const Data = () => (axios.get(`/api/v1/todo/get-todo?userId=${id}`, { withCredentials: true })
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
                dispatch(addTodo({ task: todo.task, status: todo.status, createdAt: todo.createdAt , id:todo._id }))
                // console.log("todos added")
            })
        })
        .catch((error) => console.log(error)))

    useEffect(() => {
        Data()
    }, [])
    const todos = useSelector((state) => state.todo.todos).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const StartedTodos = todos.filter((todo) => todo.status === 'started')
    // console.log(StartedTodos)
    // console.log(todos)
    const CompletedTodos = todos.filter((todo) => todo.status === 'completed')
    const NOtStartedTodos = todos.filter((todo) => todo.status === 'not started')
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const addNewTask = (data) => {
        console.log(data)
        const createdAt = new Date()
        console.log(createdAt)
        axios.post('/api/v1/todo/add-todo', data).then(() => dispatch(addTodo({ task: data.task, status: data.status, createdAt , id:data._id}))).catch((err) => console.log(err))
        reset()
        setAddTask(false)

    }

    useEffect(()=>{
        const handleOutsideclick = (event)=>{
          if(newTask.current && !newTask.current.contains(event.target) ){
            setAddTask(false)
          }
        };
        document.addEventListener('mousedown', handleOutsideclick);
      },[])


    return (
        <>

            <div className='grid h-full'>
                {addTask  && <div ref={newTask} className='shadow-lg shadow-zinc-600 border-[1px] border-zinc-400 absolute z-30 w-[30%] h-[35%] bg-white top-1/6  left-[45%] rounded-md'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2 className='ml-[10%] mt-[10%] text-nowrap md:text-[16px] text-[10px] font-medium '>Add Task</h2>
                            <div className='bg-[#F24E1E] h-[1.7px] max-w-[70%] ml-[10%]'></div>
                        </div>
                        <div>
                            <Link onClick={() => {
                                reset()
                                setAddTask(false)
                            }} className='hover:text-[#F24E1E] mr-[8px] mt-[10%] text-nowrap md:text-[16px] text-[10px] text-center'>Go Back</Link>
                            <div className='bg-black h-[1.5px] mr-[10%]'></div>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(addNewTask)}>
                            <h2 className='ml-[2%] mb-[2%] mt-[4%] md:text-[15px] text-[8px] font-medium'>Title</h2>
                            <Input
                                className="lg:w-66 xl:w-66 w-20 md:w-48 sm:w-40 border-2 border-yellow-500 ml-[2%] rounded-md mb-[2%] inline-block"
                                placeholder="Enter Title"
                                {...register('task', {
                                    required: "Title Required"
                                })}
                            />
                            <h2 className='ml-[2%] md:text-[15px] text-[8px] font-medium mt-[1%] mb-[2%]'>
                                Status
                            </h2>
                            <div className='flex ml-[2%] mt-[1%] items-center gap-2.5'>
                                <h2 className='md:text-[15px] text-[8px] font-normal'>
                                    Started
                                </h2>
                                <Input
                                    className=" border-2 border-yellow-500 inline-block ml-[2%]"
                                    type="radio"
                                    value={"started"}
                                    option
                                    {...register('status')}
                                />
                                <h2 className='md:text-[15px] text-[8px] font-normal'>
                                    Not Started
                                </h2>
                                <Input
                                    className=" border-2 border-yellow-500 inline-block ml-[2%]"
                                    type="radio"
                                    value={"not started"}
                                    option
                                    {...register('status')}
                                />
                            </div>
                            <Button
                                type='submit'
                                text="Add"
                                className='text-white md:w-16 lg:w-18 sm:w-13 sm:h-5 md:h-7 lg:h-8 button w-10 h-4 text-center rounded-xs xl:text-[16px] lg:text-[16px] md:text-[12px] text-[10px] ml-[2%] mt-[8%]'
                            />
                            <Button
                                onClick={() => {
                                    reset()
                                    setAddTask(false)
                                }}
                                text="Cancel"
                                className='text-white md:w-16 lg:w-18 sm:w-13 sm:h-5 md:h-7 lg:h-8 button w-10 h-4 text-center rounded-xs xl:text-[16px] lg:text-[16px] md:text-[12px] text-[10px] ml-[2%] mt-[8%]'
                            />
                        </form>
                    </div>
                </div>
                }
                <div className='grid grid-cols-2 grid-rows-2 border-[1px] rounded-md border-zinc-400 h-11/12 w-11/12 mt-11 md:gap-8 gap-4'>
                    <div className='row-span-2 h-11/12 mt-6 xl:ml-4 rounded-md shadow-lg shadow-zinc-700'>
                        <div className='h-1/12 flex items-center justify-between'>
                            <div className='md:ml-6 sm:ml-2 flex items-center ml-0.5'>
                                <img src="/started.png" alt="img" className='md:h-7 sm:h-5 h-3 box-border inline-block' />
                                <p className='inline-block font-semibold text-[#F0441E] md:text-[14px] ml-1 text-[5px] sm:text-[7px]'>To-Do</p>
                            </div>
                            <div className='md:mr-6 sm:mr-2 mr-0.5 flex items-center'>
                                <img src="/add.svg" alt="img" className='inline-block box-border md:w-4 md:h-4 w-2 h-2 sm:w-3 sm:h-3' />
                                <Link onClick={() => setAddTask(true)} className='inline-block md:text-[14px] ml-1 font-semibold text-zinc-500 text-[5px] sm:text-[7px]' >Add Todo</Link>
                            </div>
                        </div>
                        <ul className='xl:my-2 overflow-auto box-border tasks'>
                            {
                                StartedTodos.map((todo) => {
                                    return (<StartedTaskCard id={todo.id} key={todo.id} text={todo.text} status={todo.status} createdAt={new Date(todo.createdAt).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}></StartedTaskCard>)
                                })
                            }

                        </ul>
                    </div>
                    <div className='mt-6 xl:mr-4 rounded-md shadow-lg shadow-zinc-700 md:h-[264px] h-[270px] box-border'>
                        <div className='h-[12%] box-border flex items-center'>
                            <img src="/pending.svg" alt="img" className='ml-2 mt-1' />
                            <p className='inline-block font-semibold text-[#F0441E] md:text-[12px] ml-1 text-[4px] sm:text-[6px]'>Not Started</p>
                        </div>
                        <ul className='box-border overflow-auto md:my-2 h-[85%]'>
                            {
                                NOtStartedTodos.map((todo) => {
                                    return (<NotStartedTaskCard id={todo.id} key={todo.id} text={todo.text} status={todo.status} createdAt={new Date(todo.createdAt).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}></NotStartedTaskCard>)
                                })
                            }
                        </ul>
                    </div>
                    <div className=' mb-2 xl:mr-4 rounded-md shadow-lg shadow-zinc-700 md:h-[264px] h-[272px]'>
                        <div className='h-[12%] box-border flex items-center'>
                            <img src="/completed.png" alt="img" className='ml-2 h-[17px]' />
                            <p className='inline-block font-semibold text-[#F0441E] md:text-[12px] ml-2 text-[4px] sm:text-[6px]'>Completed</p>
                        </div>
                        <ul className='box-border overflow-auto md:my-2 h-[85%]'>
                            {
                                CompletedTodos.map((todo) => {
                                    return (<TaskCard id={todo.id} key={todo.id} text={todo.text} status={todo.status} createdAt={new Date(todo.createdAt).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}></TaskCard>)
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard