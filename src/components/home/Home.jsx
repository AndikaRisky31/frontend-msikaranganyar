import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import HVacancy from "./HVacancy"
import Testimonal from "./testimonal/Testimonal"

const Home = () => {
  return (
    <>
    <div className="max-sm:pt-[75%] max-lg:pt-[10%]">
      <Hero />
      <AboutCard />
      {/* <HAbout /> */}
      <Testimonal />
      <Hblog />
      <HVacancy />
    </div>
    </>
  )
}

export default Home
