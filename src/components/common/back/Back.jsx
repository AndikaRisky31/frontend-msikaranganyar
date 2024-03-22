import React from "react"
import { useLocation } from "react-router-dom"

const Back = ({ title }) => {
  return (
    <>
      <section className="z-[-1] w-full top-0 left-0 h-screen bg-cover bg-fixed bg-no-repeat bg-center text-white absolute pt-[20%]" style={{ 
      backgroundImage: "url('/images/bg2.webp')"}}>
        <div className="text-white text-center max-sm:pt-[45%] sm:pt-[25%] md:pt-[15%] lg:pt-[10%]">
          <h1 className="font-normal max-sm:text-7xl sm:text-[80px] lg:text-[100px] w-full text-center">{title}</h1>
        </div>
      </section>
      <div className='min-[10px]:mt-[70%] md:mt-[45%] lg:mt-[40%]'></div>
    </>
  )
}

export default Back
