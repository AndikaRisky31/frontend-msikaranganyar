import React from "react";
import { testimonal } from "../../../dummydata";
import Heading from "../../common/heading/Heading";

const Testimonal = () => {
  return (
    <>
      <section className="m-auto max-w-[85%]">
          <Heading subtitle="TESTIMONIAL" title="Cerita Inspiratif Pasien TBC" />
          <div className="flex overflow-x-auto snap-mandatory snap-x h-[400px]">
            {testimonal.map((val) => (
              <div key={val.id} className="snap-start m-4 shadow-md p-4 flex-shrink-0 w-[350px]">
                <div className="relative flex items-center">
                  <img src={val.cover} alt="" className="w-24 h-24 rounded-full object-cover" />
                  <i className="fa fa-quote-left absolute bottom-0 left-4 bg-teal-500 text-white p-2 rounded-full"></i>
                  <div className="ml-4">
                    <h2 className="text-lg font-bold">{val.name}</h2>
                    <span className="text-teal-500">{val.post}</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-500 text-justify">{val.desc}</p>
              </div>                                
            ))}
          </div>
      </section>
    </>
  );
};

export default Testimonal;