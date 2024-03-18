import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1>MENTARI SEHAT INDONESIA</h1>
            <span>KAB. KARANGANYAR</span>
          </div>

          <div className='social'>
            <a href="https://www.instagram.com/_msi_karanganyar?igsh=MXN1MHM0enR6eTJydg==" target="_blank" rel="noopener noreferrer">
              <i className='fab fa-instagram icon'></i>
            </a>
            <a href="https://www.tiktok.com/@msi.karanganyar?_t=8kf8aJTji1B&_r=1" target="_blank" rel="noopener noreferrer">
              <i className='fab fa-tiktok icon'></i>
            </a>
            <a href="https://www.youtube.com/@msikab.karanganyar6795?si=9Qt2hFKiZiVqcgJD" target="_blank" rel="noopener noreferrer">
              <i className='fab fa-youtube icon'></i>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
