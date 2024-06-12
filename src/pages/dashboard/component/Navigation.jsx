import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isSuperAdmin } from "../../../utils/auth";
import { isBrowser } from "../../../utils/helper";

const menuItems = [
  {
    title: "Daftar",
    list: [
      {
        title: "News",
        path: "/dashboard/news",
      },
      {
        title: "Pengumuman",
        path: "/dashboard/pengumuman",
      },
      {
        title: "Lowongan",
        path: "/dashboard/lowongan",
      },
      {
        title: "Wawancara",
        path: "/dashboard/wawancara",
      },
      {
        title: "Pasien",
        path: "/dashboard/pasien",
      },
      {
        title: "Tim",
        path: "/dashboard/tim",
      },
      {
        title: "Dokumen",
        path: "/dashboard/dokumen",
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
      },
    ],
  },
  {
    title: "Super Admin",
    list: [
      {
        title: "Daftar Admin",
        path: "/dashboard/admin",
      },
    ],
  },
];

const MenuLink = ({ title, path, icon }) => {
  let pathname;
  if(isBrowser()){
    pathname = window.location.pathname;
  }
    
  return (
    <Link
      to={path}
      className={`flex items-center gap-1 mt-1 pl-3 p-1 hover:bg-teal-500 hover:text-white focus:bg-teal-700 ${
        pathname === path ? "bg-teal-700 text-white" : ""
      }`}
    >
      {icon}
      {title}
    </Link>
  );
};

const Navigation = ({ isOpen }) => {
  const navigate = useNavigate();
  const [listSidebar, setListSidebar] = useState([]);

  useEffect(() => {
    const isAdminSuperAdmin = isSuperAdmin();
    if (isAdminSuperAdmin) {
      setListSidebar(menuItems);
    } else {
      setListSidebar(menuItems.filter(item => item.title !== "Super Admin"));
    }
  }, []);

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <div className="h-screen">
      <div className="flex items-center px-4 py-2 w-full">
        <div className="cursor-pointer" onClick={redirectToHome}>
          <h3 className="text-2xl font-semibold">Mentari Sehat Indonesia</h3>
          <h3 className="text-xl font-semibold">Kab. Karanganyar</h3>
        </div>
      </div>
      <ul className={`list-none p-5 ${isOpen ? '' : 'hidden'}`}>
        {listSidebar.map((item, index) => (
          <li key={`item-${index}`} className="mt-2">
            <span className="font-bold text-base text-graysoft">
              {item.title}
            </span>
            {item.list.map((listItem, listIndex) => (
              <MenuLink key={`list-${listIndex}`} {...listItem} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
