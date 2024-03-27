import React from "react";

const Head = () => {
  return (
    <>
      <section className='bg-transparent py-8'>
        <div className='px-10 flex items-center'>
          <div className='justify-start'>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-white font-bold leading-7">MENTARI SEHAT INDONESIA</h1>
            <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold">KAB. KARANGANYAR</span>
          </div>
          <div className='flex justify-end max-sm:hidden ml-auto'>
            <a href="https://www.instagram.com/_msi_karanganyar?igsh=MXN1MHM0enR6eTJydg==" target="_blank" rel="noopener noreferrer" className="mr-2">
              <i className='fa fa-instagram icon w-10 h-10 flex justify-center items-center rounded-full text-white bg-green-500 transition duration-500 hover:bg-teal-600' style={{ filter: "brightness(1.5)" }}></i>
            </a>
            <a href="https://www.tiktok.com/@msi.karanganyar?_t=8kf8aJTji1B&_r=1" target="_blank" rel="noopener noreferrer" className="mr-2">
              <i className='fab fa-tiktok icon w-10 h-10 flex justify-center items-center rounded-full text-white bg-green-500 transition duration-500 hover:bg-teal-600' style={{ filter: "brightness(1.5)" }}></i>
            </a>
            <a href="https://www.youtube.com/@msikab.karanganyar6795?si=9Qt2hFKiZiVqcgJD" target="_blank" rel="noopener noreferrer">
              <i className='fab fa-youtube icon w-10 h-10 flex justify-center items-center rounded-full text-white bg-green-500 transition duration-500 hover:bg-teal-600' style={{ filter: "brightness(1.5)" }}></i>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head;