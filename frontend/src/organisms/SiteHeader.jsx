import { NavLink, Link } from 'react-router-dom';
import { Button } from '../atoms/Button.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../hooks/useAuth.js';

const navLinkBase =
  'text-xs md:text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors';

const navLinkActive =
  'relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-blue-600 dark:after:bg-blue-400';

export const SiteHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, logout } = useAuth();

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
        <nav className="flex items-center gap-4">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : ''}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/skills"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : ''}`
            }
          >
            Skills
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : ''}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/resume"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : ''}`
            }
          >
            Resume
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? navLinkActive : ''}`
            }
          >
            Contact
          </NavLink>
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 md:inline"
            >
              Admin
            </Link>
          )}
          {!user && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : ''}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : ''}`
                }
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
      </div>
    </header>
  );
};
