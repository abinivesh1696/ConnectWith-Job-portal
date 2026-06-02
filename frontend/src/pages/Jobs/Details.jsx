import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/jobService.js';
import useAuth from '../../hooks/useAuth.js';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    jobService
      .getJobById(id)
      .then((res) => {
        if (mounted) setJob(res.data);
      })
      .catch((err) => {
        if (mounted) setError(err?.response?.data?.message || 'Could not load job details');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) return;
    try {
      await jobService.deleteJob(id);
      navigate('/jobs');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not delete job');
    }
  };

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-4">
        <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-sm text-slate-400">Loading job specifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-sm font-semibold mb-4">
          {error}
        </div>
        <Link to="/jobs" className="text-sm font-semibold text-slate-400 hover:text-white">← Back to Jobs list</Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <span className="text-4xl">⚠️</span>
        <h4 className="text-lg font-bold text-white mt-4">Job specifications not found</h4>
        <Link to="/jobs" className="text-sm font-semibold text-blue-400 mt-4 block">← Back to Jobs list</Link>
      </div>
    );
  }

  const postedDate = job.createdAt ? new Date(job.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;

  const requirements = job.requirements || [];
  
  // Check if current user is the owner of the posting
  // The backend might return postedBy as an ID string or an object with an _id string
  const postedById = typeof job.postedBy === 'object' ? job.postedBy?._id : job.postedBy;
  const currentUserId = auth?.user?.id || auth?.user?._id;
  const isPoster = currentUserId && postedById && String(currentUserId) === String(postedById);

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
    <div className="space-y-8 py-2">
      {/* Top navigation back button */}
      <div>
        <Link 
          to="/jobs" 
          className="inline-flex items-center text-xs font-semibold text-slate-450 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs Explorer
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Job Details Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getTypeBadgeStyles(job.type)}`}>
                  {job.type}
                </span>
                {postedDate && (
                  <span className="text-[10px] text-slate-500 font-semibold bg-slate-900 border border-slate-850 px-2.5 py-1 rounded-full">
                    Posted {postedDate}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {job.title}
              </h2>

              <div className="flex items-center gap-2 text-sm text-slate-350 border-b border-slate-900 pb-5">
                {job.company ? (
                  <Link 
                    to={`/companies/${job.company._id}`} 
                    className="font-bold text-blue-400 hover:text-blue-350 transition-colors"
                  >
                    {job.company.name}
                  </Link>
                ) : (
                  <span className="font-bold text-slate-300">Independent Employer</span>
                )}
                <span className="text-slate-700">•</span>
                <span>{job.location}</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-white uppercase tracking-wider text-xs text-indigo-400">
                About The Role
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Requirements Section */}
            {requirements.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-900/60">
                <h3 className="text-base font-extrabold text-white uppercase tracking-wider text-xs text-indigo-400">
                  Required Competencies & Skills
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {requirements.map((r, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <svg className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Sidebar Action Panel (1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Action Box */}
          <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
              Job Information Summary
            </h3>

            <div className="space-y-4 text-xs text-slate-400">
              {/* Salary row */}
              <div className="flex justify-between items-center py-1.5 border-b border-slate-900/50">
                <span>Compensation</span>
                <span className="text-indigo-400 font-bold text-sm">
                  {job.salaryRange || 'Undisclosed'}
                </span>
              </div>

              {/* Location row */}
              <div className="flex justify-between items-center py-1.5 border-b border-slate-900/50">
                <span>Work Location</span>
                <span className="text-slate-200 font-semibold">{job.location}</span>
              </div>

              {/* Company Profile quick panel */}
              {job.company && (
                <div className="py-2.5 rounded-xl bg-slate-900 border border-slate-850 p-4 space-y-2 mt-4">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Hiring Organization</span>
                  <span className="text-slate-200 font-bold block">{job.company.name}</span>
                  <Link 
                    to={`/companies/${job.company._id}`}
                    className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold block"
                  >
                    View corporate profile →
                  </Link>
                </div>
              )}
            </div>

            {/* Quick buttons */}
            <div className="pt-2 flex flex-col gap-3">
              {auth?.token && auth.user?.role === 'jobseeker' && (
                <Link 
                  to={`/jobs/${id}/apply`} 
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/10 active:scale-98 transition-all text-center"
                >
                  Apply to this position
                </Link>
              )}

              {!auth?.token && (
                <Link 
                  to="/login"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white font-semibold text-sm transition-all text-center"
                >
                  Sign in to Apply
                </Link>
              )}

              {/* Poster Admin Actions */}
              {isPoster && (
                <div className="border-t border-slate-800/80 pt-4 flex flex-col gap-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Administrative Scopes</span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link 
                      to={`/jobs/${id}/edit`} 
                      className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold text-center transition-all"
                    >
                      ✏️ Edit
                    </Link>
                    <button 
                      onClick={handleDelete}
                      className="py-2 px-3 rounded-lg bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 text-red-400 text-xs font-semibold transition-all cursor-pointer"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
