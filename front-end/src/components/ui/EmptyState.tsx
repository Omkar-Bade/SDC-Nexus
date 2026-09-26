import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border border-dashed border-white/15 my-4">
      {icon && <div className="p-3 bg-[#1E2028] text-[#FF5500] rounded-xl mb-3">{icon}</div>}
      <h4 className="text-base font-semibold text-[#F3F4F6]">{title}</h4>
      <p className="mt-1 text-sm text-[#9CA3AF] max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
