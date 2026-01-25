
import { NavLink, Link } from 'react-router-dom';
import { Button } from '../atoms/Button.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useState } from 'react';

const navLinkBase =
  'text-xs md:text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors';

const navLinkActive =
  'relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-blue-600 dark:after:bg-blue-400';

export const SiteHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/skills', label: 'Skills' },
    { to: '/projects', label: 'Projects' },
    { to: '/resume', label: 'Resume' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 px-3 py-2 text-white shadow-lg hover:scale-105 transform transition-all"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
            </svg>
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Lakshya Ahlawat</span>
            <span className="text-[11px] opacity-90">Portfolio</span>
          </div>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ''}`}
            >
              {label}
            </NavLink>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Admin
            </Link>
          )}
          {!user && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ''}`}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ''}`}
              >
                Signup
              </NavLink>
            </>
          )}
          {user && (
            <button
              type="button"
              onClick={logout}
              className="text-xs font-medium text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
            >
              Logout
            </button>
          )}
          <Button
            type="button"
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
        </nav>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile Sidebar Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden"
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className="fixed top-0 right-0 z-50 h-screen w-[80vw] max-w-xs bg-white dark:bg-gray-950 shadow-3xl flex flex-col items-center gap-8 px-8 py-10 animate-slide-in-right md:hidden border-l border-gray-200 dark:border-gray-800"
            style={{ height: '100vh', overflowY: 'auto' }}
          >
            <button
              className="absolute top-6 right-6 p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center gap-6 w-full mt-8">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `block w-full text-xl font-bold py-3 px-4 rounded-2xl text-center transition-colors ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="block w-full text-xl font-bold py-3 px-4 rounded-2xl text-center text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-900"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {!user && (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => `block w-full text-xl font-bold py-3 px-4 rounded-2xl text-center transition-colors ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) => `block w-full text-xl font-bold py-3 px-4 rounded-2xl text-center transition-colors ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Signup
                  </NavLink>
                </>
              )}
              {user && (
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); logout(); }}
                  className="block w-full text-xl font-bold py-3 px-4 rounded-2xl text-center text-gray-800 dark:text-gray-100 hover:bg-red-100 dark:hover:bg-red-900"
                >
                  Logout
                </button>
              )}
              <Button
                type="button"
                variant="ghost"
                onClick={() => { setMenuOpen(false); toggleTheme(); }}
                aria-label="Toggle color theme"
                className="block w-full text-xl font-bold py-3 px-4 rounded-2xl text-center"
              >
                {theme === 'dark' ? 'Light' : 'Dark'}
              </Button>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}
