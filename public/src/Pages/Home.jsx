import React from 'react'
import NavBar from '../components/NavBar'
import background from "../assets/background.png"
import cupimage from "../assets/cupimage.png"

function Home() {
  return (
    <div className="md:w-[78.95rem] m-auto">
        <div className="p-[4rem] flex flex-col items-center md:items-start pt-[20rem] bg-cover bg-center m-auto md:h-[48.5rem]" style={{background: `url(${background})`}} >
            <div className="text-white font-monsterrat " >
              <div className="text-[16px]">Summer Sale ON!</div>
              <div className="text-[4rem] font-[700]">30% Discount</div>
              <div className="text-[1rem] ">Redefine your home with our new range of Home decor products!</div>
              <button className="mt-[2rem] border-[0.1rem] rounded-3xl p-[.7rem] pl-[2rem] pr-[2rem]">Shop Now</button>
            </div>
        </div>
    </div>
  )
}

export default Home
