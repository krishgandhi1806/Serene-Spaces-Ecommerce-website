import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const navigate= useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('user'))
        {
            navigate("/");
        }
    }, [])

    const handleLogin= async (e)=>{
        e.preventDefault();
        await axios.post(`${BASE_URL}/users/login`, {
            email,  
            password    
        }).then((res)=> {
            localStorage.setItem("user", JSON.stringify(res.data.data));
            navigate("/");
        }).catch((err)=> console.log(err))
    }

  return (  
    <div className="flex items-center gap-8 flex-col justify-center pt-[10rem] h-screen">
        
            <form className="border-[.1rem] flex flex-col gap-8 p-[2rem] rounded-lg bg-white" onSubmit={(e)=> handleLogin(e)}>
            <div className="flex flex-col gap-2 font-ubuntu">
                <div className="text-[1.2rem] text-gray-600">Email:</div>
                <input className="border-[0.1rem] p-[.5rem] rounded-lg" placeholder='user@example.com' onChange={(e)=>setEmail(e.target.value)} type="text" />
            </div>
            <div className="flex flex-col gap-2 font-ubuntu">
                <div className="text-[1.2rem] text-gray-600">Password:</div>
                <input className="border-[0.1rem] p-[.5rem] rounded-lg" placeholder='password' onChange={(e)=> setPassword(e.target.value)} type="text" />
            </div>
            <button className="bg-[#956123] flex items-center justify-center pl-[28px] pr-[28px] pt-[5px] pb-[5px] text-[16px] rounded-[10px] font-PTserif text-[#D9D9D9]">LOG IN</button>
            </form>
      
    </div>
  )
}

export default Login
