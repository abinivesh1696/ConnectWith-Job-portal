import React from 'react';

export default function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  className = '',
  ...props
})
{
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl text-white text-sm placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-500/20 ${className}`.trim()}
          {...props}
        />
      </div>
    </div>
  );
}
