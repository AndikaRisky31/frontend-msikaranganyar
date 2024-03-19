import Heading from "../common/heading/Heading";
import { homeAbout } from "../../dummydata";
import DataPasien from "./DataPasien";

const AboutCard = () => {
  return (
    <>
      <section>
        <div className="flex justify-between px-4 md:px-8 lg:px-12 mb-10">
          <div className="left">
            <img src="./images/about.webp" alt="" className="object-cover h-full w-full"/>
          </div>
          <div className="right flex flex-col justify-between h-full px-10">
            <Heading subtitle="Pelopor Perubahan Menuju Indonesia Bebas TBC Tahun 2030 di Karanganyar" title="VISI DAN MISI" />
            <div>
              {homeAbout.map((val) => {
                return (
                  <div key={val.id} className="item flex items-center justify-between bg-white mt-5 p-4 transition duration-500 ease-in-out hover:bg-teal-500 hover:text-white hover:shadow-lg">
                      <img src={val.cover} alt="" className="w-16 h-16" />
                    <div className="text ml-4">
                      <h2 className="text-lg font-semibold">{val.title}</h2>
                      <p className="text-gray-600">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <DataPasien />
    </>
  );
};

export default AboutCard;
