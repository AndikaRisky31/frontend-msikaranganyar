import ListSubHeader from "./ListSubHeader";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import NavItem from "./NavItem";

const Header = ({ showHead }) => {
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.pageYOffset > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {showHead === true ? <Head /> : null}
      <header className={`z-50 sticky top-0`}>
        <nav className={`flex justify-between items-center pl-5 min-[10px]:h-auto md:h-24 relative ${isSticky ? 'bg-teal-400' : showHead ? 'bg-opacity-20 bg-white mx-10' : 'bg-teal-400'}`}>
          <button className='md:hidden bg-teal-700 ml-auto h-full p-5' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times text-2xl text-white'></i> : <i className='fa fa-bars text-2xl text-white'></i>}
          </button>
          <div className={`${click ? 'absolute top-24 right-0 w-1/2 bg-teal-600 mobile-nav' : ''}`} ref={dropdownRef}>
            <ul className={`flex flex-col items-center md:flex-row gap-3 ${click ? 'block py-2' : 'max-md:hidden'}`}>
            <NavItem to='/' title='Beranda' />
            <li className='md:mr-8 relative' onClick={toggleDropdown}>
              <div className="text-white font-semibold cursor-pointer">Program</div>
              {isOpen && (
                <div className={`absolute bg-teal-500 shadow-lg w-36 ${click ? 'mr-[50%]' : 'mt-10'} `}>
                    <ListSubHeader to='/ssr' title='Kesehatan' disable={false}/>
                    <ListSubHeader to='#' title='Pendidikan' disable={true}/>
                    <ListSubHeader to='#' title='Sosial' disable={true}/>
                  </div>
                )}
              </li>
            <NavItem to='/news' title='Berita' />
            <NavItem to='/courses' title='Pengumuman' />
            <NavItem to='/about' title='Tentang Kami' />
            <NavItem to='/team' title='Tim' />
            <NavItem to='/lowongan' title='Lowongan' />
            <NavItem to='/contact' title='Kontak' />
            </ul>
          </div>
          <div className="h-full bg-teal-600 start hidden md:flex md:items-center" style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)' }}>
            <div className='button text-white mx-16 font-normal'>BERSAMA MELAWAN TBC</div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;