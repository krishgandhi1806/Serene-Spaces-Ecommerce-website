import React from 'react'
import Logo from "../assets/Logo.png"
function NavBar() {
  return (
    <div>
      <div className="bg-[#956123] h-[3rem] rounded-b-[11px] drop-shadow-md flex justify-between">
        <img className="w-[6rem] h-[3rem] p-2" src={Logo} alt="" />
        <div>
            <button className="bg-[#D9D9D9] pl-[28px] pr-[28px] pt-[10px] pb-[10px] text-[16px] rounded-[10px] font-[PT SERIF]">LOG IN</button>
            <button>SIGN UP</button>
        </div>
      </div>    
    </div>
  )
}

export default NavBar
