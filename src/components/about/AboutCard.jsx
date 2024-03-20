import React from "react";
import Heading from "../common/heading/Heading";
import { homeAbout } from "../../dummydata";
import DataPasien from "./DataPasien";

const AboutCard = () => {
  return (
    <>
      <section className="px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="order-1 lg:order-1">
            <img src="./images/about.webp" alt="" className="object-cover w-auto h-full  lg:w-max-1/2" />
          </div>
          <div className="order-2 lg:order-2 lg:ml-5">
            <Heading subtitle="Pelopor Perubahan Menuju Indonesia Bebas TBC Tahun 2030 di Karanganyar" title="VISI DAN MISI" />
            <div className="mt-5">
              {homeAbout.map((val) => (
                <div key={val.id} className="item flex items-center justify-between bg-white mb-5 p-4 transition duration-500 ease-in-out hover:bg-teal-500 hover:text-white hover:shadow-lg">
                  <img src={val.cover} alt="" className="w-16 h-16" />
                  <div className="text ml-4">
                    <h2 className="text-lg font-semibold">{val.title}</h2>
                    <p className="text-gray-600">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <DataPasien />
    </>
  );
};

export default AboutCard;