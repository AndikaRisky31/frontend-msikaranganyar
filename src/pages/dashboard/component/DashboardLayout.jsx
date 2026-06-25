import React, { useMemo, useState, createContext } from "react";
import Navigation from "./Navigation";
import NavbarDashboard from "./NavbarDashboard";
import { Outlet, useLocation } from "react-router-dom";

export const MyContext = createContext();

const pageTitles = {
  news: "News",
  pengumuman: "Pengumuman",
  lowongan: "Lowongan",
  wawancara: "Wawancara",
  tim: "Tim",
  pasien: "Pasien",
  profile: "Profile",
  dokumen: "Dokumen",
  admin: "Daftar Admin",
  createadmin: "Tambah Admin",
};

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const location = useLocation();

  const handleSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const currentSection = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    return parts[1] || "dashboard";
  }, [location.pathname]);

  const pageTitle = pageTitles[currentSection] || currentSection;

  return (
    <MyContext.Provider value={searchKeyword}>
      <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
        <Navigation isOpen={isOpen} onClose={closeSidebar} />
        <div className="min-w-0 lg:col-start-2">
          <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
            <NavbarDashboard
              toggleSidebar={toggleSidebar}
              isOpen={isOpen}
              onSearchChange={handleSearchChange}
            />
          </div>
          <main className="min-w-0 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <h1 className="mb-6 text-2xl font-semibold capitalize text-slate-800 sm:text-3xl">
                {pageTitle}
              </h1>
              {children || <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </MyContext.Provider>
  );
};

export default DashboardLayout;
