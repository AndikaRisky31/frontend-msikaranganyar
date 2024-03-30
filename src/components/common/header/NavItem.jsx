import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ to, title }) => {
  return (
    <li className='md:mr-8'>
      <Link className="text-white font-semibold hover:text-teal-500" to={to}>{title}</Link>
    </li>
  );
};

export default NavItem;
