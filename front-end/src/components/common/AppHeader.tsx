import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DigitalMemberIDModal } from './DigitalMemberIDModal';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { CreditCard, Search, Bell } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const { currentUser } = useAuth();
  const [isDigitalIDOpen, setIsDigitalIDOpen] = useState(false);

  if (!currentUser) return null;

  return (
    <header className="h-16 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input placeholder */}
      <div className="relative max-w-md w-full hidden sm:block">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
        <input
          type="text"
          placeholder="Search projects, tasks, members..."
          className="w-full bg-[#14151A] border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none focus:border-[#FF5500]"
        />
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Digital ID Quick Trigger */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDigitalIDOpen(true)}
          icon={<CreditCard className="w-4 h-4 text-[#FF5500]" />}
          className="text-xs"
        >
          Digital ID
        </Button>

        {/* Member Profile Avatar Indicator */}
        <div className="flex items-center gap-2 pl-3 border-l border-white/10">
          <Avatar src={currentUser.photo} name={currentUser.name} size="sm" />
          <span className="text-xs font-semibold text-[#F3F4F6] hidden md:inline">{currentUser.name}</span>
        </div>
      </div>

      {/* Digital Member ID Modal */}
      {isDigitalIDOpen && (
        <DigitalMemberIDModal
          isOpen={isDigitalIDOpen}
          onClose={() => setIsDigitalIDOpen(false)}
          member={currentUser}
        />
      )}
    </header>
  );
};
