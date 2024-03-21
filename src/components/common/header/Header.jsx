import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";

const Header = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <Head />
      <header>
        <nav className='flex justify-between items-center bg-opacity-20 bg-white min-[10px]:h-auto,mx-5 md:h-24 relative'>
          <button className='md:hidden h-full bg-teal-500 p-5 ml-auto' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times text-2xl text-white h-full'></i> : <i className='fa fa-bars text-2xl text-white'></i>}
          </button>
          <div className={`${click ? 'absolute top-24 right-0 w-1/2 bg-teal-500 mobile-nav' : 'my-10 md:px-12 lg:px-20'}`}>
            <ul className={`flex flex-col items-center md:flex-row gap-3 ${click ? 'block py-2' : 'max-md:hidden'}`}>
              <li className='md:mr-8'>
                <Link className="text-white " to='/'>Beranda</Link>
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
          <div className="h-full bg-teal-500 start hidden md:flex md:items-center" text-white p-2 style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)' }}>
            <div className='button text-white mx-16'>BERSAMA MELAWAN TBC</div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
