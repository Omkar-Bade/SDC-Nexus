import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import { projectService } from '../../services/projectService';
import { Project } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Search, FolderKanban, ArrowRight, UserCheck } from 'lucide-react';

export const PublicProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');

  useEffect(() => {
    projectService.getAllProjects().then(setProjects);
  }, []);

  const allTechs = ['All', ...Array.from(new Set(projects.flatMap(p => p.technologies)))];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'All' || p.technologies.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F3F4F6] flex flex-col subtle-grid-bg">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <Badge variant="orange" className="mb-2">SDC PROJECTS</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#F3F4F6]">Project Showcase</h1>
          <p className="mt-2 text-sm text-[#9CA3AF]">
            Explore active software engineering projects developed and maintained by SDC members.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#14151A] p-4 rounded-xl border border-white/10">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-[#6B7280]" />}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider shrink-0 mr-1">Filter Tech:</span>
            {allTechs.map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  selectedTech === tech
                    ? 'bg-[#FF5500] text-white shadow-sm shadow-[#FF5500]/20'
                    : 'bg-[#1E2028] text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#282B36]'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <Card key={project.id} className="glass-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={project.state === 'Active' ? 'orange' : 'blue'}>
                    {project.state}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                    <UserCheck className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>Leader: {project.leaderName}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#F3F4F6]">{project.name}</h3>
                <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#9CA3AF]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#9CA3AF]">
                <span>{project.memberIds.length} Assigned Members</span>
                <Link
                  to={`/projects/${project.id}`}
                  className="text-[#FF5500] hover:underline font-semibold flex items-center gap-1"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
