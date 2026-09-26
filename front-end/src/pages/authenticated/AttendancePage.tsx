import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { attendanceService } from '../../services/attendanceService';
import { AttendanceRecord } from '../../types';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    attendanceService.getAttendanceForMember(currentUser.id).then(setAttendance);
  }, [currentUser]);

  const totalArranged = attendance.length;
  const attendedCount = attendance.filter(a => a.attended).length;
  const missedCount = totalArranged - attendedCount;

  const columns = [
    {
      header: 'Meeting Title',
      accessor: (item: AttendanceRecord) => (
        <span className="font-semibold text-[#F3F4F6]">{item.meetingTitle}</span>
      )
    },
    {
      header: 'Date',
      accessor: (item: AttendanceRecord) => (
        <span className="font-mono text-xs text-[#9CA3AF]">{item.meetingDate}</span>
      )
    },
    {
      header: 'Status',
      accessor: (item: AttendanceRecord) => (
        <Badge variant={item.attended ? 'green' : 'amber'}>
          {item.attended ? 'Attended' : 'Missed'}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Attendance Record"
        subtitle="Transparent history of arranged sprint meetings and recorded attendance"
      />

      {/* Attendance Summary Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card hoverEffect={false} className="glass-card">
          <div className="text-xs font-semibold uppercase text-[#9CA3AF]">Total Meetings Arranged</div>
          <div className="text-2xl font-bold font-mono text-[#F3F4F6] mt-2">{totalArranged}</div>
        </Card>

        <Card hoverEffect={false} className="glass-card">
          <div className="text-xs font-semibold uppercase text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Meetings Attended
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-2">{attendedCount}</div>
        </Card>

        <Card hoverEffect={false} className="glass-card">
          <div className="text-xs font-semibold uppercase text-amber-400 flex items-center gap-1.5">
            <XCircle className="w-4 h-4" /> Meetings Missed
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-2">{missedCount}</div>
        </Card>
      </div>

      {/* Attendance History Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#F3F4F6]">Meeting History Log</h2>
        <Table
          columns={columns}
          data={attendance}
          keyExtractor={(item) => item.id}
          emptyMessage="No attendance records logged yet."
        />
      </div>
    </div>
  );
};
