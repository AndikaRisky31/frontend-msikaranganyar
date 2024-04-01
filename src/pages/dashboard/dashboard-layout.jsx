import React from "react";
import { useHistory } from "react-router-dom";

import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const menuItems = [
  {
    title: "News",
    list: [
      {
        title: "News",
        path: "/dashboard/news",
      },
    ],
  },
  {
    title: "Announcement",
    list: [
      {
        title: "Announcement",
        path: "/dashboard/announcement",
      },
      {
        title: "Account",
        path: "/dashboard/account",
      },
    ],
  },
];

const MenuLink = ({ title, path, icon }) => {
  const pathname = window.location.pathname;
  console.log(pathname);

  return (
    <a
      href={path}
      className={`flex items-center gap-1 mt-1 p-1 hover:bg-teal-500 hover:text-white focus:bg-teal-700 ${
        pathname === path ? "bg-teal-700 text-white" : ""
      }`}
    >
      {icon}
      {title}
    </a>
  );
};

const Navigation = () => {
  const history = useHistory(); // Memindahkan penggunaan useHistory ke dalam komponen Navigation

  const redirectToHome = () => {
    history.push('/');
  };

  return (
    <div className="sticky top-10">
      <div className="flex items-center gap-2 mb-5">
        <img src="" alt="" />
        <div className="cursor-pointer" onClick={redirectToHome}>
          <h3 className="text-2xl font-semibold " >Mentari Sehat Indonesia</h3>
          <h3 className="text-xl font-semibold">Kab. Karanganyar</h3>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((item, index) => (
          <li key={`item-${index}`} className="mt-2">
            <span className="font-bold text-base text-graysoft">
              {item.title}
            </span>
            {item.list.map((list, index) => (
              <MenuLink key={index} {...list} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

const NavbarDashboard = () => {
  const pathname = window.location.pathname;
  return (
    <div className="p-5 rounded-lg flex bg-soft items-center justify-between">
      <div className="text-graysoft font-bold capitalize">
        <p>{pathname.split("/").pop()}</p>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 p-2 bg-teal-100 rounded-lg">
          <MdSearch className="text-gray-800" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none text-white focus:outline-none"
          />
        </div>
        <div className="flex gap-5 cursor-pointer">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-1 min-h-screen p-5 bg-teal-100">
        <Navigation />
      </div>
      <div className="flex-[4] p-5">
        <NavbarDashboard />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;