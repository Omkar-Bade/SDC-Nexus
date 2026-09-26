import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/projectService';
import { taskService } from '../../services/taskService';
import { attendanceService } from '../../services/attendanceService';
import { Project, Task, AttendanceRecord } from '../../types';
import { PageHeader } from '../../components/ui/PageHeader';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { DigitalMemberIDModal } from '../../components/common/DigitalMemberIDModal';
import {
  CreditCard,
  FolderKanban,
  CheckSquare,
  Clock,
  Globe,
  Link as LinkIcon,
  Calendar,
  ShieldCheck,
  Mail
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isDigitalIDOpen, setIsDigitalIDOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    projectService.getProjectsForMember(currentUser.id).then(setProjects);
    taskService.getTasksForMember(currentUser.id).then(setTasks);
    attendanceService.getAttendanceForMember(currentUser.id).then(setAttendance);
  }, [currentUser]);

  if (!currentUser) return null;

  const attendedCount = attendance.filter(a => a.attended).length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Member Profile"
        subtitle="Professional SDC club profile and project contributions"
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDigitalIDOpen(true)}
            icon={<CreditCard className="w-4 h-4 text-[#FF5500]" />}
          >
            Open Digital Member ID
          </Button>
        }
      />

      {/* Main Profile Header Card */}
      <Card className="glass-panel p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar
            src={currentUser.photo}
            name={currentUser.name}
            size="xl"
            className="ring-4 ring-[#FF5500]/30 shadow-2xl"
          />

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h2 className="text-2xl font-bold font-heading text-[#F3F4F6]">{currentUser.name}</h2>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Badge variant="orange">{currentUser.clubPosition}</Badge>
                <Badge variant="blue">{currentUser.systemRole}</Badge>
              </div>
            </div>

            <p className="text-xs text-[#9CA3AF] font-mono">Member ID: {currentUser.memberId}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#9CA3AF] pt-2">
              <div>Department: <strong className="text-[#F3F4F6]">{currentUser.department}</strong></div>
              <div>Academic Year: <strong className="text-[#F3F4F6]">{currentUser.academicYear}</strong></div>
              <div>Email: <strong className="text-[#F3F4F6]">{currentUser.email}</strong></div>
              <div>Joined: <strong className="text-[#F3F4F6]">{currentUser.joinedDate}</strong></div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-4">
              {currentUser.githubUrl && (
                <a href={currentUser.githubUrl} target="_blank" rel="noreferrer" className="text-[#9CA3AF] hover:text-[#FF5500] flex items-center gap-1 text-xs">
                  <Globe className="w-4 h-4" /> GitHub
                </a>
              )}
              {currentUser.linkedinUrl && (
                <a href={currentUser.linkedinUrl} target="_blank" rel="noreferrer" className="text-[#9CA3AF] hover:text-[#FF5500] flex items-center gap-1 text-xs">
                  <LinkIcon className="w-4 h-4" /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Skills Section */}
      <div>
        <SectionHeading title="Technical Skills" subtitle="Technologies & developer competencies" />
        <Card className="glass-card">
          <div className="flex flex-wrap gap-2">
            {currentUser.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-[#FF5500]/15 border border-[#FF5500]/30 text-xs font-mono text-[#FF5500] font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Projects Section */}
      <div>
        <SectionHeading title="Current & Assigned Projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <Card key={proj.id} className="glass-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-[#F3F4F6]">{proj.name}</h4>
                  <Badge variant={proj.state === 'Active' ? 'orange' : 'blue'}>{proj.state}</Badge>
                </div>
                <p className="text-xs text-[#9CA3AF] line-clamp-2">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.technologies.map(t => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#9CA3AF]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#6B7280]">
                Leader: <span className="text-[#9CA3AF]">{proj.leaderName}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Assigned Tasks & Attendance History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Assigned Tasks */}
        <div>
          <SectionHeading title="Assigned Sprint Tasks" />
          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} hoverEffect={false} className="p-4">
                <h4 className="text-sm font-semibold text-[#F3F4F6]">{task.title}</h4>
                <p className="text-xs text-[#9CA3AF] mt-1">{task.description}</p>
                <div className="flex items-center justify-between mt-3 text-[11px] text-[#6B7280]">
                  <span>Project: {task.projectName}</span>
                  <span className="font-mono text-[#FF5500]">Deadline: {task.deadline}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Attendance Summary */}
        <div>
          <SectionHeading title="Attendance Summary" />
          <Card className="glass-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-semibold uppercase text-[#9CA3AF]">Meeting Attendance Ratio</span>
              <span className="text-sm font-mono font-bold text-[#FF5500]">
                {attendedCount} / {attendance.length || 4} Attended
              </span>
            </div>

            <div className="space-y-2">
              {attendance.map((att) => (
                <div key={att.id} className="flex items-center justify-between text-xs p-2.5 rounded bg-[#181920]">
                  <div>
                    <div className="font-medium text-[#F3F4F6]">{att.meetingTitle}</div>
                    <div className="text-[10px] text-[#6B7280] font-mono">{att.meetingDate}</div>
                  </div>
                  <Badge variant={att.attended ? 'green' : 'amber'}>
                    {att.attended ? 'Attended' : 'Missed'}
                  </Badge>
                </div>
              ))}
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
