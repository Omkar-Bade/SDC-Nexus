import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = '', glow = false }) => {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 ${
        glow ? 'orange-glow border-[#FF5500]/30' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
