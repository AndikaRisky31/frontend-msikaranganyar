import React from "react";
import Heading from "../common/heading/Heading";

const AboutCard = ({data}) => {
  return (
    <>
      <section>
          <div className="flex flex-col md:flex-row justify-between items-stretch">
            <div className="flex-1 px-5">
                {data.map((val) => (
                  <div key={val.id} className="item flex items-top justify-between mb-5 bg-white p-4 transition duration-500 ease-in-out hover:bg-teal-500 hover:text-white hover:shadow-lg">
                    <img src={val.cover} alt="" className="w-16 h-16" />
                    <div className="text ml-4">
                      <h2 className="text-lg font-semibold">{val.title}</h2>
                      <p className="text-gray-600">{val.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex-1 max-sm:hidden">
              <img src="./images/ab.webp" alt="" className="object-cover w-full h-full object-right-bottom" />
            </div>
          </div>
      </section>
    </>
  );
};

export default AboutCard;