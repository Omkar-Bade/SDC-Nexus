import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#FF5500] rounded-full" />
          <h2 className="text-lg font-bold text-[#F3F4F6] tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="mt-0.5 text-xs text-[#9CA3AF] pl-3.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
