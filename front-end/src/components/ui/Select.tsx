import React from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-1.5">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full bg-[#121318] border border-white/10 text-[#F3F4F6] text-sm rounded-lg px-3.5 py-2.5 transition-all duration-200 focus:outline-none focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] ${
          error ? 'border-red-500/60' : ''
        } ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-[#14151A] text-[#F3F4F6]">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};
