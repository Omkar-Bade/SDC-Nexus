import React from 'react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Code2,
  Terminal,
  Cpu,
  Users,
  Calendar,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F3F4F6] flex flex-col subtle-grid-bg">
      <PublicNavbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF5500]/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#FF5500] mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE DIGITAL WORKSPACE OF SOFTWARE DEVELOPER CLUB</span>
            </div>

            {/* Slogan */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading max-w-4xl mx-auto leading-[1.1]">
              WE BUILD THE FUTURE.
              <br />
              <span className="orange-gradient-text">TOGETHER.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
              SDC Nexus is the modern collaboration engine for student developers. Discover projects, coordinate sprint meetings, track attendance, and build high-impact applications.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Explore SDC Nexus
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="secondary" size="lg" icon={<Terminal className="w-5 h-5" />}>
                  View Active Projects
                </Button>
              </Link>
            </div>

            {/* Tech Stack Preview Ribbon */}
            <div className="mt-16 pt-8 border-t border-white/10 max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-xs font-mono text-[#6B7280]">
              <span>REACT 19</span>
              <span>TYPESCRIPT</span>
              <span>DEVFLOW CI/CD</span>
              <span>AI/ML LABS</span>
              <span>SYSTEM ARCHITECTURE</span>
            </div>
          </div>
        </section>

        {/* 2. SDC IDENTITY & WHY SDC NEXUS */}
        <section className="py-20 bg-[#0D0E12] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="orange" size="md">ENGINEERED FOR COLLABORATION</Badge>
                <h2 className="text-3xl font-bold font-heading text-[#F3F4F6] tracking-tight">
                  Not just another club.
                  <br />
                  A real developer ecosystem.
                </h2>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  SDC Nexus provides the exact workflow atmosphere professional software teams rely on. From sprint planning to code review and member management, every detail is engineered to empower developers.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    'Role-based leadership hierarchy with clear ownership',
                    'Transparent attendance tracking without arbitrary scoring',
                    'Focused task assignments with zero clutter',
                    'Digital Member IDs verifying official club status'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-[#F3F4F6]">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="glass-card">
                  <div className="w-10 h-10 rounded-xl bg-[#FF5500]/15 text-[#FF5500] flex items-center justify-center mb-4">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#F3F4F6]">Project Incubator</h3>
                  <p className="mt-2 text-xs text-[#9CA3AF] leading-relaxed">
                    Build production-grade applications with student leads. Learn modern stacks including React, FastAPI, Docker, and WebGL.
                  </p>
                </Card>

                <Card className="glass-card">
                  <div className="w-10 h-10 rounded-xl bg-[#0070F3]/15 text-[#38BDF8] flex items-center justify-center mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#F3F4F6]">Peer Network</h3>
                  <p className="mt-2 text-xs text-[#9CA3AF] leading-relaxed">
                    Connect with frontend leads, backend architects, and alumni working at top tech firms across the world.
                  </p>
                </Card>

                <Card className="glass-card">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#F3F4F6]">Sprint & Meetings</h3>
                  <p className="mt-2 text-xs text-[#9CA3AF] leading-relaxed">
                    Schedule syncs, manage sprint milestones, and view transparent meeting attendance without friction.
                  </p>
                </Card>

                <Card className="glass-card">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#F3F4F6]">Leadership Pathway</h3>
                  <p className="mt-2 text-xs text-[#9CA3AF] leading-relaxed">
                    Progress from member to Project Leader, Executive President, or Faculty Coordinator with distinct permissions.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED PROJECTS SHOWCASE */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <Badge variant="orange" className="mb-2">PROJECT SHOWCASE</Badge>
                <h2 className="text-3xl font-bold font-heading text-[#F3F4F6]">Built by SDC Members</h2>
                <p className="mt-1 text-sm text-[#9CA3AF]">High-impact open source tools and internal software.</p>
              </div>
              <Link to="/projects" className="mt-4 md:mt-0">
                <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                  Explore All Projects
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="orange">Active Project</Badge>
                    <span className="text-xs font-mono text-[#6B7280]">Lead: Priya Patel</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#F3F4F6]">SDC Nexus Platform</h3>
                  <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                    The unified digital workspace and collaboration portal for Software Developer Club members, project leaders, and advisors.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['React', 'TypeScript', 'Tailwind CSS', 'Vite'].map(tech => (
                      <span key={tech} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#9CA3AF]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#9CA3AF]">
                  <span>3 Members Assigned</span>
                  <span className="text-[#FF5500] font-semibold flex items-center gap-1">
                    View Project <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>

              <Card className="glass-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="blue">In Development</Badge>
                    <span className="text-xs font-mono text-[#6B7280]">Lead: Sneha Kulkarni</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#F3F4F6]">DevFlow CI/CD Pipeline</h3>
                  <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                    Automated workflow engine for deploying club project previews, static sites, and containerized microservices to cloud environments.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Docker', 'Python', 'FastAPI', 'GitHub Actions'].map(tech => (
                      <span key={tech} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#9CA3AF]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#9CA3AF]">
                  <span>3 Members Assigned</span>
                  <span className="text-[#FF5500] font-semibold flex items-center gap-1">
                    View Project <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 4. FINAL CTA */}
        <section className="py-20 bg-[#0D0E12] border-t border-white/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#F3F4F6]">
              Ready to shape your developer journey?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#9CA3AF] max-w-xl mx-auto">
              Join the Software Developer Club today and start collaborating on high-impact projects with passionate peers.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/register">
                <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Join SDC Nexus Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};
