import React from "react";

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
        title: "News List",
        path: "/dashboard/news",
      },
      {
        title: "Create News",
        path: "/dashboard/news/create",
      },
    ],
  },
  {
    title: "Settings",
    list: [
      {
        title: "Profile",
        path: "/dashboard/profile",
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

  return (
    <a
      href={path}
      className={`flex items-center gap-2 mt-1 rounded-lg p-5 hover:bg-[#2e374a] focus:bg-[#2e374a] ${
        pathname === path ? "bg-[#2e374a]" : ""
      }`}
    >
      {icon}
      {title}
    </a>
  );
};

const Navigation = () => {
  return (
    <div className="sticky top-10 mt-8">
      <div className="flex items-center gap-5 mb-5">
        <img src="" alt="" />
        <div>
          <h3 className="text-2xl font-semibold">MSI</h3>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((item, index) => (
          <li key={`item-${index}`}>
            <span className="font-bold text-sm mt-10 mb-10 text-graysoft">
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
        <div className="flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg">
          <MdSearch className="text-gray-500" />
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
      <div className="flex-1 min-h-screen p-5 bg-soft">
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
