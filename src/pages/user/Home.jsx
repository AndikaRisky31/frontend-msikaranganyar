import React from "react"
import AboutCard from "../../components/card/AboutCard"
import Hblog from "../../components/home/Hblog"
import { homeAbout } from "../../dummydata"
import HVacancy from "../../components/home/HVacancy"
import DataPasien from "../../components/card/DataPasienCard"
import Faq from "../../components/item/Faq"
import Testimonal from "../../components/card/TestimonalCard"
import Hero from "../../components/common/Hero"

const Home = () => {
  return (
    <>
    <div className="">
      <Hero title="SSR Mentari Sehat Indonesia" narasi="Bersama Kami, Eliminasi TBC Sebelum 2030! Bergabunglah dengan Komunitas Karanganyar dan Yayasan Mentari Sehat Indonesia, Ayo Wujudkan Indonesia Bebas TBC pada 2030." />
      <div className="text-center pb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 text-black">VISI DAN MISI</h1>
        <h3 className="font-semibold tracking-wide uppercase text-teal-500">Pelopor Perubahan Menuju Indonesia Bebas TBC Tahun 2030 di Karanganyar</h3>
      </div>
      <AboutCard data={homeAbout}/>
      <Testimonal />
      <DataPasien/>
      <Hblog />
      <HVacancy />
      <Faq/>
    </div>
    </>
  )
}

export default Home
