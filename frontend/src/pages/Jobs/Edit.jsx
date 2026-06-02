import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { jobService } from '../../services/jobService.js';
import { companyService } from '../../services/companyService.js';

export default function JobEdit() {
  const { id } = useParams();
  const [data, setData] = useState({ 
    title: '', 
    companyId: '', 
    location: '', 
    type: 'full-time', 
    salaryRange: '', 
    description: '' 
  });
  const [requirementsText, setRequirementsText] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    Promise.all([jobService.getJobById(id), companyService.getCompanies()])
      .then(([jobRes, compsRes]) => {
        if (!mounted) return;
        const job = jobRes.data;
        setData({
          title: job.title || '',
          companyId: job.company?._id || '',
          location: job.location || '',
          type: job.type || 'full-time',
          salaryRange: job.salaryRange || '',
          description: job.description || '',
        });
        setRequirementsText(job.requirements ? job.requirements.join(', ') : '');
        setCompanies(compsRes.data || []);
      })
      .catch((err) => {
        if (mounted) setError(err?.response?.data?.message || 'Could not retrieve job specifics');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const requirements = requirementsText
        ? requirementsText.split(',').map((req) => req.trim()).filter((req) => req !== '')
        : [];
      
      const payload = { 
        ...data, 
        requirements 
      };
      
      await jobService.updateJob(id, payload);
      navigate(`/jobs/${id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not update posting details');
    }
  };

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-4">
        <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-sm text-slate-400">Loading posting history...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-2">
      {/* Back button */}
      <div className="mb-6">
        <Link 
          to={`/jobs/${id}`} 
          className="inline-flex items-center text-xs font-semibold text-slate-450 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Cancel and Back to Job Details
        </Link>
      </div>

      <div className="glass-panel border border-slate-800/85 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Edit Job Posting</h2>
          <p className="text-xs text-slate-400 mt-1">Amend posting parameters to update candidate matches in real-time.</p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-xs font-medium animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5 col-span-2">
              <label className="block text-xs font-semibold text-slate-350">Job Title</label>
              <input 
                name="title"
                value={data.title} 
                onChange={handleChange} 
                required 
                className="block w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Company */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-350">Hiring Organization</label>
              <select 
                name="companyId"
                value={data.companyId} 
                onChange={handleChange} 
                required
                className="block w-full px-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/10 cursor-pointer"
              >
                <option value="">Select corporate entity</option>
                {companies.map((c) => (
                  <option value={c._id} key={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Employment Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-350">Employment Type</label>
              <select 
                name="type"
                value={data.type} 
                onChange={handleChange}
                className="block w-full px-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/10 cursor-pointer"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            {/* Work Location */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-350">Location</label>
              <input 
                name="location"
                value={data.location} 
                onChange={handleChange} 
                className="block w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Compensation Range */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-350">Salary/Compensation Range</label>
              <input 
                name="salaryRange"
                type="text" 
                value={data.salaryRange} 
                onChange={handleChange} 
                className="block w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* Competency Requirements */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-semibold text-slate-350">Competency Requirements (Comma Separated)</label>
            <input 
              value={requirementsText} 
              onChange={(e) => setRequirementsText(e.target.value)} 
              className="block w-full px-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-350">Detailed Role Description</label>
            <textarea 
              rows="6"
              name="description"
              value={data.description} 
              onChange={handleChange} 
              required
              className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/10 resize-y min-h-[120px]"
            />
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-600/10 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Save Modifications
          </button>
        </form>
      </div>
    </div>
  );
}
