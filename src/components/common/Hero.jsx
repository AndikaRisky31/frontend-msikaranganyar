import React from "react";
import { Carousel } from "flowbite-react";
import { ListBg } from "../../dummydata";

const Hero = ({ title, narasi }) => {
  return (
    <>
      <section className="overflow-hidden h-[70vh]">
      <Carousel slideInterval={2000} className="absolute top-0 z[-1]">
        {ListBg.map((item, index) => (
          <div key={index} className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img src={item.nama} alt={`Image ${index}`} className="w-full h-full object-cover brightness-70" />
          </div>
        ))}
      </Carousel>
        <div className="relative mx-auto sm:ml-12 w-4/6 mt-[20%] sm:mt-[5%]">
            <h3 className="text-base font-semibold tracking-wide uppercase text-white md:text-xl lg:text-2xl xl:text-3xl">
              WELCOME TO
            </h3>
            <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-semibold mt-5 mb-2 capitalize">
              {title}
            </h1>
            <h3 className="text-xl font-semibold tracking-wide uppercase pt-2 text-white  sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              Kab. Karanganyar
            </h3>
          <p className="w-[4/5] text-justify mt-4 text-base text-white hidden sm:block sm:text-lg md:text-xl lg:text-lg xl:text-xl">
            {narasi}
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;