import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import axios from 'axios'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate , Link} from 'react-router-dom'
function ChangePassword() {
    const navigate = useNavigate()
    
    const [error, setError] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()
        const fullname = useSelector((state)=>state.auth.userData.fullname)
        const email = useSelector((state)=>state.auth.userData.email)
        const avatar = useSelector((state)=>state.auth.userData.avatar)
    const update = async (data) => {
        axios.post('/api/v1/user/update-password', data)
            .then((res) => {
                console.log(res)
                navigate('/dashboard')
            })
            .catch((error) => {
                if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT" || error.code === "ENOTFOUND") {
                    setError("Server is taking too long to respond. Please try again.");
                } else if (error.response) {
                    setError(error.response.data?.message || "Invalid credentials.");
                } else {
                    setError("Something went wrong. Please try again.");
                }
            })
    }
    return (
        <div className='grid h-full'>
            <div className='border-[1px] border-black h-[93%] w-11/12 mt-12 rounded-md'>
            <div className=' h-[93%] w-11/12 mt-8'>
                <div className='flex justify-between  mt-4'>
                    <div className=' md:text-[20px] text-xs md:font-semibold font-medium ml-5.5'>
                        <h2>Change Password</h2>
                        <div className='bg-[#F24E1E] h-[1.7px] max-w-[52%] mt-1'></div>
                    </div>
                    <div className='md:text-[16px] text-[10px] text-center pt-2 mr-4.5'>
                        <Link to='/dashboard' className='hover:text-[#F24E1E]'>Go Back</Link>
                        <div className='bg-black h-[1.5px]'></div>
                    </div>
                </div>
                <div className='flex gap-1 mt-6 pl-4'>
                    <div className='md:h-20 md:w-20 h-15 w-15 box-border rounded-full object-cover flex items-center justify-center overflow-hidden'><img src={avatar} alt="" className='xl:h-20 xl:w-20  md:h-15 md:w-15 lg:h-20 lg:w-20 sm:w-10 sm:h-10 w-5 h-5 items-center rounded-full md:border-2 border-white border object-cover bg-white' /></div>
                    <div className='flex flex-col justify-center'>
                        <div className='md:font-semibold font-medium'>{fullname}</div>
                        <p className="md:text-[14px] sm:text-[10px] text-[8px]  w-[99%] flex flex-wrap">{email}</p>
                    </div>
                </div>
                <div className='flex justify-baseline ml-6 h-[68%] mt-5'>
                    <div className='box-border border-[1px] rounded-md border-zinc-700 w-[95%] shadow-lg shadow-zinc-600'>
                        <form onSubmit={handleSubmit(update)}>
                            <div className='xl:w-md sm:text-sm xl:text-lg lg:h-1/3 lg:w-90 sm:ml-7 ml-4 mt-6'>
                                <h3 className='sm:font-semibold font-medium sm:text-[16px] text-[14px]'>Old Password</h3>
                                <div className='flex items-center my-2 border-1 border-gray-700 sm:pl-4 pl-1 md:h-8 rounded-sm   sm:focus-within:shadow-lg sm:focus-within:shadow-gray-700 focus-within:shadow-lg focus-within:shadow-gray-500 lg:w-100 w-30 md:w-80 sm:w-60'>
                                    <Input
                                        className="lg:w-66 xl:w-66 w-20 md:48 sm:w-40"
                                        {...register('oldPassword', {
                                            required: "Password Required"
                                        })}
                                    />
                                </div>
                                {errors.oldPassword && (
                                    <div className="flex items-center text-red-500 text-xs md:text-sm mb-2 lg:w-80 w-25 md:w-60 sm:w-50">
                                        {errors.oldPassword.message}
                                    </div>
                                )}
                                <h3 className='sm:font-semibold font-medium sm:text-[16px] text-[14px]'>New Password</h3>
                                <div className='flex items-center my-2 border-1 border-gray-700 sm:pl-4 pl-1 md:h-8 rounded-sm   sm:focus-within:shadow-lg sm:focus-within:shadow-gray-700 focus-within:shadow-lg focus-within:shadow-gray-500 lg:w-100  md:w-80 sm:w-60 w-30'>
                                    <Input
                                        className="lg:w-66 xl:w-66 w-20 md:48 sm:w-40"
                                        {...register('newPassword', {
                                            required: "Password Required"
                                        })}
                                    />
                                </div>
                                {errors.newPassword && (
                                    <div className="flex items-center text-red-500 text-xs md:text-sm mb-2 lg:w-80 w-25 md:w-60 sm:w-50">
                                        {errors.newPassword.message}
                                    </div>
                                )}
                            </div>

                            <Button
                                type='submit'
                                text="Update"
                                className='text-white md:w-19 lg:w-25 sm:w-16 sm:h-6 md:h-8 lg:h-10 button w-12 h-6 text-center rounded-xs xl:text-lg lg:text-lg md:text-sm text-xs sm:ml-7 ml-5 md:mt-12 mt-4 '
                            />
                            <Button
                                onClick={() => navigate('/dashboard')}
                                text="Cancel"
                                className='text-white md:w-19 lg:w-25 sm:w-16 sm:h-6 md:h-8 lg:h-10 button w-12 h-6 text-center rounded-xs xl:text-lg lg:text-lg md:text-sm text-xs xl:ml-2 md:ml-2 ml-2 lg:mt-12 md:mt-4'
                            />
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ChangePassword