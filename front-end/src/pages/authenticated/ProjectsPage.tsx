import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/projectService';
import { Project } from '../../types';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Search, Plus, ArrowRight, UserCheck, Code2 } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { activeRole } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    projectService.getAllProjects().then(setProjects);
  }, []);

  const canManage = activeRole === 'Faculty Coordinator' || activeRole === 'Club President';

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects Workspace"
        subtitle="Manage and collaborate on software projects within SDC Nexus"
        action={
          canManage ? (
            <Link to="/admin/projects">
              <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
                Project Control Admin
              </Button>
            </Link>
          ) : undefined
        }
      />

      <div className="max-w-md">
        <Input
          placeholder="Search projects by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4 text-[#6B7280]" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => (
          <Card key={proj.id} className="glass-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant={proj.state === 'Active' ? 'orange' : 'blue'}>
                  {proj.state}
                </Badge>
                <div className="text-xs text-[#9CA3AF] flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Leader: {proj.leaderName}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#F3F4F6]">{proj.name}</h3>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed line-clamp-3">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {proj.technologies.map(tech => (
                  <span key={tech} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#9CA3AF]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>{proj.memberIds.length} Assigned Members</span>
              <Link to={`/projects/${proj.id}`}>
                <Button variant="secondary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Open Workspace
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
