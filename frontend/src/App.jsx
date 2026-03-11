import { useState } from 'react'

import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Adminlogin from './pages/Adminlogin';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from './pages/AdminDashboard';




function App() {
  
  return (

    <>
    <Header/>
    <ToastContainer position="top-right" autoClose={2000}/>
   <Routes>
  <Route path="/" element={<Adminlogin/>}/>
  <Route path="/admin/login" element={<Adminlogin/>}/>
  <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
</Routes>
      
    </>
  )
}

export default App
