import React from 'react';

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/10',
  secondary: 'bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800',
  ghost: 'text-slate-200 hover:text-white',
  
};

export default function Button({ type = 'button', variant = 'primary', className = '', children, ...props }) {
  const styles = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none ${styles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
  
}
