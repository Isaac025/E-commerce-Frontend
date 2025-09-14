import React from "react";
import { assets } from "../../assets/admin_assets/assets";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center py-2 justify-between px-[4%]">
      <img className="w-[max(10%,80px)]" src={assets.logo1} alt="" />
      <button
        onClick={handleLogout}
        className="bg-gray-600 cursor-pointer text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
