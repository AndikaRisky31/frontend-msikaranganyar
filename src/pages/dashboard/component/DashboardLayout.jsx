import React, { useState } from "react";
import Navigation from "./Navigation";
import NavbarDashboard from "./NavbarDashboard";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); 
  const [searchKeyword, setSearchKeyword] = useState("");
   
  const handleSearchChange = (keyword) => {
    setSearchKeyword(keyword);
  };

  const pathname = window.location.pathname;
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Menambahkan props tambahan ke setiap children yang diteruskan
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { searchKeyword: searchKeyword, currentPage: pathname.split("/")[2] })
  );

  return (
    <div className="flex">
      <div className={`flex-1 bg-teal-100 transform transition-all duration-300 ${isOpen ? "" : "-translate-x-full hidden"}`}>
        <Navigation isOpen={isOpen}/>
      </div>
      <div className="flex-[4]">
        <NavbarDashboard toggleSidebar={toggleSidebar} isOpen={isOpen} onSearchChange={handleSearchChange} />
        <div className="p-5">
          <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold capitalize cursor-pointer transition duration-300 ease-in-out hover:text-teal-700">{pathname.split("/")[2]}</h1>
          {childrenWithProps} 
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;