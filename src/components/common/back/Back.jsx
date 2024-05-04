import React from "react"

const Back = ({ title,narasi }) => {
  return (
    <>
      <section className="z-[-1] w-full top-0 left-0 h-screen bg-cover bg-fixed bg-no-repeat bg-center text-white absolute pt-[20%]" style={{ 
      backgroundImage: "url('/images/bg2.webp')"}}>
        <div className="text-white text-center pt-[45%] sm:pt-[25%] md:pt-[15%] lg:pt-[10%]">
          <h1 className="font-normal text-4xl md:text-5xl lg:text-7xl w-full text-center">{title}</h1>
          <p className="mx-5 mt-5 sm:w-2/3 text-start sm:mx-auto text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">{narasi}</p>
        </div>
      </section>
      <div className='mt-[80%] sm:mt-[55%] md:mt-[50%] lg:mt-[40%]'></div>
    </>
  )
}

export default Back
