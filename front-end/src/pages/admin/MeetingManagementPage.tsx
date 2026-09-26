import React, { useState, useEffect } from 'react';
import { meetingService } from '../../services/meetingService';
import { projectService } from '../../services/projectService';
import { Meeting, Project } from '../../types';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { Calendar, Plus, Clock, MapPin } from 'lucide-react';

export const MeetingManagementPage: React.FC = () => {
  const { showToast } = useToast();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<'Project' | 'Club' | 'Executive'>('Project');
  const [projectId, setProjectId] = useState('');

  const loadData = () => {
    meetingService.getAllMeetings().then(setMeetings);
    projectService.getAllProjects().then(setProjects);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;
    const selectedProj = projects.find(p => p.id === projectId);
    try {
      await meetingService.createMeeting({
        title,
        date,
        time,
        location,
        type,
        projectId: selectedProj?.id,
        projectName: selectedProj?.name,
        participantIds: ['mem-1', 'mem-2', 'mem-3', 'mem-4']
      });
      showToast('Meeting scheduled successfully', 'success');
      setIsModalOpen(false);
      setTitle('');
      setDate('');
      setTime('');
      setLocation('');
      loadData();
    } catch {
      showToast('Failed to schedule meeting', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meeting Administration"
        subtitle="Schedule sprint syncs, club-wide meetings, and leadership sessions"
        badge={<Badge variant="orange">Administrative Control</Badge>}
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Schedule New Meeting
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((m) => (
          <Card key={m.id} className="glass-card flex flex-col justify-between border-l-4 border-l-[#FF5500]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant={m.type === 'Executive' ? 'orange' : 'blue'}>{m.type} Sync</Badge>
                <span className="text-xs text-[#9CA3AF] font-mono">{m.date}</span>
              </div>
              <h3 className="text-base font-bold text-[#F3F4F6]">{m.title}</h3>
              <div className="text-xs text-[#9CA3AF] mt-2 space-y-1">
                <div>Time: {m.time}</div>
                <div>Location: {m.location}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule New Meeting">
          <form onSubmit={handleCreateMeeting} className="space-y-4">
            <Input
              label="Meeting Title"
              placeholder="e.g. Nexus Sprint 2 Architecture Sync"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <Input
                label="Time Range"
                placeholder="17:00 - 18:00"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <Input
              label="Location / Room"
              placeholder="e.g. Lab 304 or Google Meet"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <Select
              label="Meeting Type"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              options={[
                { label: 'Project Sprint Meeting', value: 'Project' },
                { label: 'Club General Assembly', value: 'Club' },
                { label: 'Executive Committee', value: 'Executive' }
              ]}
            />
            {type === 'Project' && (
              <Select
                label="Associated Project"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                options={[
                  { label: '-- Select Project --', value: '' },
                  ...projects.map(p => ({ label: p.name, value: p.id }))
                ]}
              />
            )}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Schedule Meeting
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
