import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { applicationService } from '../../services/applicationService.js';
import useAuth from '../../hooks/useAuth.js';

export default function JobApply() {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!auth?.token) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <span className="text-4xl">🔐</span>
        <h4 className="text-lg font-bold text-white">Login required</h4>
        <p className="text-xs text-slate-400">Please sign in to your jobseeker account to apply for this posting.</p>
        <Link to="/login" className="inline-block px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors">Sign In</Link>
      </div>
    );
  }

  if (auth.user?.role !== 'jobseeker') {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <span className="text-4xl">🚫</span>
        <h4 className="text-lg font-bold text-white">Action Restricted</h4>
        <p className="text-xs text-slate-400">Only registered Job Seekers are authorized to submit job applications.</p>
        <Link to="/jobs" className="inline-block px-5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold text-xs transition-colors">Back to Jobs Explorer</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await applicationService.applyJob(id, { coverLetter, resumeUrl });
      setSuccess(true);
      navigate('/dashboard/user');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not submit application. Please check fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-2 animate-fade-in">
      {/* Back button */}
      <div className="mb-6">
        <Link 
          to={`/jobs/${id}`} 
          className="inline-flex items-center text-xs font-semibold text-slate-450 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Job Details
        </Link>
      </div>

      <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Submit Job Application</h2>
          <p className="text-xs text-slate-400 mt-1">Introduce yourself and showcase your credentials to the hiring team.</p>
        </div>

        {success && (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 text-emerald-400 text-xs font-medium animate-fade-in">
            ✓ Application submitted successfully. Redirecting...
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-xs font-medium animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Cover Letter */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-350">Cover Letter / Pitch</label>
            <textarea 
              rows="6"
              value={coverLetter} 
              onChange={(e) => setCoverLetter(e.target.value)} 
              required
              placeholder="Why are you a great match? Highlight your relevant projects, experience, and why you are excited about this role..."
              className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm placeholder-slate-600 outline-none transition-all focus:ring-2 focus:ring-blue-500/10 resize-y min-h-[140px]"
            />
          </div>

          {/* Resume Link */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-350">Online Resume / Portfolio Link</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </span>
              <input 
                type="url"
                value={resumeUrl} 
                onChange={(e) => setResumeUrl(e.target.value)} 
                placeholder="e.g. https://myportfolio.com/resume.pdf"
                className="block w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-slate-200 text-sm placeholder-slate-650 outline-none transition-all focus:ring-2 focus:ring-blue-500/10"
              />
            </div>
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
                Submitting Application...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
