import React from "react";
import Back from "../../components/common/back/Back";
import AboutCard from "../../components/card/AboutCard";
import { homeAbout } from "../../dummydata";
import Heading from "../../components/common/heading/Heading";
import DataPasien from "../../components/card/DataPasienCard";

const About = () => {
  console.log(homeAbout);
  return (
    <>
    <section className="mt-5 pt-[75%] sm:pt-[10%] items-center">
      <Back title='About Us' />
      <Heading subtitle="Pelopor Perubahan Menuju Indonesia Bebas TBC Tahun 2030 di Karanganyar" title="VISI DAN MISI" link="/about" />
      <AboutCard data={homeAbout}/>
      <DataPasien/>
      </section>
    </>
  );
};
export default About;