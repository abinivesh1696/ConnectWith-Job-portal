import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import { jobService } from '../../services/jobService.js';
import { companyService } from '../../services/companyService.js';

export default function RecruiterDashboard() {
  const auth = useAuth();
  const [jobs, setJobs] = useState([]);
  const [companyCount, setCompanyCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = auth?.user?.id || auth?.user?._id;

  useEffect(() => {
    let mounted = true;
    if (!userId) {
      setLoading(false);
      return;
    }

    // Load jobs posted by this user, and companies
    Promise.all([
      jobService.getJobs({ postedBy: userId }),
      companyService.getCompanies() // Filter to user's companies if backend allowed, otherwise just list count
    ])
      .then(([jobsRes, compsRes]) => {
        if (!mounted) return;
        setJobs(jobsRes.data || []);
        
        // Filter companies owned by this user
        const ownedComps = (compsRes.data || []).filter(
          c => String(c.owner?._id || c.owner) === String(userId)
        );
        setCompanyCount(ownedComps.length);
      })
      .catch((err) => {
        if (mounted) setError(err?.response?.data?.message || 'Could not load workspace assets');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [userId]);

  const getTypeBadgeStyles = (jobType) => {
    switch (jobType?.toLowerCase()) {
      case 'full-time':
        return 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40';
      case 'part-time':
        return 'bg-amber-950/40 text-amber-400 border border-amber-800/40';
      case 'contract':
        return 'bg-blue-950/40 text-blue-400 border border-blue-800/40';
      case 'internship':
        return 'bg-purple-950/40 text-purple-400 border border-purple-800/40';
      default:
        return 'bg-slate-900 border border-slate-800 text-slate-400';
    }
  };

  return (
    <div className="space-y-8 py-2 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Recruiter Workspace</h2>
          <p className="text-sm text-slate-400 mt-1">Manage corporate entities, publish job postings, and review matching applicants.</p>
        </div>
        <div className="flex gap-2">
          <Link 
            to="/companies/new"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            🏢 Add Company
          </Link>
          <Link 
            to="/jobs/new"
            className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            💼 Publish Job
          </Link>
        </div>
      </div>

      {/* Metrics Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 shadow-lg">
          <div className="text-3xl font-extrabold text-white mb-1">{jobs.length}</div>
          <div className="text-xs font-bold text-slate-350">Active Job Postings</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Opportunities visible to all candidates.</div>
        </div>

        <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 shadow-lg">
          <div className="text-3xl font-extrabold text-white mb-1">{companyCount}</div>
          <div className="text-xs font-bold text-slate-350">Linked Company Profiles</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Organizations registered under your account.</div>
        </div>
      </section>

      {/* Posted Jobs Section */}
      <section className="glass-panel border border-slate-800/85 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
          <h3 className="text-base font-bold text-white">Your Published Openings</h3>
          <span className="text-[11px] text-slate-450 font-bold bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">
            {jobs.length} total
          </span>
        </div>

        {loading && (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <svg className="animate-spin h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-xs text-slate-400">Loading opening logs...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-xs font-semibold">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {jobs.length === 0 ? (
              <div className="py-12 text-center max-w-sm mx-auto space-y-3">
                <span className="text-3xl">📭</span>
                <h4 className="text-sm font-extrabold text-white">No active postings</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  You haven't posted any job listings under your account yet. Let's create your first posting now!
                </p>
                <Link 
                  to="/jobs/new"
                  className="inline-block mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Create First Posting
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="text-slate-450 border-b border-slate-800/80 font-bold">
                      <th className="pb-3.5 pl-2">Job Title</th>
                      <th className="pb-3.5">Hiring Corporate Entity</th>
                      <th className="pb-3.5">Employment Type</th>
                      <th className="pb-3.5 text-right pr-2">Administrative Scopes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60">
                    {jobs.map((job) => (
                      <tr key={job._id} className="hover:bg-slate-900/25 transition-colors group">
                        <td className="py-3.5 pl-2 font-bold text-slate-200 group-hover:text-white">
                          <Link to={`/jobs/${job._id}`} className="hover:text-blue-400 transition-colors">
                            {job.title}
                          </Link>
                        </td>
                        <td className="py-3.5 text-slate-350">
                          {job.company?.name || 'Independent'}
                        </td>
                        <td className="py-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold capitalize ${getTypeBadgeStyles(job.type)}`}>
                            {job.type}
                          </span>
                        </td>
                        <td className="py-3.5 text-right pr-2">
                          <div className="inline-flex gap-2">
                            <Link 
                              to={`/jobs/${job._id}`}
                              className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-[10px]"
                            >
                              👁️ View
                            </Link>
                            <Link 
                              to={`/jobs/${job._id}/edit`}
                              className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-[10px]"
                            >
                              ✏️ Edit
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
