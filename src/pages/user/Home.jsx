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
    <div className="pt-[75%] sm:pt-[10%]">
      <Hero title="SSR Mentari Sehat Indonesia" narasi="Bersama Kami, Eliminasi TBC Sebelum 2030! Bergabunglah dengan Komunitas Karanganyar dan Yayasan Mentari Sehat Indonesia, Ayo Wujudkan Indonesia Bebas TBC pada 2030." />
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
