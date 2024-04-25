import React from "react"

const Back = ({ title }) => {
  return (
    <>
      <section className="z-[-1] w-full top-0 left-0 h-screen bg-cover bg-fixed bg-no-repeat bg-center text-white absolute pt-[20%]" style={{ 
      backgroundImage: "url('/images/bg2.webp')"}}>
        <div className="text-white text-center pt-[45%] sm:pt-[25%] md:pt-[15%] lg:pt-[10%]">
          <h1 className="font-normal text-7xl sm:text-[80px] lg:text-[100px] w-full text-center">{title}</h1>
        </div>
      </section>
      <div className='mt-[80%] sm:mt-[55%] md:mt-[50%] lg:mt-[40%]'></div>
    </>
  )
}

export default Back
