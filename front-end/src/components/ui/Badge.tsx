import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'orange' | 'blue' | 'neutral' | 'green' | 'amber';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = ''
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs'
  };

  const variantStyles = {
    orange: 'bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/30',
    blue: 'bg-[#0070F3]/15 text-[#38BDF8] border border-[#0070F3]/30',
    neutral: 'bg-white/10 text-[#9CA3AF] border border-white/10',
    green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-md tracking-wide ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
