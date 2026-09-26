import React from 'react';
import { Modal } from '../ui/Modal';
import { Member } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { ShieldCheck, Code2, Award, Calendar } from 'lucide-react';

interface DigitalMemberIDModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
}

export const DigitalMemberIDModal: React.FC<DigitalMemberIDModalProps> = ({
  isOpen,
  onClose,
  member
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Digital Member ID" maxWidth="md">
      <div className="flex flex-col items-center">
        {/* Pass ID Card Container */}
        <div className="w-full relative overflow-hidden glass-panel rounded-2xl border border-[#FF5500]/40 p-6 bg-gradient-to-b from-[#14151A] via-[#121318] to-[#0A0A0B] shadow-2xl orange-glow">
          {/* Background Decorative Accent */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#0070F3]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Badge */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF5500] flex items-center justify-center text-white">
                <Code2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-heading font-bold text-[#F3F4F6] text-sm">SDC Nexus</span>
            </div>
            <Badge variant="orange" size="sm" className="font-mono">
              OFFICIAL MEMBER ID
            </Badge>
          </div>

          {/* Member Card Body */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar
                src={member.photo}
                name={member.name}
                size="xl"
                className="ring-4 ring-[#FF5500]/30 shadow-xl"
              />
              <div className="absolute bottom-0 right-0 p-1 bg-[#FF5500] text-white rounded-full shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#F3F4F6] tracking-tight">{member.name}</h3>
            <p className="text-sm font-semibold text-[#FF5500] mt-0.5">{member.clubPosition}</p>

            {/* Member Info Fields */}
            <div className="w-full grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10 text-left">
              <div className="bg-[#181920] p-3 rounded-xl border border-white/5">
                <div className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider">Member ID</div>
                <div className="text-xs font-mono font-bold text-[#F3F4F6] mt-0.5">{member.memberId}</div>
              </div>

              <div className="bg-[#181920] p-3 rounded-xl border border-white/5">
                <div className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider">System Role</div>
                <div className="text-xs font-semibold text-[#38BDF8] mt-0.5">{member.systemRole}</div>
              </div>

              <div className="bg-[#181920] p-3 rounded-xl border border-white/5">
                <div className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider">Department</div>
                <div className="text-xs text-[#9CA3AF] mt-0.5 truncate">{member.department}</div>
              </div>

              <div className="bg-[#181920] p-3 rounded-xl border border-white/5">
                <div className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider">Academic Year</div>
                <div className="text-xs text-[#9CA3AF] mt-0.5">{member.academicYear}</div>
              </div>
            </div>

            {/* Joined Date */}
            <div className="mt-4 flex items-center gap-1.5 text-xs text-[#6B7280]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Joined: {new Date(member.joinedDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
