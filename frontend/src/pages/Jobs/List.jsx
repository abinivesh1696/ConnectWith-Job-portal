import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { jobService } from '../../services/jobService.js';
import useAuth from '../../hooks/useAuth.js';

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const auth = useAuth();

  // Initialize filters from search parameters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [type, setType] = useState(searchParams.get('type') || '');

  const fetchJobs = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobService.getJobs(params);
      setJobs(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = {};
    const s = searchParams.get('search');
    const l = searchParams.get('location');
    const t = searchParams.get('type');
    
    if (s) params.search = s;
    if (l) params.location = l;
    if (t) params.type = t;
    
    fetchJobs(params);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = {};
    if (search) newParams.search = search;
    if (location) newParams.location = location;
    if (type) newParams.type = type;
    setSearchParams(newParams);
  };

  const handleReset = () => {
    setSearch('');
    setLocation('');
    setType('');
    setSearchParams({});
  };

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
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Find your next job</h2>
          <p className="text-sm text-slate-400 mt-1">Browse hundreds of verified jobs or filter to your specific stack.</p>
        </div>
        
        {auth?.token && auth.user?.role === 'recruiter' && (
          <Link 
            to="/jobs/new" 
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/10 active:scale-98 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Post a Job
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side: Dynamic Filter Panel */}
        <div className="lg:col-span-1">
          <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 space-y-6 sticky top-24">
            <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
              <h3 className="text-base font-bold text-white">Filters</h3>
              <button 
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white font-semibold transition-colors"
              >
                Clear All
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-400">Search Keywords</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input 
                    type="text"
                    placeholder="Title, description..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-xs outline-none placeholder-slate-650 transition-all focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-400">Location</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </span>
                  <input 
                    type="text"
                    placeholder="City, State, Remote..." 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-xs outline-none placeholder-slate-650 transition-all focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-400">Employment Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                  className="block w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-xs outline-none transition-all focus:ring-2 focus:ring-blue-500/10 cursor-pointer"
                >
                  <option value="">Any Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/10 transition-colors"
              >
                Apply Filters
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Jobs List Grid */}
        <div className="lg:col-span-3 space-y-4">
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-sm text-slate-400">Loading jobs matching your parameters...</p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-sm font-semibold">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="flex justify-between items-center text-xs text-slate-500 px-1">
                <span>Showing <strong className="text-slate-300 font-bold">{jobs.length}</strong> available jobs</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {jobs.map((j) => (
                  <div 
                    key={j._id}
                    className="glass-panel glass-panel-hover border border-slate-800/80 rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Job Title & Company */}
                      <div className="space-y-1">
                        <Link 
                          to={`/jobs/${j._id}`}
                          className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors"
                        >
                          {j.title}
                        </Link>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <span className="font-semibold text-slate-300">{j.company?.name || 'Independent'}</span>
                          <span className="text-slate-600">•</span>
                          <span>{j.location}</span>
                        </div>
                      </div>

                      {/* Employment Type Badge */}
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${getTypeBadgeStyles(j.type)}`}>
                        {j.type}
                      </span>
                    </div>

                    {/* Description Snippet */}
                    <p className="text-xs text-slate-450 line-clamp-2 leading-relaxed">
                      {j.description || 'No detailed description available. Click to view full requirements.'}
                    </p>

                    <div className="border-t border-slate-900/60 pt-4 flex items-center justify-between text-xs mt-2">
                      <div className="text-slate-400">
                        {j.salaryRange ? (
                          <span className="text-indigo-400 font-semibold">{j.salaryRange}</span>
                        ) : (
                          <span className="text-slate-500 italic">Salary undisclosed</span>
                        )}
                      </div>
                      
                      <Link 
                        to={`/jobs/${j._id}`}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 group"
                      >
                        View Details
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                ))}

                {jobs.length === 0 && (
                  <div className="glass-panel border border-slate-800/50 rounded-2xl p-16 text-center shadow-lg">
                    <span className="text-4xl">🔍</span>
                    <h4 className="text-lg font-extrabold text-white mt-4">No jobs found</h4>
                    <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                      We couldn't find any job postings matching your filters. Try updating your keyword parameters or expanding your location query!
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
