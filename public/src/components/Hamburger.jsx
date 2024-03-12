import React from 'react'

function Hamburger({isOpen}) {
  return (
    !isOpen?( <div className="w-[2rem] h-[2rem] flex justify-around flex-col">
      <div className="w-[2rem] h-[.25rem] rounded-[10px] bg-black"></div>
      <div className="w-[2rem] h-[.25rem] rounded-[10px] bg-black"></div>
      <div className="w-[2rem] h-[.25rem] rounded-[10px] bg-black"></div>
    </div>):(
        <div className="w-[2rem] h-[2rem] mt-[1rem] mb-[1rem] flex justify-around flex-col">
        <div className="w-[2rem] h-[.25rem] rounded-[10px] bg-black rotate-[45deg]"></div>
        <div className="w-[2rem] h-[.25rem] rounded-[10px] bg-black translate-x-[100%] opacity-0"></div>
        <div className="w-[2rem] h-[.25rem] rounded-[10px] bg-black rotate-[-45deg] translate-y-[-1.3rem]"></div>
      </div>
    )
  )
}

export default Hamburger
