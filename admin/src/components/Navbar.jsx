import React from "react";
import logo from "../assets/admin_assets/logo.png";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken(""); // Clear token in state
  };

  return (
    <header className="flex justify-between items-center bg-gray-50 px-6 py-4 border-b border-gray-200 px-[50px]">
      <div className="flex items-center space-x-2">
        <img className="w-[125px]" src={logo} alt="Logo" />
      </div>
      <button
        className="bg-gray-700 text-white px-7 py-2 rounded-[30px] hover:bg-gray-800 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
