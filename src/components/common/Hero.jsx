import React from "react";
import { Carousel } from "@material-tailwind/react";

const Hero = ({ title, narasi }) => {
  return (
    <>
      <section className="overflow-hidden h-[65vh]">
      <Carousel transition={{ duration: 1 }} className="absolute top-0  overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
        <div className="absolute mx-10 px-10 w-full md:w-4/6 lg:pt-10">
          <div className="mt-[20%] sm:mt-[8%]">
            <h3 className="text-base font-semibold tracking-wide uppercase text-white md:text-xl lg:text-2xl xl:text-3xl">
              WELCOME TO
            </h3>
            <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-semibold mt-5 mb-2 capitalize">
              {title}
            </h1>
            <h3 className="text-xl font-semibold tracking-wide uppercase pt-2 text-white  sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              Kab. Karanganyar
            </h3>
          </div>
          <p className="w-[4/5] text-justify mt-4 text-base text-white hidden sm:block sm:text-lg md:text-xl lg:text-lg xl:text-xl">
            {narasi}
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;