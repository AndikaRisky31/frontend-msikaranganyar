import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import Hero from "./hero/Hero"
import Testimonal from "./testimonal/Testimonal"
import { homeAbout } from "../../dummydata"
import HVacancy from "./HVacancy"
import DataPasien from "../about/DataPasien"

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
    </div>
    </>
  )
}

export default Home
