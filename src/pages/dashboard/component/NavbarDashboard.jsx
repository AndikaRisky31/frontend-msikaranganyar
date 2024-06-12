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
          <div className="flex items-center gap-1 p-2 bg-teal-100 rounded-lg">
            <MdSearch className="text-gray-800" />
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none text-teal-600 focus:outline-none text-xs sm:text-base"
              onKeyPress={handleKeyPress}
            />
          </div>
          <button onClick={clickLogout} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
        </div>
      </div>
    </>
  );
};

export default NavbarDashboard;