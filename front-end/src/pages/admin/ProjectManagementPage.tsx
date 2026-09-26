import React, { useState, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import { memberService } from '../../services/memberService';
import { Project, Member } from '../../types';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { FolderKanban, Plus, UserCheck } from 'lucide-react';

export const ProjectManagementPage: React.FC = () => {
  const { showToast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [techInput, setTechInput] = useState('');
  const [leaderId, setLeaderId] = useState('');

  const loadData = () => {
    projectService.getAllProjects().then(setProjects);
    memberService.getAllMembers().then(setMembers);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !leaderId) {
      showToast('Project name and leader selection required', 'error');
      return;
    }
    const leader = members.find(m => m.id === leaderId);
    if (!leader) return;

    try {
      await projectService.createProject({
        name,
        description,
        technologies: techInput.split(',').map(t => t.trim()).filter(Boolean),
        leaderId: leader.id,
        leaderName: leader.name,
        memberIds: [leader.id],
        state: 'Active',
        startDate: new Date().toISOString().split('T')[0]
      });
      showToast('New project created successfully', 'success');
      setIsModalOpen(false);
      setName('');
      setDescription('');
      setTechInput('');
      setLeaderId('');
      loadData();
    } catch {
      showToast('Failed to create project', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Control & Allocations"
        subtitle="Create projects, assign Project Leaders, and manage club initiatives"
        badge={<Badge variant="orange">Administrative Access</Badge>}
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Create New Project
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <Card key={p.id} className="glass-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant={p.state === 'Active' ? 'orange' : 'blue'}>{p.state}</Badge>
                <span className="text-xs text-[#9CA3AF]">Start: {p.startDate}</span>
              </div>
              <h3 className="text-lg font-bold text-[#F3F4F6]">{p.name}</h3>
              <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">{p.description}</p>
              <div className="mt-3 text-xs font-semibold text-[#FF5500]">
                Project Leader: {p.leaderName}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#6B7280]">
              {p.memberIds.length} Members Assigned
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New SDC Project">
          <form onSubmit={handleCreateProject} className="space-y-4">
            <Input
              label="Project Name"
              placeholder="e.g. SDC Mobile App"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Textarea
              label="Description"
              placeholder="Overview and objectives of this project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Input
              label="Technologies (Comma Separated)"
              placeholder="React, TypeScript, Docker"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
            />
            <Select
              label="Assign Project Leader"
              value={leaderId}
              onChange={(e) => setLeaderId(e.target.value)}
              options={[
                { label: '-- Select Project Leader --', value: '' },
                ...members.map(m => ({ label: `${m.name} (${m.clubPosition})`, value: m.id }))
              ]}
              required
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Create Project
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
