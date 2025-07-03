import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiBook, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-[#8E7DBE] to-[#A6D6D6] shadow-lg font-rubik">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <FiBook className="h-8 w-8 text-[#F4F8D3] mr-2" />
            <Link 
              to="/" 
              className="text-2xl font-bold text-[#F4F8D3] font-amatic hover:text-white transition-colors"
            >
              Gratitude Journal
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="text-[#F4F8D3] hover:bg-[#8E7DBE]/30 hover:text-white px-3 py-2 rounded-md text-lg font-medium flex items-center transition-colors"
              >
                <FiHome className="mr-1" /> Home
              </Link>
              <Link
                to="/about"
                className="text-[#F4F8D3] hover:bg-[#8E7DBE]/30 hover:text-white px-3 py-2 rounded-md text-lg font-medium flex items-center transition-colors"
              >
                <FiBook className="mr-1" /> About
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {!localStorage.getItem('token') ? (
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="bg-[#F4F8D3] text-[#8E7DBE] hover:bg-[#F4F8D3]/90 px-4 py-2 rounded-xl text-lg font-medium flex items-center transition-colors"
                  >
                    <FiLogIn className="mr-1" /> Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#8E7DBE] text-[#F4F8D3] hover:bg-[#7a6ba8] px-4 py-2 rounded-xl text-lg font-medium flex items-center transition-colors border-2 border-[#F4F8D3]"
                  >
                    <FiUserPlus className="mr-1" /> Sign Up
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-[#F4F8D3] text-[#8E7DBE] hover:bg-[#F4F8D3]/90 px-4 py-2 rounded-xl text-lg font-medium flex items-center transition-colors"
                >
                  <FiLogOut className="mr-1" /> Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#F4F8D3] hover:text-white hover:bg-[#8E7DBE]/30 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-[#F4F8D3] hover:bg-[#8E7DBE]/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <FiHome className="mr-1" /> Home
          </Link>
          <Link
            to="/about"
            className="text-[#F4F8D3] hover:bg-[#8E7DBE]/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <FiBook className="mr-1" /> About
          </Link>
          {!localStorage.getItem('token') ? (
            <div className="pt-4 pb-3 border-t border-[#8E7DBE]/30">
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-[#F4F8D3] text-[#8E7DBE] hover:bg-[#F4F8D3]/90 px-3 py-2 rounded-md text-base font-medium flex items-center w-full justify-center"
                >
                  <FiLogIn className="mr-1" /> Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#8E7DBE] text-[#F4F8D3] hover:bg-[#7a6ba8] px-3 py-2 rounded-md text-base font-medium flex items-center w-full justify-center border border-[#F4F8D3]"
                >
                  <FiUserPlus className="mr-1" /> Sign Up
                </Link>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-[#F4F8D3] text-[#8E7DBE] hover:bg-[#F4F8D3]/90 px-3 py-2 rounded-md text-base font-medium flex items-center w-full justify-center mt-4"
            >
              <FiLogOut className="mr-1" /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;