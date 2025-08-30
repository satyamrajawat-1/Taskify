import React from 'react'
import Input from '../Input'
import Button from '../Button'
import { useForm } from 'react-hook-form'

function Header() {
    const { register, handleSubmit } = useForm()
    return (
        <div className='w-full'>
            <header className='flex justify-between xl:h-15 items-center shadow-lg shadow-zinc-600 header'>
                <div className=' xl:ml-15 sm:ml-10 ml-5 md:w-15 md:h-15 w-10 h-10 '>
                    <img src="/logo.png" alt="" />
                </div>
                <div className=' rounded-md w-2/5 searchBox xl:shadow-2xl shadow-gray-600 xl:ml-8'>
                    <form
                        onSubmit={handleSubmit()}
                    >
                        <div className='flex justify-between items-center xl:font-semibold w-full '>
                            <Input
                                placeholder='Search your task here ....'
                                type='text'
                                className='sm:ml-3 ml-1 text-center  w-full'
                                {...register('task')}
                            >
                            </Input>
                            <button
                                type='submit'
                                className='search flex justify-center items-center sm:w-10 sm:h-8 rounded-sm hover:cursor-pointer w-6 h-4'
                            >
                                <img src="/search.svg" alt="" />
                            </button>
                        </div>
                    </form>
                </div>
                <div className='xl:mr-25 flex flex-col date sm:mr-10 mr-5'>
                    <div className='text-black font-semibold'>
                    {
                    new Date().toLocaleDateString('en-US', { weekday: 'long' })
                    }
                    </div>
                    <div className='text-sky-400 font-semibold'>
                    {
                        new Date().toLocaleDateString()
                    }
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header