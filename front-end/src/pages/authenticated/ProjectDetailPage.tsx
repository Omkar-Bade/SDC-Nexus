import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectService } from '../../services/projectService';
import { taskService } from '../../services/taskService';
import { meetingService } from '../../services/meetingService';
import { memberService } from '../../services/memberService';
import { Project, Task, Meeting, Member } from '../../types';
import { PageHeader } from '../../components/ui/PageHeader';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import {
  FolderKanban,
  Users,
  CheckSquare,
  Calendar,
  Globe,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!projectId) return;
    projectService.getProjectById(projectId).then(p => {
      setProject(p);
      if (p) {
        taskService.getTasksForProject(p.id).then(setTasks);
        meetingService.getAllMeetings().then(meets => {
          setMeetings(meets.filter(m => m.projectId === p.id));
        });
        memberService.getAllMembers().then(allMems => {
          setMembers(allMems.filter(m => p.memberIds.includes(m.id)));
        });
      }
    });
  }, [projectId]);

  if (!project) {
    return (
      <div className="p-8 text-center text-[#9CA3AF]">
        <p>Project not found.</p>
        <Link to="/projects" className="text-[#FF5500] hover:underline mt-2 inline-block">
          Back to Projects
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'members', label: 'Members', count: members.length },
    { id: 'tasks', label: 'Tasks', count: tasks.length },
    { id: 'meetings', label: 'Meetings', count: meetings.length }
  ];

  return (
    <div className="space-y-6">
      <Link to="/projects" className="text-xs text-[#9CA3AF] hover:text-[#FF5500] inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects Workspace
      </Link>

      <PageHeader
        title={project.name}
        subtitle={`Project Leader: ${project.leaderName}`}
        badge={<Badge variant={project.state === 'Active' ? 'orange' : 'blue'}>{project.state}</Badge>}
        action={
          <div className="flex gap-2">
            {project.githubRepo && (
              <a href={project.githubRepo} target="_blank" rel="noreferrer">
                <Button variant="secondary" size="sm" icon={<Globe className="w-4 h-4" />}>
                  Repository
                </Button>
              </a>
            )}
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noreferrer">
                <Button variant="primary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                  Live Site
                </Button>
              </a>
            )}
          </div>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card space-y-4">
              <h3 className="text-base font-bold text-[#F3F4F6]">Project Description</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">{project.description}</p>
            </Card>

            <Card className="glass-card space-y-4">
              <h3 className="text-base font-bold text-[#F3F4F6]">Technologies & Architecture</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-[#1E2028] border border-white/10 text-xs font-mono text-[#F3F4F6]">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="glass-card space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Project Info</h4>
              <div className="text-xs space-y-2 text-[#9CA3AF]">
                <div>Start Date: <strong className="text-[#F3F4F6]">{project.startDate}</strong></div>
                <div>State: <strong className="text-[#FF5500]">{project.state}</strong></div>
                <div>Leader: <strong className="text-[#F3F4F6]">{project.leaderName}</strong></div>
                <div>Assigned Members: <strong className="text-[#F3F4F6]">{members.length}</strong></div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {members.map(m => (
            <Card key={m.id} className="glass-card flex items-center gap-3">
              <Avatar src={m.photo} name={m.name} size="md" />
              <div>
                <h4 className="text-sm font-bold text-[#F3F4F6]">{m.name}</h4>
                <p className="text-xs text-[#FF5500] font-semibold">{m.clubPosition}</p>
                <p className="text-[11px] text-[#6B7280]">{m.department}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-3">
          {tasks.map(task => (
            <Card key={task.id} hoverEffect={false} className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-[#F3F4F6]">{task.title}</h4>
                <p className="text-xs text-[#9CA3AF] mt-1">{task.description}</p>
                <div className="mt-2 text-[11px] text-[#6B7280]">
                  Assigned to: <strong className="text-[#F3F4F6]">{task.assignedMemberName}</strong> | Deadline: <span className="font-mono text-[#FF5500]">{task.deadline}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'meetings' && (
        <div className="space-y-3">
          {meetings.map(meet => (
            <Card key={meet.id} hoverEffect={false} className="p-4 border-l-4 border-l-[#FF5500]">
              <h4 className="text-sm font-semibold text-[#F3F4F6]">{meet.title}</h4>
              <p className="text-xs text-[#9CA3AF] mt-1">{meet.date} ({meet.time}) | Location: {meet.location}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
