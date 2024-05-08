import React from "react";
import { Carousel } from "flowbite-react";
import { ListBg } from "../../../dummydata";

const Back = ({ title, narasi }) => {
  return (
    <section className="h-[70vh] static overflow-hidden">
      <Carousel slideInterval={3000} className="absolute top-0 z-[-1]">
        {ListBg.map((item, index) => (
          <div key={index} className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
            <img src={item.nama} alt={`Image ${index}`} className="w-full h-full object-cover brightness-75" />
          </div>
        ))}
      </Carousel>
      <div className="absolute inset-0 flex items-center justify-center sm:mt-16 ">
        <div className="w-2/3 text-center">
          <h1 className="text-4xl xl:text-5xl text-white font-semibold mt-5 mb-2 capitalize">{title}</h1>
          <p className="w-[4/5] hidden sm:block text-justify mt-4 text-base text-white sm:text-lg md:text-xl lg:text-lg xl:text-xl">{narasi}</p>
        </div>
      </div>
    </section>
  );
};

export default Back;