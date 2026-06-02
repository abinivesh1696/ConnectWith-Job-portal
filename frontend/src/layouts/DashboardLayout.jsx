import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

export default function DashboardLayout() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  const isRecruiter = auth.user?.role === 'recruiter';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative">
      {/* Background glow effects */}
      <div className="absolute top-[10%] right-[5%] w-72 h-72 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[5%] w-72 h-72 rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none"></div>

      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-slate-900 border-r border-slate-800/80 p-6 flex flex-col relative z-20">
        {/* Sidebar Brand header */}
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-extrabold text-sm tracking-wider">C</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-blue-400 transition-colors">
              ConnectWith
            </span>
          </Link>
        </div>

        {/* User context card inside sidebar */}
        <div className="mb-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 capitalize">
            {auth.user?.name ? auth.user.name[0] : 'U'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-200 truncate">{auth.user?.name}</span>
            <span className="text-[10px] text-indigo-400 capitalize font-medium tracking-wide">{auth.user?.role}</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-grow space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Workspace</p>
          
          {isRecruiter ? (
            <>
              <NavLink
                to="/dashboard/recruiter"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`
                }
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
                </svg>
                Dashboard
              </NavLink>
              
              <NavLink
                to="/jobs/new"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`
                }
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Post a Job
              </NavLink>
              
              <NavLink
                to="/companies/new"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`
                }
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Add Company
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/dashboard/user"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              My Applications
            </NavLink>
          )}

          <div className="border-t border-slate-800 my-4"></div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Account</p>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`
            }
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Profile
          </NavLink>

          <Link
            to="/jobs"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-850 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Jobs
          </Link>
        </nav>

        {/* Footer Actions inside Sidebar */}
        <div className="mt-auto space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/40 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main dashboard outlet wrapper */}
      <section className="flex-grow p-6 md:p-8 relative z-10 max-w-7xl mx-auto w-full animate-fade-in">
        {/* Navigation Breadcrumb back to site */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-900 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Workspace</span>
            <span className="text-slate-600 text-xs">/</span>
            <span className="text-sm font-medium text-indigo-400 capitalize">{auth.user?.role} Portal</span>
          </div>
          <Link 
            to="/" 
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-lg transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Site
          </Link>
        </div>

        <Outlet />
      </section>
    </div>
  );
}
