import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import { Button, InputField } from '../../components/common/index.js';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jobseeker'); // jobseeker or recruiter
  const [error, setError] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth?.token) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await auth.register(name, email, password, role);
      const nextRoute = '/home';
      navigate(nextRoute, { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      if (err?.response) {
        // Server responded with an error status
        setError(`Server error ${err.response.status}: ${err.response.data?.message || JSON.stringify(err.response.data)}`);
      } else if (err?.request) {
        // Request was made but no response received (backend not running or network issue)
        setError('Cannot reach the server. Make sure the backend is running on port 5000.');
      } else {
        setError(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-white tracking-tight">Create Account</h2>
        <p className="text-xs text-slate-400 mt-1">Join ConnectWith to discover work and hire top talent.</p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-900/50 text-red-400 text-xs font-medium flex items-start gap-2.5 animate-fade-in">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="name"
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="John Doe"
          icon={
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />

        <InputField
          id="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="name@example.com"
          icon={
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          }
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          icon={
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />

        <div className="space-y-2">
          <span className="block text-xs font-semibold text-slate-300">Register as a</span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('jobseeker')}
              className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all duration-300 cursor-pointer text-center ${
                role === 'jobseeker'
                  ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
              }`}
            >
              💻 Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setRole('recruiter')}
              className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all duration-300 cursor-pointer text-center ${
                role === 'recruiter'
                  ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
              }`}
            >
              💼 Recruiter
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-4 py-2.5 px-4 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:pointer-events-none"
          disabled={auth.loading}
        >
          {auth.loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      <div className="text-center pt-2">
        <p className="text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-350 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
