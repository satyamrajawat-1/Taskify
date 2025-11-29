import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Button } from './index.js';
import { updateTodo, deleteTodo, toggleStatus } from '../app/todoSlice.js'
import { api } from '../lib/api.js';
export default function TaskCard({ text = "", status = "", createdAt = "" ,id=""}) {
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
        api.post(`/api/v1/todo/delete-todo/${id}`)
    }
    return (
        <li className='border-[1.5px] border-zinc-400 max-h-20 text-ellipsis overflow-auto min-h-10 w-11/12 mx-auto my-6 text-center md:rounded-md rounded-sm relative ' id={id}>
            <div ref={boxRef}>
                <button className='absolute right-1 font-semibold -top-3 cursor-pointer'
                    onClick={
                        (e) => toggleHidden(e)
                    }>...</button>
                {isVisible && <div id='box' className='flex  flex-col sm:w-29 md:w-30 top-2 sm:rounded-md rounded-sm justify-around absolute right-5 items-center h-10 min-w-25 md:shadow-md shadow-lg shadow-zinc-400'>
                    <div className='flex items-center justify-evenly gap-2'>
                    <Button text='Delete' className='bg-red-500 text-white min-w-8 sm:w-10 rounded-sm inline-block text-[10px]' onClick={
                        (e) => {
                            deleteTask(id)
                        }
                    }></Button>
                    </div>
                </div>}
            </div>
            {text}
            <div className='flex sm:flex-row flex-col justify-around items-center mt-3'>
                <h3 className='text-xs'>status : <p className='text-blue-500 inline-block'>{status}</p></h3>
                <h3 className='text-xs'>created at : <p className='inline-block text-red-500'>{createdAt}</p></h3>
            </div>
        </li>
    )
}
