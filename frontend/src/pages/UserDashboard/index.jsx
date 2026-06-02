import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import { applicationService } from '../../services/applicationService.js';

export default function UserDashboard() {
  const auth = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Derive user ID dynamically
  const userId = auth?.user?.id || auth?.user?._id;

  useEffect(() => {
    let mounted = true;
    if (!userId) {
      setLoading(false);
      return;
    }

    applicationService
      .getUserApplications(userId)
      .then((res) => {
        if (mounted) setApplications(res.data || []);
      })
      .catch((err) => {
        if (mounted) setError(err?.response?.data?.message || 'Could not retrieve application history');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [userId]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-amber-950/40 text-amber-400 border border-amber-800/40';
      case 'reviewed':
        return 'bg-blue-950/40 text-blue-400 border border-blue-800/40';
      case 'accepted':
      case 'approved':
      case 'selected':
        return 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40';
      case 'rejected':
      case 'declined':
        return 'bg-red-950/40 text-red-400 border border-red-900/40';
      default:
        return 'bg-slate-900 border border-slate-800 text-slate-450';
    }
  };

  const getPendingCount = () => applications.filter(a => a.status?.toLowerCase() === 'pending').length;
  const getAcceptedCount = () => applications.filter(a => ['accepted', 'approved', 'selected'].includes(a.status?.toLowerCase())).length;

  return (
    <div className="space-y-8 py-2">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {auth?.user?.name || 'Candidate'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">Monitor applications, coordinate interviews, and manage your technical profile.</p>
        </div>
        <Link 
          to="/profile" 
          className="px-4.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-2"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Modify Profile
        </Link>
      </div>

      {/* Metrics Panel */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { num: applications.length, label: 'Applications Submitted', desc: 'Active submissions tracked.', bg: 'from-blue-600/5 to-indigo-600/5' },
          { num: getPendingCount(), label: 'Awaiting Response', desc: 'Pending coordinator review.', bg: 'from-amber-600/5 to-yellow-600/5' },
          { num: getAcceptedCount(), label: 'Interview Offers', desc: 'Accepted application stages.', bg: 'from-emerald-600/5 to-teal-600/5' },
        ].map((m, i) => (
          <div key={i} className="glass-panel border border-slate-800/80 rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="text-3xl font-extrabold text-white mb-1">{m.num}</div>
            <div className="text-xs font-bold text-slate-350">{m.label}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{m.desc}</div>
          </div>
        ))}
      </section>

      {/* Applications Table Section */}
      <section className="glass-panel border border-slate-800/85 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white">Application Timeline</h3>
        </div>

        {loading && (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <svg className="animate-spin h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-xs text-slate-400">Loading timeline data...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-xs font-semibold">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {applications.length === 0 ? (
              <div className="py-12 text-center max-w-sm mx-auto space-y-3">
                <span className="text-3xl">📝</span>
                <h4 className="text-sm font-extrabold text-white">No active applications</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  You haven't submitted any job applications yet. Visit the Jobs Explorer to find roles matching your stack!
                </p>
                <Link 
                  to="/jobs"
                  className="inline-block mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Explore Job Openings
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="text-slate-450 border-b border-slate-800/80 font-bold">
                      <th className="pb-3.5 pl-2">Job Position</th>
                      <th className="pb-3.5">Hiring Company</th>
                      <th className="pb-3.5">Date Applied</th>
                      <th className="pb-3.5 text-right pr-2">Tracking Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60">
                    {applications.map((app) => (
                      <tr key={app._id} className="hover:bg-slate-900/25 transition-colors group">
                        <td className="py-3.5 pl-2 font-bold text-slate-200 group-hover:text-white">
                          {app.job ? (
                            <Link to={`/jobs/${app.job._id}`} className="hover:text-blue-400 transition-colors">
                              {app.job.title}
                            </Link>
                          ) : (
                            <span className="text-slate-500 italic">Job posting removed</span>
                          )}
                        </td>
                        <td className="py-3.5 text-slate-350">
                          {app.job?.company?.name || 'Independent'}
                        </td>
                        <td className="py-3.5 text-slate-400">
                          {new Date(app.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="py-3.5 text-right pr-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${getStatusBadge(app.status)}`}>
                            {app.status}
                          </span>
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
