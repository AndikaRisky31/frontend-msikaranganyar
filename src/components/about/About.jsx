import React from "react";
import Back from "../common/back/Back";
import AboutCard from "./AboutCard";
import { homeAbout } from "../../dummydata";
import Heading from "../common/heading/Heading";
import DataPasien from "./DataPasien";

const About = () => {
  console.log(homeAbout);
  return (
    <>
    <section className="mt-5 max-sm:pt-[75%] max-lg:pt-[10%] items-center">
      <Back title='About Us' />
      <Heading subtitle="Pelopor Perubahan Menuju Indonesia Bebas TBC Tahun 2030 di Karanganyar" title="VISI DAN MISI" link="/about" />
      <AboutCard data={homeAbout}/>
      <DataPasien/>
      </section>
    </>
  );
};
export default About;