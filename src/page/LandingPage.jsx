import React from "react"
import AboutCard from "../components/about/AboutCard"
import Hero from "../components/home/hero/Hero"
import HStruktur from "../components/home/HStruktur"
import Heading from "../components/common/heading/Heading"

const LandingPage = () => {
    const Data =[
        {
          id: 1,
          cover: "https://img.icons8.com/ios/80/hospital.png",
          title: "Penanggulangan Penyakit Menular",
          desc: "Mewujudkan kemandirian dalam mengatasi dan menanggulangi masalah-masalah penyakit menular di masyarakat seperti TBC, HIV-AIDS, Malaria, dan lain-lain."
        },
        {
          id: 2,
          cover: "https://img.icons8.com/ios/100/business-goal.png",
          title: "Mendorong Perubahan Sosial Budaya Masyarakat",
          desc: "Menggerakkan seluruh komponen masyarakat dalam upaya mendorong perubahan dan perbaikan kehidupan sosial budaya masyarakat.",
        },
        {
          id: 3,
          cover: "https://img.icons8.com/ios/80/000000/athlete.png",
          title: "Mencerdaskan Bangsa Melalui Pendidikan",
          desc: "Membantu pemerintah untuk ikut serta mencerdaskan kehidupan bangsa, mendorong masyarakat untuk memperoleh hak pendidikan secara merata dan berkeadilan.",
        },
      ]
    return (
    <>
        <div className="max-sm:pt-[75%] max-lg:pt-[10%]">
            <Hero title="Yayasan Mentari Sehat Indonesia" narasi="Tumbuh Dan Berkembang Bersama Komunitas,Demi Mewujudkan Indonesia Emas 2045"/>
            <Heading subtitle="Kontribusi melalui program-program penanggulangan penyakit, perubahan sosial, dan peningkatan akses pendidikan." title="VISI DAN MISI"/>
            <AboutCard data={Data}></AboutCard>
            <HStruktur></HStruktur>
        </div>
    </>
  )
}

export default LandingPage
