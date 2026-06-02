import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { companyService } from '../../services/companyService.js';

export default function CompanyCreate() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Helper to auto-generate slug from name
  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await companyService.createCompany({ name, slug, website, location, description });
      navigate(`/companies/${res.data._id}`, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not register corporate entity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-2">
      {/* Back button */}
      <div className="mb-6">
        <Link 
          to="/dashboard/recruiter" 
          className="inline-flex items-center text-xs font-semibold text-slate-450 hover:text-white transition-colors"
        >
          <svg className="w-4.5 h-4.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Recruiter Dashboard
        </Link>
      </div>

      <div className="glass-panel border border-slate-800/85 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Add Corporate Entity</h2>
          <p className="text-xs text-slate-400 mt-1">Register a corporate company profile to link to job opportunity postings.</p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-xs font-medium animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-350">Company Name</label>
              <input 
                value={name} 
                onChange={handleNameChange} 
                required 
                placeholder="e.g. Acme Tech Inc"
                className="block w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm placeholder-slate-650 outline-none transition-all focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-350">Corporate URI Slug (Auto-generated)</label>
              <input 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)} 
                required 
                placeholder="e.g. acme-tech-inc"
                className="block w-full px-4 py-2.5 bg-slate-950 border border-slate-850 text-slate-400 rounded-xl text-sm outline-none cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Website */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-350">Website URL</label>
              <input 
                type="url"
                value={website} 
                onChange={(e) => setWebsite(e.target.value)} 
                placeholder="e.g. https://acme.com"
                className="block w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm placeholder-slate-650 outline-none transition-all focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-350">Corporate Location</label>
              <input 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="e.g. New York, NY or Remote"
                className="block w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm placeholder-slate-650 outline-none transition-all focus:ring-2 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-350">Company Background Overview</label>
            <textarea 
              rows="6"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Provide a description of your organization's focus area, tech stack, workspace culture..."
              className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm placeholder-slate-600 outline-none transition-all focus:ring-2 focus:ring-blue-500/10 resize-y min-h-[120px]"
            />
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-600/10 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Corporate Registry...
              </>
            ) : (
              'Create Company Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
