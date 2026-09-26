import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/projectService';
import { taskService } from '../../services/taskService';
import { meetingService } from '../../services/meetingService';
import { attendanceService } from '../../services/attendanceService';
import { Project, Task, Meeting, AttendanceRecord } from '../../types';
import { PageHeader } from '../../components/ui/PageHeader';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { DigitalMemberIDModal } from '../../components/common/DigitalMemberIDModal';
import {
  FolderKanban,
  CheckSquare,
  Calendar,
  Clock,
  CreditCard,
  Plus,
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentUser, activeRole } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isDigitalIDOpen, setIsDigitalIDOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    projectService.getProjectsForMember(currentUser.id).then(setProjects);
    taskService.getTasksForMember(currentUser.id).then(setTasks);
    meetingService.getMeetingsForMember(currentUser.id).then(setMeetings);
    attendanceService.getAttendanceForMember(currentUser.id).then(setAttendance);
  }, [currentUser]);

  if (!currentUser) return null;

  const attendedCount = attendance.filter(a => a.attended).length;
  const totalMeetings = attendance.length;

  return (
    <div className="space-y-8">
      {/* Page Greeting & Header */}
      <PageHeader
        title={`Welcome back, ${currentUser.name.split(' ')[0]}`}
        subtitle={`System Role: ${activeRole} | Position: ${currentUser.clubPosition}`}
        badge={<Badge variant="orange">{activeRole}</Badge>}
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDigitalIDOpen(true)}
            icon={<CreditCard className="w-4 h-4 text-[#FF5500]" />}
          >
            Digital Member ID
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverEffect={false} className="glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">My Projects</span>
            <FolderKanban className="w-5 h-5 text-[#FF5500]" />
          </div>
          <div className="mt-3 text-2xl font-bold font-mono text-[#F3F4F6]">{projects.length}</div>
          <p className="mt-1 text-xs text-[#6B7280]">Active project assignments</p>
        </Card>

        <Card hoverEffect={false} className="glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">Assigned Tasks</span>
            <CheckSquare className="w-5 h-5 text-[#0070F3]" />
          </div>
          <div className="mt-3 text-2xl font-bold font-mono text-[#F3F4F6]">{tasks.length}</div>
          <p className="mt-1 text-xs text-[#6B7280]">Pending sprint tasks</p>
        </Card>

        <Card hoverEffect={false} className="glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">Upcoming Meetings</span>
            <Calendar className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="mt-3 text-2xl font-bold font-mono text-[#F3F4F6]">{meetings.length}</div>
          <p className="mt-1 text-xs text-[#6B7280]">Scheduled syncs</p>
        </Card>

        <Card hoverEffect={false} className="glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">Attendance</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="mt-3 text-2xl font-bold font-mono text-[#F3F4F6]">
            {attendedCount} / {totalMeetings > 0 ? totalMeetings : 4}
          </div>
          <p className="mt-1 text-xs text-[#6B7280]">Meetings attended</p>
        </Card>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Projects & Tasks) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Current Projects */}
          <div>
            <SectionHeading
              title="My Assigned Projects"
              subtitle="Projects you are currently contributing to or leading"
              action={
                <Link to="/projects">
                  <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                    View All
                  </Button>
                </Link>
              }
            />
            <div className="space-y-3">
              {projects.length > 0 ? (
                projects.map((p) => (
                  <Card key={p.id} className="glass-card flex items-center justify-between p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-[#F3F4F6]">{p.name}</h4>
                        <Badge variant={p.state === 'Active' ? 'orange' : 'blue'}>{p.state}</Badge>
                      </div>
                      <p className="text-xs text-[#9CA3AF] mt-1 line-clamp-1">{p.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {p.technologies.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#9CA3AF]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link to={`/projects/${p.id}`}>
                      <Button variant="secondary" size="sm">
                        Open Project
                      </Button>
                    </Link>
                  </Card>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-[#9CA3AF] bg-[#121318] rounded-xl border border-white/5">
                  No projects assigned yet.
                </div>
              )}
            </div>
          </div>

          {/* Assigned Tasks */}
          <div>
            <SectionHeading
              title="Assigned Sprint Tasks"
              subtitle="Tasks assigned to you across projects"
              action={
                <Link to="/tasks">
                  <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                    View Tasks
                  </Button>
                </Link>
              }
            />
            <div className="space-y-3">
              {tasks.length > 0 ? (
                tasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 bg-[#121318] border border-white/10 rounded-xl hover:border-white/20 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-[#F3F4F6]">{t.title}</h4>
                      <p className="text-xs text-[#9CA3AF] mt-1">{t.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-[#6B7280]">
                        <span>Project: <strong className="text-[#9CA3AF]">{t.projectName}</strong></span>
                        <span>Deadline: <strong className="text-[#FF5500] font-mono">{t.deadline}</strong></span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-[#9CA3AF] bg-[#121318] rounded-xl border border-white/5">
                  No pending tasks assigned.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Upcoming Meetings & Quick Actions) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Upcoming Meetings */}
          <div>
            <SectionHeading title="Upcoming Meetings" />
            <div className="space-y-3">
              {meetings.length > 0 ? (
                meetings.map((m) => (
                  <Card key={m.id} hoverEffect={false} className="p-4 border-l-4 border-l-[#FF5500]">
                    <h4 className="text-sm font-semibold text-[#F3F4F6]">{m.title}</h4>
                    <div className="mt-2 space-y-1 text-xs text-[#9CA3AF]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#FF5500]" />
                        <span>{m.date} ({m.time})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{m.location}</span>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-[#9CA3AF] bg-[#121318] rounded-xl border border-white/5">
                  No upcoming meetings scheduled.
                </div>
              )}
            </div>
          </div>

          {/* Responsibilities & Quick Actions */}
          <Card className="glass-card space-y-4">
            <h3 className="text-sm font-bold text-[#F3F4F6] uppercase tracking-wider">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/profile" className="block">
                <Button variant="secondary" className="w-full justify-start text-xs">
                  View Professional Profile
                </Button>
              </Link>
              <Link to="/meetings" className="block">
                <Button variant="secondary" className="w-full justify-start text-xs">
                  Check Meeting Schedule
                </Button>
              </Link>
              <Link to="/attendance" className="block">
                <Button variant="secondary" className="w-full justify-start text-xs">
                  View Attendance History
                </Button>
              </Link>
            </div>
          </Card>
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
    </div>
  );
};
