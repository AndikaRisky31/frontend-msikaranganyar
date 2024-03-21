import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";

const Header = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <Head />
      <header>
        <nav className='flex justify-between items-center mx-10 pl-5 bg-opacity-20 bg-white min-[10px]:h-auto,mx-5 md:h-24 relative'>
          <button className='md:hidden bg-teal-700 ml-auto h-full p-5' onClick={() => setClick(!click)}>
            {click ?<i className='fa fa-times text-2xl text-white'></i>:<i className='fa fa-bars text-2xl text-white'></i> }
          </button>
          <div className={`${click ? 'absolute top-24 right-0 w-1/2 bg-teal-600 mobile-nav' : ''}`}>
            <ul className={`flex flex-col items-center md:flex-row gap-3 ${click ? 'block py-2' : 'max-md:hidden'}`}>
              <li className='md:mr-8'>
                <Link className="text-white font-semibold" to='/'>Beranda</Link>
              </li>
              <li className='md:mr-8'>
                <Link className="text-white font-semibold" to='/news'>Berita</Link>
              </li>
              <li className='md:mr-8'>
                <Link className="text-white font-semibold" to='/courses'>Pengumuman</Link>
              </li>
              <li className='md:mr-8'>
                <Link className="text-white font-semibold" to='/about'>Tentang Kami</Link>
              </li>
              <li className='md:mr-8'>
                <Link className="text-white font-semibold" to='/team'>Tim</Link>
              </li>
              <li className='md:mr-8'>
                <Link className="text-white font-semibold" to='/lowongan'>Lowongan</Link>
              </li>
              <li>
                <Link className="text-white font-semibold" to='/contact'>Kontak</Link>
              </li>
            </ul>
          </div>
          <div className="h-full bg-teal-600 start hidden md:flex md:items-center" p-2 style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)' }}>
            <div className='button text-white mx-16 font-normal'>BERSAMA MELAWAN TBC</div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
