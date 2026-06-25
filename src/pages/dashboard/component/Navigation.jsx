import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

const MenuLink = ({ title, path, icon, onNavigate }) => {
  return (
    <NavLink
      to={path}
      onClick={onNavigate}
      className={({ isActive }) =>
        `mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition duration-200 hover:bg-teal-500 hover:text-white ${
          isActive ? "bg-teal-700 text-white shadow-sm" : "text-slate-700"
        }`
      }
    >
      {icon}
      <span>{title}</span>
    </NavLink>
  );
};

const Navigation = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const listSidebar = isSuperAdmin()
    ? menuItems
    : menuItems.filter((item) => item.title !== "Super Admin");

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-900/40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 h-screen w-72 border-r border-slate-200 bg-white shadow-lg transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex w-full items-center border-b border-slate-200 px-5 py-5">
          <div className="cursor-pointer" onClick={redirectToHome}>
            <h3 className="text-xl font-semibold leading-tight text-slate-800">
              Mentari Sehat Indonesia
            </h3>
            <h3 className="text-lg font-medium leading-tight text-slate-500">
              Kab. Karanganyar
            </h3>
          </div>
        </div>

        <ul className="list-none space-y-6 p-5">
          {listSidebar.map((item, index) => (
            <li key={`item-${index}`}>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                {item.title}
              </span>

              <div className="mt-3">
                {item.list.map((listItem, listIndex) => (
                  <MenuLink
                    key={`list-${listIndex}`}
                    {...listItem}
                    onNavigate={onClose}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Navigation;
