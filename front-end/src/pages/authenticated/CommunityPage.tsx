import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { memberService } from '../../services/memberService';
import { Member } from '../../types';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Search } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { currentUser, activeRole } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    memberService.getAllMembers().then(setMembers);
  }, []);

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.clubPosition.toLowerCase().includes(search.toLowerCase()) ||
    m.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="SDC Member Directory"
        subtitle="Connect with student developers, leads, and alumni"
      />

      <div className="max-w-md">
        <Input
          placeholder="Search by name, position, skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4 text-[#6B7280]" />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="glass-card flex flex-col items-center text-center p-6 relative">
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

            <Avatar src={member.photo} name={member.name} size="xl" className="ring-2 ring-white/10 my-2" />

            <h3 className="text-base font-bold text-[#F3F4F6] mt-2">{member.name}</h3>
            <p className="text-xs font-semibold text-[#FF5500]">{member.clubPosition}</p>
            <p className="text-xs text-[#9CA3AF] mt-0.5">{member.department}</p>

            <div className="flex flex-wrap justify-center gap-1.5 mt-4">
              {member.skills.slice(0, 4).map(skill => (
                <span key={skill} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-[#9CA3AF]">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
