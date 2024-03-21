import React from "react"

const Hero = () => {
  return (
    <>
    <section className="z-[-1] top-0 left-0 h-screen bg-cover bg-fixed bg-no-repeat bg-center text-white absolute pr-4 md:pr-52 pt-[30%] md:pt-[20%]" style={{ backgroundImage: "url('/images/bg.webp')"}}>
        <div className='px-10 w-full md:w-4/6 md:pt-24'>
            <div className="">
              <h3 className="font-semibold tracking-wide uppercase text-white">WELCOME TO</h3>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 capitalize">SSR Mentari Sehat Indonesia</h1>
            </div>
            <h3 className="font-semibold tracking-wide uppercase text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              Kab. Karanganyar
            </h3>
            <p className="text-justify text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">
              Bersama Kami, Eliminasi TBC Sebelum 2030! Bergabunglah dengan Komunitas Jawa Tengah dan Yayasan Mentari Sehat Indonesia, Ayo Wujudkan Indonesia Bebas TBC pada 2030.
            </p>
        </div>
      </section>
      <div className='min-[10px]:mt-[70%] md:mt-[45%] lg:mt-[40%]'></div>
    </>
  )
}

export default Hero
