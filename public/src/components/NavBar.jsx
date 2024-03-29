import React, { useState } from 'react'
import Logo from "../assets/Logo.png"
import Hamburger from './Hamburger'
import { Link, NavLink } from 'react-router-dom';

function NavBar() {
  
  const [hamburgerOpen, setHamburgerOpen]= useState(false);

  const toggleHamburger= ()=>{
    setHamburgerOpen(!hamburgerOpen);
  }

  return (
    <div className="fixed w-[100%]">
      <div className="bg-[#956123] h-[5.125rem] rounded-b-[11px] drop-shadow-md flex justify-between items-center">
        <div className="ml-4 mt-3 flex md:hidden" onClick={toggleHamburger}>
          <Hamburger isOpen={hamburgerOpen}/>
        </div>
        <img className="w-[6.5rem] h-[3rem] p-2" src={Logo} alt="" />
        <div className={`p-[2rem] gap-4 h-[6.5rem] md:flex hidden`}>
            <Navlinks/>
        </div>
        {hamburgerOpen && <div className="p-3 top-0 flex flex-col md:hidden gap-4 bg-white h-screen w-[50vw] pt-[100px] absolute z-[-10]">
            <NavlinksMobile/>
          </div>}
      </div>
      <div className="flex gap-4 items-center justify-center font-ubuntu drop-shadow-lg bg-white top-[0rem] h-[7.2rem] absolute z-[-4] pt-[5.4rem] w-[100%]">
              <div><Link to="/">Home</Link></div>
              <div>About</div>
              <div>Products</div>
              <div>Contact Us</div>
        </div>    
    </div>
  )
}

function Navlinks(){
  return(
    <>
    <button className="bg-[#D9D9D9] flex items-center justify-center pl-[28px] pr-[28px] pt-[5px] pb-[5px] text-[16px] rounded-[10px] font-PTserif text-[#956123]">
      <Link to="/login">LOG IN</Link> </button>
            <button className="border-[#D9D9D9] flex items-center justify-center border-[.1rem] pl-[28px] pr-[28px] pt-[5px] pb-[5px] text-[16px] rounded-[10px] font-PTserif text-[#D9D9D9]"><Link to="/signup">SIGN UP</Link></button>
    </>
  )
}

function NavlinksMobile(){
  return(
    <>
    <button className="bg-[#956123] flex items-center justify-center pl-[28px] pr-[28px] pt-[5px] pb-[5px] text-[16px] rounded-[10px] font-PTserif text-[#D9D9D9]"><Link to="/login">LOG IN</Link></button>
            <button className="border-[#956123] flex items-center justify-center border-[.1rem] pl-[28px] pr-[28px] pt-[5px] pb-[5px] text-[16px] rounded-[10px] font-PTserif text-[#956123]"><Link to="/signup">SIGN UP</Link></button>
    </>
  )
}

export default NavBar
