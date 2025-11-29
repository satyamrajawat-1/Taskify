import { useState, useEffect } from 'react'
import './App.css'
import { api } from './lib/api';
import { useSelector, useDispatch } from 'react-redux';
import { login as authLogin } from './app/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { Header, Layout } from './components';
import {LeftSection , Dashboard} from './components';
function App() {
  const dispatch = useDispatch()
  const [loading , setLoading] = useState(true)
  useEffect(() => {
    api.get('/api/v1/user/check-auth',{withCredentials:true})
    .then((res)=>{
      console.log(res)
      dispatch(authLogin(res.data.data.user))
      
    })
    .catch((error)=>{
      console.log(error)
      
    })
    .finally(()=>setLoading(false))
  }, [])
  const status = useSelector((state)=>state.auth.status)
  if(loading) return (<p>....loading</p>)

  return status?
   (
    <Layout/>
  ):<Navigate to="/login" replace />
}

export default App
