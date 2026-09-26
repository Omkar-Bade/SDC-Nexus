import React, { useState, useEffect } from 'react';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import { memberService } from '../../services/memberService';
import { Member } from '../../types';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Search, Globe, Link as LinkIcon } from 'lucide-react';

export const PublicCommunityPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  useEffect(() => {
    memberService.getAllMembers().then(setMembers);
  }, []);

  const roles = ['All', 'Faculty Coordinator', 'Club President', 'Project Leader', 'Member', 'Alumni'];

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.clubPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = selectedRole === 'All' || m.systemRole === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F3F4F6] flex flex-col subtle-grid-bg">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <Badge variant="orange" className="mb-2">SDC NETWORK</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#F3F4F6]">Member Directory</h1>
          <p className="mt-2 text-sm text-[#9CA3AF]">
            Discover student developers, project leaders, alumni, and faculty advisors in the SDC ecosystem.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#14151A] p-4 rounded-xl border border-white/10">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Search by name, position, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-[#6B7280]" />}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  selectedRole === role
                    ? 'bg-[#FF5500] text-white shadow-sm shadow-[#FF5500]/20'
                    : 'bg-[#1E2028] text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#282B36]'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <Card key={member.id} className="glass-card flex flex-col items-center text-center p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge
                  variant={
                    member.systemRole === 'Faculty Coordinator' ? 'orange' :
                    member.systemRole === 'Club President' ? 'blue' :
                    member.systemRole === 'Alumni' ? 'amber' : 'neutral'
                  }
                >
                  {member.systemRole}
                </Badge>
              </div>

              <Avatar
                src={member.photo}
                name={member.name}
                size="xl"
                className="ring-2 ring-white/10 my-2"
              />

              <h3 className="text-lg font-bold text-[#F3F4F6] mt-2">{member.name}</h3>
              <p className="text-xs font-semibold text-[#FF5500] mt-0.5">{member.clubPosition}</p>
              <p className="text-xs text-[#9CA3AF] mt-1">{member.department}</p>

              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {member.skills.slice(0, 4).map(skill => (
                  <span key={skill} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-[#9CA3AF]">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10 w-full justify-center text-xs text-[#6B7280]">
                {member.githubUrl && (
                  <a href={member.githubUrl} target="_blank" rel="noreferrer" className="hover:text-[#FF5500] flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
                {member.linkedinUrl && (
                  <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-[#FF5500] flex items-center gap-1">
                    <LinkIcon className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
