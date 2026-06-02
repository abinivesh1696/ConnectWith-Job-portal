import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { companyService } from '../../services/companyService.js';
import useAuth from '../../hooks/useAuth.js';

export default function CompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    companyService
      .getCompany(id)
      .then((res) => {
        if (mounted) setCompany(res.data);
      })
      .catch((err) => {
        if (mounted) setError(err?.response?.data?.message || 'Could not load company details');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to remove this company profile? This action is permanent.')) return;
    try {
      await companyService.deleteCompany(id);
      navigate('/companies');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not delete corporate profile');
    }
  };

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-4">
        <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-sm text-slate-400">Loading corporate profile details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-sm font-semibold mb-4">
          {error}
        </div>
        <Link to="/companies" className="text-sm font-semibold text-slate-400 hover:text-white">← Back to Companies</Link>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <span className="text-4xl">⚠️</span>
        <h4 className="text-lg font-bold text-white mt-4">Corporate profile not found</h4>
        <Link to="/companies" className="text-sm font-semibold text-blue-400 mt-4 block">← Back to Companies</Link>
      </div>
    );
  }

  // Check ownership
  const ownerId = typeof company.owner === 'object' ? company.owner?._id : company.owner;
  const currentUserId = auth?.user?.id || auth?.user?._id;
  const isOwner = currentUserId && ownerId && String(currentUserId) === String(ownerId);

  return (
    <div className="space-y-8 py-2 animate-fade-in">
      {/* Back button */}
      <div>
        <Link 
          to="/companies" 
          className="inline-flex items-center text-xs font-semibold text-slate-455 hover:text-white transition-colors"
        >
          <svg className="w-4.5 h-4.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Corporate List
        </Link>
      </div>

      <div className="glass-panel border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Banner Glow header */}
        <div className="h-32 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-b border-slate-850/60 relative">
          <div className="absolute top-4 right-6 text-xs font-bold text-indigo-400 tracking-wider bg-slate-950/70 border border-slate-800 px-3 py-1 rounded-full">
            Verified corporate partner
          </div>
        </div>

        <div className="px-6 pb-8 pt-0 sm:px-8 relative">
          {/* Logo offset */}
          <div className="-mt-12 mb-6 flex items-end justify-between flex-wrap gap-4">
            <div className="w-24 h-24 rounded-2xl bg-slate-900 border-2 border-slate-950 flex items-center justify-center font-bold text-3xl text-indigo-400 capitalize shadow-2xl">
              {company.name ? company.name[0] : 'C'}
            </div>
            
            {/* Owner Actions */}
            {isOwner && (
              <div className="flex items-center gap-2">
                <Link 
                  to={`/companies/${id}/edit`} 
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  ✏️ Edit Profile
                </Link>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 text-red-400 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>

          {/* Profile Core */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-white">{company.name}</h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {company.location || 'Global Headquarters'}
                </span>
                
                {company.website && (
                  <>
                    <span className="text-slate-700">•</span>
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:text-blue-350 transition-colors flex items-center gap-1.5 font-semibold"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      {company.website}
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Description Block */}
            <div className="border-t border-slate-900 pt-6 space-y-3">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider text-indigo-400">
                Organization Overview
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {company.description || 'No detailed background story provided yet. This company is a registered verified entity hiring technical staff.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
