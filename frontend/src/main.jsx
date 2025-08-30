import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store.js';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import {Dashboard , ChangePassword , UpdateProfile,} from './components';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      
      <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="update-profile" element={<UpdateProfile />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  
);
