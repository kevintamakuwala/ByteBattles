import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/standard-collection-27.svg";

function Navbar({ isAuthenticated, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // flex-wrap
    <nav className="flex items-center flex-wrap md:flex-nowrap lg:flex-nowrap justify-between p-6 md:pt-3 md:pb-1 bg-slate-950 text-white w-screen">
      <Link to="/">
        <div className="flex items-end flex-shrink-0 ps-12 mr-6">
          <img
            className="w-7 h-6 md:w-100 md:h-10 mr-2"
            alt="logo"
            src={Logo}
            draggable={false}
          />
          <span className="font-bold w-32 flex-shrink-0 text-xl md:text-2xl mt-[2%]">
            ByteBattles
          </span>
        </div>
      </Link>
      <div className="block md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 text-lg font-bold hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow md:flex md:justify-end md:items-center md:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="w-[100%] flex flex-col md:flex-row md:justify-end items-center mt-4 font-semibold text-lg md:text-xl  pb-4 md:pb-0">
          <Link
            to="/problems"
            onClick={toggleMenu}
            className="block mt-4 px-0 lg:px-2 md:inline-block md:mt-0 text-white-200 mr-4 hover:text-gray-400"
          >
            Problems
          </Link>
          <Link
            to="/contests"
            onClick={toggleMenu}
            className="block mt-4 px-0 lg:px-2 md:inline-block md:mt-0 text-white-200 mr-4 hover:text-gray-400"
          >
            Contests
          </Link>
          <Link
            to="/about"
            onClick={toggleMenu}
            className="block mt-4 px-0 lg:px-2 md:inline-block md:mt-0 text-white-200 mr-4 hover:text-gray-400"
          >
            About
          </Link>
          <Link
            to="/profile"
            onClick={toggleMenu}
            className="block mt-4 px-0 lg:px-2 md:inline-block md:mt-0 text-white-200 mr-4 hover:text-gray-400"
          >
            Profile
          </Link>
          <button
            className="LoginButton px-4 md:px-2 lg:px-4 py-1 text-[crimson] border-2 md:mt-2 border-[crimson] rounded-full cursor-pointer text-[1.1rem] mr-[5.5%] w-fit mt-[2%] ml-[4%] hover:text-red-700 hover:border-red-700 hover:ring-red-700"
            onClick={isAuthenticated ? handleLogout : null}
          >
            {!isAuthenticated ? (
              <Link to="/signup">Sign up</Link>
            ) : (
              <span>Log out</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
