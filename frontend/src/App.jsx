import React, { useState, useEffect } from "react";

import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Adminlogin from './pages/Adminlogin';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from './pages/AdminDashboard';
import AddCategory from './pages/AddCategory';




function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
  const adminStatus = localStorage.getItem("isAdmin");
  if (adminStatus === "true") {
    setIsAdmin(true);
  }
}, []);
const [categories, setCategories] = useState([]);
  
  return (

    <>
    <Header/>
    <ToastContainer position="top-right" autoClose={2000}/>
   <Routes>
  
 <Route 
  path="/admin/login" 
  element={<Adminlogin setIsAdmin={setIsAdmin} />} 
/>
  <Route 
  path="/admin/dashboard" 
  element={<AdminDashboard isAdmin={isAdmin} />} 
/>
   <Route path="/admin/category_add" element={<AddCategory/>}/>
</Routes>
      
    </>
  )
}

export default App
