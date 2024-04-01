import React from "react"
import AboutCard from "../../components/about/AboutCard"
import Hblog from "../../components/home/Hblog"
import { homeAbout } from "../../dummydata"
import HVacancy from "../../components/home/HVacancy"
import DataPasien from "../../components/about/DataPasien"
import Faq from "../../components/vacancy/Faq"
import Testimonal from "../../components/testimonal/Testimonal"
import Hero from "../../components/Hero"

const Home = () => {
  return (
    <>
    <div className="max-sm:pt-[75%] max-lg:pt-[10%]">
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
