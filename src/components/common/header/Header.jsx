import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";

const Header = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <Head />
      <header>
        <nav className='flex justify-between items-center bg-opacity-20 bg-white mx-10 h-24 min-[10px]:h-auto md:h-24 lg:h-24'>
          <button className='md:hidden h-full bg-teal-500 p-5 ml-auto' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times text-2xl text-white'></i> : <i className='fa fa-bars text-2xl text-white'></i>}
          </button>
          <div className={`${click ? 'absolute top-24 left-0 w-full bg-teal-500' : 'md:px-12 lg:px-20'}`}>
            <ul className={`flex flex-col items-center md:flex-row ${click ? 'block' : 'max-md:hidden'}`}>
              <li className='md:mr-8'>
                <Link className="text-white" to='/'>Beranda</Link>
              </li>
              <li className='md:mr-8'>
                <Link className="text-white" to='/news'>Berita</Link>
              </li>
              <li className='md:mr-8'>
                <Link className="text-white" to='/courses'>Pengumuman</Link>
              </li>
              <li className='md:mr-8'>
                <Link className="text-white" to='/about'>Tentang Kami</Link>
              </li>
              <li className='md:mr-8'>
                <Link className="text-white" to='/team'>Tim</Link>
              </li>
              <li className='md:mr-8'>
                <Link className="text-white" to='/lowongan'>Lowongan</Link>
              </li>
              <li>
                <Link className="text-white" to='/contact'>Kontak</Link>
              </li>
            </ul>
          </div>
          <div className="h-full bg-teal-500 start hidden md:flex md:items-center" text-white p-2 style={{ clipPath: 'polygon(20% 0, 100% 0%, 100% 100%, 0% 100%)' }}>
            <div className='button text-white mx-16'>BERSAMA MELAWAN TBC</div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
