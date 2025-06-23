import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import UserAvatar from "./Avatar";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center py-6">
        <div className="text-3xl font-mono font-bold">
          Lakshya<span className="text-green-400">.</span>
        </div>
        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="block h-1 w-6 bg-green-400 mb-1 rounded transition-all"></span>
          <span className="block h-1 w-6 bg-green-400 mb-1 rounded transition-all"></span>
          <span className="block h-1 w-6 bg-green-400 rounded transition-all"></span>
        </button>
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4 md:gap-8 items-center text-base md:text-lg">
          <li>
            <Link to="/" className="hover:text-green-400 transition">
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/resume" className="hover:text-green-400 transition">
                  Resume
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-green-400 transition">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-green-400 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-green-400 text-gray-900 px-4 py-1 rounded-full font-mono font-bold hover:bg-green-300 transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-green-400 text-gray-900 px-4 py-1 rounded-full font-mono font-bold hover:bg-green-300 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="border border-green-400 text-green-400 px-4 py-1 rounded-full font-mono font-bold hover:bg-green-400 hover:text-gray-900 transition"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
          <li>
            <a
              href="#hire"
              className="bg-green-400 text-gray-900 px-6 py-2 rounded-full font-mono font-bold hover:bg-green-300 transition"
            >
              Hire me
            </a>
          </li>
          {user && user.email && <UserAvatar email={user.email} />}
        </ul>
      </div>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end md:hidden">
          <div className="w-4/5 max-w-xs h-full bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg flex flex-col relative">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-green-400 text-3xl"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <IoMdClose />
            </button>
            <ul className="flex flex-col gap-6 items-center justify-center h-full text-lg font-mono">
              <li>
                <Link
                  to="/"
                  className="hover:text-green-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      to="/resume"
                      className="hover:text-green-400 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Resume
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/projects"
                      className="hover:text-green-400 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Work
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="hover:text-green-400 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-green-400 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-green-400 text-gray-900 px-4 py-1 rounded-full font-mono font-bold hover:bg-green-300 transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="bg-green-400 text-gray-900 px-4 py-1 rounded-full font-mono font-bold hover:bg-green-300 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="border border-green-400 text-green-400 px-4 py-1 rounded-full font-mono font-bold hover:bg-green-400 hover:text-gray-900 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
              <li>
                <a
                  href="#hire"
                  className="bg-green-400 text-gray-900 px-6 py-2 rounded-full font-mono font-bold hover:bg-green-300 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Hire me
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
