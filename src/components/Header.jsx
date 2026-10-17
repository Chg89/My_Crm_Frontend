import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const navLinkClass = ({ isActive }) =>
  `relative py-1 transition ${
    isActive
      ? "text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-violet-500 after:rounded-full"
      : "text-zinc-400 hover:text-white"
  }`;
const mobileNavLinkClass = ({ isActive }) =>
  `block px-3 py-2 rounded-md text-base font-medium ${
    isActive
      ? "text-white bg-zinc-800"
      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
  }`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transition">
              <span className="text-white font-bold text-sm">MC</span>
            </div>
            <span className="text-xl font-bold text-white">My Crm</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {isLoggedIn && (
              <NavLink to="/clients" className={navLinkClass}>
                Clients
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink to="/services" className={navLinkClass}>
                Services
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink to="/appointments" className={navLinkClass}>
                Appointments
              </NavLink>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-zinc-400 hover:text-white transition cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/register" className={navLinkClass}>
                  Register
                </NavLink>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 focus:outline-none cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden bg-zinc-900 border-b border-zinc-800 overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 px-4 pt-2 pb-4" : "max-h-0 px-4 py-0"
          }`}
        >
          {isLoggedIn && (
            <>
              <NavLink
                to="/clients"
                onClick={() => setIsOpen(false)}
                className={mobileNavLinkClass}
              >
                Clients
              </NavLink>
              <NavLink
                to="/services"
                onClick={() => setIsOpen(false)}
                className={mobileNavLinkClass}
              >
                Services
              </NavLink>
              <NavLink
                to="/appointments"
                onClick={() => setIsOpen(false)}
                className={mobileNavLinkClass}
              >
                Appointments
              </NavLink>
            </>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className={mobileNavLinkClass}
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={mobileNavLinkClass}
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
