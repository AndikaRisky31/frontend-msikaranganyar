import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PopupModal from "../../components/modal/popup-modal";
import { MdSearch,MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";

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
        title: "Interview",
        path: "/dashboard/interview",
      },
      {
        title: "Update Pasien",
        path: "/dashboard/pasien", // Mengubah path menjadi huruf kecil
      },
    ],
  },
  {
    title: "Admin",
    list: [
      {
        title: "Daftar Admin",
        path: "/dashboard/Admin",
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
      },
    ],
  },
];

const MenuLink = ({ title, path, icon }) => {
  const pathname = window.location.pathname;

  return (
    <a
      href={path}
      className={`flex items-center gap-1 mt-1 pl-3 p-1 hover:bg-teal-500 hover:text-white focus:bg-teal-700 ${
        pathname === path ? "bg-teal-700 text-white" : ""
      }`}
    >
      {icon}
      {title}
    </a>
  );
};

const Navigation = ({ isOpen }) => {
  const history = useHistory(); // Memindahkan penggunaan useHistory ke dalam komponen Navigation

  const redirectToHome = () => {
    history.push('/');
  };

  return (
    <div>
      <div className="flex items-center px-4 py-2 w-full">
          <div className="cursor-pointer" onClick={redirectToHome}>
            <h3 className="text-2xl font-semibold">Mentari Sehat Indonesia</h3>
            <h3 className="text-xl font-semibold">Kab. Karanganyar</h3>
          </div>
      </div>
      <ul className={`list-none p-5 ${isOpen ? '' : 'hidden'}`}>
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


const NavbarDashboard = ({ toggleSidebar,isOpen }) => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickLogout = () => {
    // Tampilkan modal konfirmasi
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("access_token");

    // Arahkan pengguna ke halaman login
    history.push("/login");

    // Tutup modal konfirmasi
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    // Tutup modal konfirmasi
    setIsModalOpen(false);
  };
  return (
    <>
    <PopupModal
        isOpen={isModalOpen}
        toggleModal={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        title="Konfirmasi Logout"
        trueChoice="Logout"
        falseChoice="Batal"
      />
    <div className="rounded-lg flex bg-soft align-items-center justify-between py-3 sm:py-5 pr-3 sm:pr-5">
    <div className="flex items-center gap-2">
      <button onClick={toggleSidebar} className="focus:outline-none py-3 px-1 text-xl sm:text-2xl bg-teal-100">
        {isOpen ? (
          <MdKeyboardDoubleArrowLeft />
        ) : (
          <MdKeyboardDoubleArrowRight/>
        )}
      </button>
    </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 p-1 sm:p-2 bg-teal-100 rounded-lg">
          <MdSearch className="text-gray-800" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none text-teal-600 focus:outline-none text-xs sm:text-base"
          />
        </div>
        <button onClick={clickLogout} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
      </div>
    </div>
  </>
  );
};


const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); 
  const pathname = window.location.pathname;
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div className={`flex-1 bg-teal-100 transform transition-all duration-300 ${isOpen ? "" : "-translate-x-full hidden"}`}>
        <Navigation isOpen={isOpen}/>
      </div>
      <div className="flex-[4]">
        <NavbarDashboard toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <div className="p-5">
        <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold capitalize cursor-pointer transition duration-300 ease-in-out hover:text-teal-700">{pathname.split("/")[2]}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;