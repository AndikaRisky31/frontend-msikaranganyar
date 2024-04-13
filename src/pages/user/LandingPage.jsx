import React from "react"
import HStruktur from "../../components/home/HStruktur"
import Hero from "../../components/common/Hero"
import AboutCard from "../../components/card/AboutCard"
import { Link } from "react-router-dom"

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
        <div className="pt-[75%] md:pt-[10%]">
            <Hero title="Yayasan Mentari Sehat Indonesia" narasi="Tumbuh Dan Berkembang Bersama Komunitas,Demi Mewujudkan Indonesia Emas 2045"/>
            <div className="text-center pb-10">
              <h3 className="font-semibold tracking-wide uppercase text-white lg:text-teal-500 justify-center mx-3">Kontribusi melalui program-program penanggulangan penyakit, perubahan sosial, dan peningkatan akses pendidikan.</h3>
              <Link to='#'>
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-5 capitalize cursor-pointer transition duration-300 ease-in-out text-white lg:text-black">VISI DAN MISI</h1>
              </Link>
            </div>
            <AboutCard data={Data}></AboutCard>
            <HStruktur/>
        </div>
    </>
  )
}

export default LandingPage
