import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { useTheme } from '../context/ThemeContext.jsx';

export default function AppLayout() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (auth.user?.role === 'recruiter') {
      return '/dashboard/recruiter';
    }
    return '/dashboard/user';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Ambient background glows */}
      <div className="ambient-glow top-[-200px] left-[-100px]"></div>
      <div className="ambient-glow top-[40%] right-[-200px] bg-indigo-500/5"></div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/home" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-extrabold text-lg tracking-wider">C</span>
                </div>
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:text-blue-400 transition-colors duration-300">
                  ConnectWith
                </span>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-400 bg-slate-800/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/20'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-400 bg-slate-800/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/20'
                  }`
                }
              >
                Jobs
              </NavLink>
              <NavLink
                to="/companies"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-400 bg-slate-800/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/20'
                  }`
                }
              >
                Companies
              </NavLink>
            </nav>

            {/* Right side buttons / Profile */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme switch */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => useTheme().toggleTheme()}
                  aria-label="Toggle theme"
                  title="Toggle light / dark theme"
                  className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${useTheme().theme === 'dark' ? 'bg-blue-500' : 'bg-slate-700'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${useTheme().theme === 'dark' ? 'translate-x-5' : ''}`}></span>
                </button>
                <span className="text-sm font-medium text-slate-200">{useTheme().theme === 'dark' ? 'Dark' : 'Light'}</span>
              </div>
              {auth?.token ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    className="px-3.5 py-2 text-sm font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="px-3.5 py-2 text-sm font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors"
                  >
                    Profile
                  </Link>
                  <div className="h-4 w-px bg-slate-800 mx-1"></div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col text-right">
                      <span className="text-sm font-semibold text-slate-200">{auth.user?.name}</span>
                      <span className="text-[10px] text-slate-400 capitalize">{auth.user?.role}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-800 hover:bg-red-950/40 border border-slate-700 hover:border-red-900/60 hover:text-red-400 text-slate-200 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium rounded-lg text-slate-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-600/10 hover:shadow-indigo-500/20 active:scale-98 transition-all duration-300"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850 focus:outline-none transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-t border-slate-850 px-2 pt-2 pb-3 space-y-1 sm:px-3 animate-fade-in">
            <Link
              to="/home"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Jobs
            </Link>
            <Link
              to="/companies"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Companies
            </Link>
            <div className="border-t border-slate-800 my-2 pt-2"></div>
            {auth?.token ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  Profile
                </Link>
                <div className="px-3 py-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-200">{auth.user?.name}</span>
                    <span className="text-xs text-slate-400 capitalize">{auth.user?.role}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-red-950/40 border border-red-900/60 text-red-400"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 p-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-md text-slate-300 border border-slate-700 hover:bg-slate-800 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-10 animate-fade-in">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/60 bg-slate-950/80 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ConnectWith MERN Job Portal. Powered by stunning styling.
          </p>
        </div>
      </footer>
    </div>
  );
}
