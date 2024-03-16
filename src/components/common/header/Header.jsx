import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Beranda</Link>
            </li>
            <li>
              <Link to='/news'>Berita</Link>
            </li>
            <li>
              <Link to='/courses'>Pengumuman</Link>
            </li>
            <li>
              <Link to='/about'>Tentang Kami</Link>
            </li>
            <li>
              <Link to='/team'>Tim</Link>
            </li>
            <li>
              <Link to='/lowongan'>Lowongan</Link>
            </li>
            <li>
              <Link to='/contact'>Kontak</Link>
            </li>
          </ul>
          <div className='start'>
            <div className='button'>BERSAMA MELAWAN TBC</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
