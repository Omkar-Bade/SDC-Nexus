import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div
      className={`bg-[#121318] border border-white/10 rounded-xl p-5 transition-all duration-200 ${
        hoverEffect ? 'hover:border-[#FF5500]/40 hover:bg-[#161720] hover:shadow-lg hover:shadow-black/50' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
