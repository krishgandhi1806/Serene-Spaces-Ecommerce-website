import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import SignUp from './Pages/SignUp'


function App() {

  return (
    <div className="bg-gray-50">
      <Toaster/>
      <NavBar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
       </Routes>
    </div>
  )
}

export default App
