import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='SELAMAT DATANG MSI CAB KARANGANYAR' title='TEMPAT TERBAIK UNTUK MENDAPATKAN INFORMASI' />
            <p>Bergerak dibidang sosial untuk membantu penderita penyakit menular sembuh.</p>
            <div className='button'>
              <button className='primary-btn'>
                Gabung Sekarang<i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button>
                  Lihat Lowongan <i className='fa fa-long-arrow-alt-right'></i>
              </button>
          
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
