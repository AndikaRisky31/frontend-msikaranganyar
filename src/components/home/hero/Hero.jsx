import React from "react"

const Hero = () => {
  return (
    <>
    <section className="z-[-1] top-0 left-0 h-screen bg-cover bg-fixed bg-no-repeat bg-center text-white absolute pt-[20%]" style={{ 
      backgroundImage: "url('/images/bgnofull.webp')"}}>
        <div className='px-10 w-full md:w-4/6 lg:pt-10'>
            <div className="max-sm:pt-[40%]">
              <h3 className=" font-semibold tracking-wide uppercase text-white md:text-xl lg:text-2xl xl:text-3xl">WELCOME TO</h3>
              <h1 className="  text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mt-5 mb-2 capitalize">SSR Mentari Sehat Indonesia</h1>
              <h3 className="font-semibold tracking-wide uppercase pt-2 text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                Kab. Karanganyar
              </h3>
            </div>
            <p className=" max-sm:w-[4/5] text-justify mt-4 text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">
              Bersama Kami, Eliminasi TBC Sebelum 2030! Bergabunglah dengan Komunitas Karanganyar dan Yayasan Mentari Sehat Indonesia, Ayo Wujudkan Indonesia Bebas TBC pada 2030.
            </p>
        </div>
      </section>
      <div className='min-[10px]:mt-[70%] md:mt-[45%] lg:mt-[40%]'></div>
    </>
  )
}

export default Hero
