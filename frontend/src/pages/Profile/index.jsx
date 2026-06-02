import React from 'react';
import useAuth from '../../hooks/useAuth.js';
import { Link } from 'react-router-dom';

export default function Profile() {
  const auth = useAuth();

  const getDashboardPath = () => {
    if (auth.user?.role === 'recruiter') {
      return '/dashboard/recruiter';
    }
    return '/dashboard/user';
  };

  const mockSkills = ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JavaScript (ES6+)', 'REST APIs'];

  return (
    <div className="max-w-2xl mx-auto py-2 animate-fade-in">
      {/* Navigation header */}
      <div className="mb-6">
        <Link 
          to={getDashboardPath()} 
          className="inline-flex items-center text-xs font-semibold text-slate-450 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="glass-panel border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Banner element */}
        <div className="h-28 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-b border-slate-850/60"></div>
        
        <div className="px-6 pb-8 pt-0 sm:px-8 relative">
          
          {/* Avatar and name header row */}
          <div className="-mt-10 mb-6 flex items-end gap-4">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 border-2 border-slate-950 flex items-center justify-center font-bold text-2xl text-blue-400 capitalize shadow-xl flex-shrink-0">
              {auth.user?.name ? auth.user.name[0] : 'U'}
            </div>
            <div className="space-y-0.5 pb-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">{auth?.user?.name || 'Developer'}</h2>
              <span className="text-[10px] font-bold text-indigo-400 capitalize tracking-wider bg-indigo-950/40 border border-indigo-900/40 px-2.5 py-0.5 rounded-full inline-block">
                {auth?.user?.role || 'Jobseeker'} Account
              </span>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-6">
            <div className="border-t border-slate-900 pt-5 space-y-4">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider text-indigo-400">
                Core Account Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Full name */}
                <div className="space-y-1 p-3.5 rounded-xl bg-slate-900 border border-slate-850">
                  <span className="text-slate-500 font-bold block">Account Holder</span>
                  <span className="text-slate-200 font-semibold block">{auth?.user?.name || 'Unavailable'}</span>
                </div>

                {/* Email address */}
                <div className="space-y-1 p-3.5 rounded-xl bg-slate-900 border border-slate-850">
                  <span className="text-slate-500 font-bold block">Email Address</span>
                  <span className="text-slate-200 font-semibold block truncate">{auth?.user?.email || 'Unavailable'}</span>
                </div>
              </div>
            </div>

            {/* Optional Skills tags for jobseekers */}
            {auth?.user?.role === 'jobseeker' && (
              <div className="border-t border-slate-900 pt-6 space-y-3">
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider text-indigo-400">
                  Technical Core Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mockSkills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-850 text-[11px] font-bold text-slate-350 hover:text-white hover:border-slate-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Profile editable status alert */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-850 text-xs text-slate-450 leading-relaxed text-center">
              💡 Profile update fields (avatar upload, credentials portfolio, work history) will be fully customisable in the next deployment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
