import React, { useState } from 'react'
import toast from 'react-hot-toast';
import validator from "email-validator";
import axios from 'axios';
import { BASE_URL } from '../constants';

function SignUp() {

    const [name, setName]= useState("");
    const [phone, setPhone]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");

    const handleSignup= (e) =>{
        e.preventDefault();
        if(!name || !phone || !email || !password || !confirmPassword){
            toast.error("All Fields are required!");
        }
        if(!validator.validate(email)){
            toast.error("Invalid Email!");
        }
        if(password !== confirmPassword){
            toast.error("Password doesn't match!");
        }
        axios.post(`${BASE_URL}/users/signup`, {
            name,
            phone,
            email,
            password
        }).then((res)=>{
            res.data.
        })
    }

  return (
    <div className="flex items-center gap-8 flex-col justify-center pt-[10rem] h-screen">
        
            <form className="border-[.1rem] flex flex-col gap-8 p-[2rem] rounded-lg bg-white" onSubmit={(e)=> handleSignup(e)}>
            <div className="flex flex-col gap-2 font-ubuntu">
                <div className="text-[1.2rem] text-gray-600">Name:</div>
                <input className="border-[0.1rem] p-[.5rem] rounded-lg" placeholder='Full Name' onChange={(e)=>setName(e.target.value)} type="text" />
            </div>
            <div className="flex flex-col gap-2 font-ubuntu">
                <div className="text-[1.2rem] text-gray-600">Phone:</div>
                <input className="border-[0.1rem] p-[.5rem] rounded-lg" placeholder='phone number' onChange={(e)=>setPhone(e.target.value)} type="tel" />
            </div>
            <div className="flex flex-col gap-2 font-ubuntu">
                <div className="text-[1.2rem] text-gray-600">Email:</div>
                <input className="border-[0.1rem] p-[.5rem] rounded-lg" placeholder='user@example.com' onChange={(e)=>setEmail(e.target.value)} type="text" />
            </div>
            <div className="flex flex-col gap-2 font-ubuntu">
                <div className="text-[1.2rem] text-gray-600">Password:</div>
                <input className="border-[0.1rem] p-[.5rem] rounded-lg" placeholder='password' onChange={(e)=> setPassword(e.target.value)} type="text" />
            </div>
            <div className="flex flex-col gap-2 font-ubuntu">
                <div className="text-[1.2rem] text-gray-600">Confirm Password:</div>
                <input className="border-[0.1rem] p-[.5rem] rounded-lg" placeholder='confirm password' onChange={(e)=> setConfirmPassword(e.target.value)} type="text" />
            </div>
            <button className="bg-[#956123] flex items-center justify-center pl-[28px] pr-[28px] pt-[5px] pb-[5px] text-[16px] rounded-[10px] font-PTserif text-[#D9D9D9]">LOG IN</button>
            </form>
      
    </div>
  )
}

export default SignUp
