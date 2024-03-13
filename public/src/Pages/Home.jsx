import React from 'react'
import NavBar from '../components/NavBar'
import background from "../assets/background.png"
import cupimage from "../assets/cupimage.png"

function Home() {
  return (
    <div className="bg-cover bg-center h-full" style={{background: `url(${background})`}}>
        <NavBar/>
        <div className="pt-[20rem]" >
            <div>Summer Sale ON!</div>
            <div>30% Discount</div>
            <div>Redefine your home with our new range of Home decor products!</div>
            <button>Shop Now</button>
        </div>
        {/* <img  src={background} alt="image" /> */}
    </div>
  )
}

export default Home
