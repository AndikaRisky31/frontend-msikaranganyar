import React from "react";
import Back from "../../components/common/back/Back";
import AboutCard from "../../components/card/AboutCard";
import { homeAbout } from "../../dummydata";
import DataPasien from "../../components/card/DataPasienCard";

const About = () => {
  console.log(homeAbout);
  return (
    <>
    <section className="items-center">
      <Back title='Tentang Kami' narasi="Merupakan sebuah komunitas di Indonesia yang berfokus pada pemberdayaan dalam bidang kesehatan, sosial, dan pendidikan. Saat ini, fokusnya adalah program Penanggulangan TBC di Kabupaten Karanganyar melalui SSR Mentari Sehat Indonesia (MSI) Karanganyar untuk periode 2024-2026." />
      <div className="text-center pb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 text-black">VISI DAN MISI</h1>
        <h3 className="font-semibold tracking-wide uppercase  text-teal-500">Pelopor Perubahan Menuju Indonesia Bebas TBC Tahun 2030 di Karanganyar</h3>
      </div>
      <AboutCard data={homeAbout}/>
      <DataPasien/>
      </section>
    </>
  );
};
export default About;