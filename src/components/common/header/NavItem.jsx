import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ to, title,onClick }) => {
  return (
    <li className='md:mr-8' onClick={onClick}>
      <Link className="text-white font-semibold hover:text-teal-500" to={to}>{title}</Link>
    </li>
  );
};

export default NavItem;
