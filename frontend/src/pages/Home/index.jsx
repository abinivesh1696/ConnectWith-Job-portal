import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

export default function Home() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryParams = [];
    if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
    if (location) queryParams.push(`location=${encodeURIComponent(location)}`);
    
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    navigate(`/jobs${queryString}`);
  };

  const trendingCategories = [
    { title: 'Software Engineering', count: '140+ open roles', icon: '💻', tag: 'software' },
    { title: 'UI/UX & Product Design', count: '85+ open roles', icon: '🎨', tag: 'design' },
    { title: 'Product Management', count: '45+ open roles', icon: '🚀', tag: 'product' },
    { title: 'Digital Marketing', count: '60+ open roles', icon: '📈', tag: 'marketing' },
  ];

  return (
    <div className="space-y-24 py-6">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto py-12 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Next Generation Job Connector
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none mb-6 animate-fade-in delay-100">
          Bridge the Gap Between <br className="hidden sm:inline" />
          <span className="text-gradient">Talent & Opportunity</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in delay-200">
          Discover handpicked career paths, track custom applications in real-time, and get connected with verified companies looking to hire talent immediately.
        </p>

        {/* Hero Search Bar */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="glass-panel border border-slate-800/80 p-2 rounded-2xl shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2 relative z-10 animate-fade-in delay-300"
        >
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-900/30 transition-colors duration-200">
            <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Job Title, Skills or Keywords..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-0 outline-none text-slate-100 text-sm w-full placeholder-slate-500 focus:ring-0"
            />
          </div>

          <div className="hidden md:block h-6 w-px bg-slate-800 align-self-center"></div>

          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-900/30 transition-colors duration-200">
            <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="City, State or Remote..." 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-0 outline-none text-slate-100 text-sm w-full placeholder-slate-500 focus:ring-0"
            />
          </div>

          <button 
            type="submit" 
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Find Jobs
          </button>
        </form>

        {/* Hero quick links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-500 animate-fade-in delay-300">
          <span>Popular Searches:</span>
          {['React', 'Remote', 'Node.js', 'Figma'].map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => {
                setSearch(kw);
                navigate(`/jobs?search=${kw}`);
              }}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {kw}
            </button>
          ))}
        </div>
      </section>

      {/* Metrics Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in delay-200">
        {[
          { num: '5,000+', text: 'Active Jobs Listed', desc: 'Over 200 categories updated daily.' },
          { num: '850+', text: 'Verified Recruiters', desc: 'Direct contact with hiring coordinators.' },
          { num: '98%', text: 'Success Matching Rate', desc: 'Helped candidates find great jobs.' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel border border-slate-800/60 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20"></div>
            <div className="text-3xl font-extrabold text-white mb-1.5">{stat.num}</div>
            <div className="text-sm font-semibold text-slate-300 mb-1">{stat.text}</div>
            <div className="text-xs text-slate-500">{stat.desc}</div>
          </div>
        ))}
      </section>

      {/* Trending Categories Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-white">Popular Sectors</h2>
            <p className="text-sm text-slate-400">Explore open opportunities across trending high-demand fields.</p>
          </div>
          <Link to="/jobs" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group">
            All categories 
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingCategories.map((cat, i) => (
            <div 
              key={i} 
              onClick={() => navigate(`/jobs?search=${cat.tag}`)}
              className="glass-panel glass-panel-hover border border-slate-800/80 rounded-2xl p-5 cursor-pointer flex items-start gap-4 relative"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/60 border border-slate-850 flex items-center justify-center text-2xl">
                {cat.icon}
              </div>
              <div className="space-y-1 mt-1">
                <h3 className="text-sm font-bold text-slate-200 group-hover:text-white">{cat.title}</h3>
                <p className="text-xs text-indigo-400/85 font-medium">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Grid Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recruiter Card */}
        <div className="glass-panel border border-slate-800/80 rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xl font-bold mb-6">
              💼
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Are you a Recruiter?</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Post roles, build your company portal, manage candidate pipelines, and directly hire qualified tech talent without administrative barriers.
            </p>
          </div>
          <div>
            <Link 
              to={auth?.token ? (auth.user?.role === 'recruiter' ? '/jobs/new' : '/dashboard/user') : '/register'}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 active:scale-98"
            >
              Start Hiring
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Candidate Card */}
        <div className="glass-panel border border-slate-800/80 rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl font-bold mb-6">
              🎯
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Looking for a Job?</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Apply to verified jobs, upload your developer profile, and monitor application timelines transparently through your personal dashboard.
            </p>
          </div>
          <div>
            <Link 
              to="/jobs" 
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-500/20 active:scale-98"
            >
              Browse Openings
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
