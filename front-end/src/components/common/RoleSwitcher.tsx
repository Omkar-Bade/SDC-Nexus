import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SystemRole } from '../../types';
import { Shield, ChevronUp, ChevronDown, Check } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { activeRole, switchRole, currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const roles: { role: SystemRole; label: string; desc: string }[] = [
    {
      role: 'Faculty Coordinator',
      label: 'Faculty Coordinator',
      desc: 'Final Administrator (Full access + Position Mgmt)'
    },
    {
      role: 'Club President',
      label: 'Club President',
      desc: 'Executive access (All profiles + Club projects)'
    },
    {
      role: 'Project Leader',
      label: 'Project Leader',
      desc: 'Project Lead (Project members + Tasks)'
    },
    {
      role: 'Member',
      label: 'Normal Member',
      desc: 'Member view (Own profile & assigned tasks)'
    },
    {
      role: 'Alumni',
      label: 'Alumni',
      desc: 'Alumni status (Public profile & community)'
    }
  ];

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div className="mb-2 w-72 glass-modal rounded-xl p-3 border border-[#FF5500]/30 shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            <span className="flex items-center gap-1.5 text-[#FF5500]">
              <Shield className="w-3.5 h-3.5" /> Dev Role Preview
            </span>
            <span className="text-[10px] text-[#6B7280]">Mock Control</span>
          </div>

          <div className="space-y-1">
            {roles.map(r => (
              <button
                key={r.role}
                onClick={() => {
                  switchRole(r.role);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                  activeRole === r.role
                    ? 'bg-[#FF5500]/20 border border-[#FF5500]/40 text-[#F3F4F6]'
                    : 'hover:bg-white/5 text-[#9CA3AF] hover:text-[#F3F4F6]'
                }`}
              >
                <div>
                  <div className="font-semibold">{r.label}</div>
                  <div className="text-[10px] text-[#6B7280]">{r.desc}</div>
                </div>
                {activeRole === r.role && <Check className="w-4 h-4 text-[#FF5500] shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-[#14151A] hover:bg-[#1E2028] border border-[#FF5500]/40 text-[#F3F4F6] text-xs font-medium rounded-full shadow-lg shadow-black/80 transition-all hover:scale-105"
      >
        <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
        <span className="font-mono text-[#FF5500]">Role:</span>
        <span className="font-semibold">{activeRole}</span>
        {currentUser && <span className="text-[#6B7280] hidden sm:inline">({currentUser.name.split(' ')[0]})</span>}
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
