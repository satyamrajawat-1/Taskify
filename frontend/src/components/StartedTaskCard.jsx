import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Button } from './index.js';
import { updateTodo, deleteTodo, toggleStatus } from '../app/todoSlice.js'
import axios from 'axios';
function StartedTaskCard({ text = "", status = "started", createdAt = "", id = "" }) {
  const dispatch = useDispatch()
  console.log("id is :", id)
  const [isVisible, setIsVisible] = useState(false);
  const toggleHidden = (e) => {
    e.stopPropagation()
    setIsVisible(prev => !prev);
  };
  const boxRef = useRef(null)
  useEffect(() => {
    const handleOutsideclick = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsVisible(false)
      }
    };
    document.addEventListener('mousedown', handleOutsideclick);
  }, [])
  const deleteTask = (id) => {
    console.log("id is :", id)
    dispatch(deleteTodo({ id }))
    axios.post(`/api/v1/todo/delete-todo/${id}`)
  }
  const completeTask = (id) => {
    console.log("id is :", id)
    dispatch(toggleStatus({ id, status: 'completed' }))
    axios.post(`/api/v1/todo/toggle-todo/${id}`,{status:'completed'})
    console.log('clicked')
  }
  return (
    <li className='flex flex-col justify-between border-[1.5px] border-zinc-400 max-h-50 text-ellipsis overflow-auto min-h-30 w-11/12 mx-auto my-6 text-center relative md:rounded-md rounded-sm' id={id}>
      <div ref={boxRef}>
        <button className='absolute right-1 font-semibold -top-3 cursor-pointer'
          onClick={
            (e) => toggleHidden(e)
          }>...</button>
        {isVisible && <div id='box' className='flex  flex-col sm:w-29 md:w-40 top-2 sm:rounded-md rounded-sm justify-around absolute right-5 items-center h-20 min-w-19 md:shadow-md shadow-lg shadow-zinc-400'>
          <Button text='Delete' className='bg-red-500 text-white min-w-10 sm:w-14 rounded-sm' onClick={
            (e) => {
              deleteTask(id)
            }
          }></Button>
          <Button text='completed' className='bg-blue-500 text-white  min-w-10 sm:w-22 rounded-sm' onClick={
            (e) => {
              completeTask(id)
            }
          }>
          </Button>
        </div>}
      </div>
      <div className='mt-5'>{text}</div>
      <div className='flex sm:flex-row flex-col justify-around items-centre mt-3 text-xs '>
        <h3 className=''>status : <p className='text-blue-500 inline-block '>{status}</p></h3>
        <h3 className=''>created at : <p className='inline-block text-red-500'>{createdAt}</p></h3>
      </div>
    </li>
  )
}

export default StartedTaskCard