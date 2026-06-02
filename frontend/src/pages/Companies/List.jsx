import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { companyService } from '../../services/companyService.js';
import useAuth from '../../hooks/useAuth.js';

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    let mounted = true;
    companyService
      .getCompanies()
      .then((res) => {
        if (mounted) setCompanies(res.data || []);
      })
      .catch((err) => {
        if (mounted) setError(err?.response?.data?.message || 'Could not load companies list');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-4">
        <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-sm text-slate-400">Loading verified employers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-sm font-semibold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Corporate Partners</h2>
          <p className="text-sm text-slate-400 mt-1">Discover outstanding tech organizations recruiting direct talent on ConnectWith.</p>
        </div>
        
        {auth?.token && auth.user?.role === 'recruiter' && (
          <Link 
            to="/companies/new" 
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/10 active:scale-98 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Company
          </Link>
        )}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((c) => (
          <div 
            key={c._id}
            className="glass-panel glass-panel-hover border border-slate-800/80 rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between gap-5"
          >
            {/* Top Row: Icon & Location */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center font-bold text-lg text-blue-400 capitalize flex-shrink-0 shadow-inner">
                {c.name ? c.name[0] : 'C'}
              </div>
              <div className="space-y-0.5 mt-0.5">
                <Link 
                  to={`/companies/${c._id}`}
                  className="text-base font-bold text-white hover:text-blue-400 transition-colors"
                >
                  {c.name}
                </Link>
                <div className="text-xs text-slate-450 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{c.location || 'Global/Remote'}</span>
                </div>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {c.description || 'No detailed background provided yet. Click to view company profile and related job opportunities.'}
            </p>

            {/* Bottom Row */}
            <div className="border-t border-slate-900/60 pt-4 flex items-center justify-between text-xs mt-1">
              <a 
                href={c.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-350 transition-colors truncate max-w-[150px] flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="truncate">{c.website ? c.website.replace(/^https?:\/\//i, '') : 'No website'}</span>
              </a>

              <Link 
                to={`/companies/${c._id}`}
                className="text-xs font-semibold text-blue-400 hover:text-blue-350 flex items-center gap-1 group"
              >
                View Profile
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))}

        {companies.length === 0 && (
          <div className="col-span-full glass-panel border border-slate-800/50 rounded-2xl p-16 text-center shadow-lg">
            <span className="text-4xl font-semibold">🏢</span>
            <h4 className="text-lg font-bold text-white mt-4">No companies registered</h4>
            <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
              There are currently no companies listed. If you are a recruiter, add your organization profile immediately to begin hiring!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
