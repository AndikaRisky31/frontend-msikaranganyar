import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO' title='SSR Mentari Sehat Indonesia'/>
            <h3 className="font-semibold tracking-wide uppercase text-white">Kab. Karanganyar</h3>
            <p>Bersama Kami,Eliminasi TBC Sebelum 2030! Bergabunglah dengan Komunitas Jawa Tengah dan Yayasan Mentari Sehat Indonesia, Ayo Wujudkan Indonesia Bebas TBC pada 2030.</p>
            {/* <div className='button'>
              <button className='primary-btn'>
                Gabung Sekarang<i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button>
                  Lihat Lowongan <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div> */}
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
