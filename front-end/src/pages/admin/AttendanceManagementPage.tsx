import React, { useState, useEffect } from 'react';
import { attendanceService } from '../../services/attendanceService';
import { memberService } from '../../services/memberService';
import { AttendanceRecord, Member } from '../../types';
import { PageHeader } from '../../components/ui/PageHeader';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { CheckCircle2, XCircle } from 'lucide-react';

export const AttendanceManagementPage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    attendanceService.getAllAttendanceRecords().then(setRecords);
    memberService.getAllMembers().then(setMembers);
  }, []);

  const columns = [
    {
      header: 'Member',
      accessor: (r: AttendanceRecord) => {
        const mem = members.find(m => m.id === r.memberId);
        return (
          <div>
            <div className="font-semibold text-[#F3F4F6]">{mem ? mem.name : r.memberId}</div>
            <div className="text-xs text-[#9CA3AF]">{mem?.clubPosition}</div>
          </div>
        );
      }
    },
    {
      header: 'Meeting Title',
      accessor: (r: AttendanceRecord) => <span className="text-xs font-semibold text-[#F3F4F6]">{r.meetingTitle}</span>
    },
    {
      header: 'Date',
      accessor: (r: AttendanceRecord) => <span className="font-mono text-xs text-[#9CA3AF]">{r.meetingDate}</span>
    },
    {
      header: 'Status',
      accessor: (r: AttendanceRecord) => (
        <Badge variant={r.attended ? 'green' : 'amber'}>
          {r.attended ? 'Attended' : 'Missed'}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Club Attendance Logs"
        subtitle="View meeting attendance records across all SDC initiatives"
        badge={<Badge variant="orange">Administrative Oversight</Badge>}
      />

      <Table
        columns={columns}
        data={records}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};
