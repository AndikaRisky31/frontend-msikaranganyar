import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupModal from "../../../components/modal/popup-modal";
import { MdSearch, MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { deleteToken } from "../../../utils/auth";
import { isBrowser } from "../../../utils/helper";

const NavbarDashboard = ({ isOpen, toggleSidebar, onSearchChange }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickLogout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteToken()
    navigate("/login");
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleKeyPress = (e) => {
    if (isBrowser() && e.key === 'Enter') {
      const keyword = e.target.value;
      onSearchChange(keyword);
    }
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
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xl text-slate-700 transition hover:bg-teal-50 lg:hidden"
          >
            {isOpen ? (
              <MdKeyboardDoubleArrowLeft />
            ) : (
              <MdKeyboardDoubleArrowRight/>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <MdSearch className="text-slate-500" />
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Search..."
              className="w-28 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:w-52"
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            onClick={clickLogout}
            type="button"
            className="rounded-xl bg-red-700 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-800 sm:px-5 sm:text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default NavbarDashboard;
