import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isSuperAdmin } from "../../../utils/auth";

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
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`flex items-center gap-2 mt-1 pl-3 p-2 rounded-md transition duration-200 hover:bg-teal-500 hover:text-white ${
        isActive ? "bg-teal-700 text-white" : "text-gray-700"
      }`}
    >
      {icon}
      <span>{title}</span>
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
      setListSidebar(menuItems.filter((item) => item.title !== "Super Admin"));
    }
  }, []);

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen w-72 bg-white border-r border-gray-200 shadow-sm overflow-y-auto transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center px-4 py-4 w-full border-b border-gray-200">
        <div className="cursor-pointer" onClick={redirectToHome}>
          <h3 className="text-2xl font-semibold leading-tight">
            Mentari Sehat Indonesia
          </h3>
          <h3 className="text-xl font-semibold leading-tight">
            Kab. Karanganyar
          </h3>
        </div>
      </div>

      <ul className="list-none p-5">
        {listSidebar.map((item, index) => (
          <li key={`item-${index}`} className="mt-2">
            <span className="font-bold text-base text-gray-500">
              {item.title}
            </span>

            <div className="mt-2">
              {item.list.map((listItem, listIndex) => (
                <MenuLink key={`list-${listIndex}`} {...listItem} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Navigation;
