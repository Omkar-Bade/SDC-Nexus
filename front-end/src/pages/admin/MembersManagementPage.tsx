import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { memberService } from '../../services/memberService';
import { Member } from '../../types';
import { PageHeader } from '../../components/ui/PageHeader';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import { Search, Eye } from 'lucide-react';

export const MembersManagementPage: React.FC = () => {
  const { currentUser, activeRole } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    memberService.getAllMembers().then(setMembers);
  }, []);

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.memberId.toLowerCase().includes(search.toLowerCase()) ||
    m.clubPosition.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Member',
      accessor: (m: Member) => (
        <div className="flex items-center gap-3">
          <Avatar src={m.photo} name={m.name} size="sm" />
          <div>
            <div className="font-semibold text-[#F3F4F6]">{m.name}</div>
            <div className="text-xs text-[#9CA3AF]">{m.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Member ID',
      accessor: (m: Member) => <span className="font-mono text-xs text-[#FF5500]">{m.memberId}</span>
    },
    {
      header: 'Position',
      accessor: (m: Member) => <span className="text-xs font-semibold text-[#F3F4F6]">{m.clubPosition}</span>
    },
    {
      header: 'System Role',
      accessor: (m: Member) => (
        <Badge
          variant={
            m.systemRole === 'Faculty Coordinator' ? 'orange' :
            m.systemRole === 'Club President' ? 'blue' :
            m.systemRole === 'Alumni' ? 'amber' : 'neutral'
          }
        >
          {m.systemRole}
        </Badge>
      )
    },
    {
      header: 'Department',
      accessor: (m: Member) => <span className="text-xs text-[#9CA3AF]">{m.department}</span>
    },
    {
      header: 'Actions',
      accessor: (m: Member) => {
        const canViewProfile = currentUser ? memberService.canAccessProfile(currentUser, m) : false;
        if (!canViewProfile) return <span className="text-xs text-[#6B7280]">Restricted</span>;

        return (
          <Link to={`/admin/members/${m.id}`} className="text-[#FF5500] hover:underline text-xs flex items-center gap-1 font-semibold">
            <Eye className="w-3.5 h-3.5" /> View Profile
          </Link>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Member Directory Administration"
        subtitle="Manage member profiles, system roles, and authorization levels"
        badge={<Badge variant="orange">{activeRole}</Badge>}
      />

      <div className="max-w-md">
        <Input
          placeholder="Search member name, ID, position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4 text-[#6B7280]" />}
        />
      </div>

      <Table
        columns={columns}
        data={filteredMembers}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};
