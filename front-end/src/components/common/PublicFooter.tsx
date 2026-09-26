import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Globe, Mail } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0B] py-12 text-[#9CA3AF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center font-bold tracking-tight text-xl text-white">
              <span className="text-[#FF5500] font-mono mr-2">&lt;/&gt;</span>
              <span className="font-heading">SDC Nexus</span>
            </div>
            <p className="text-sm text-[#9CA3AF] max-w-sm leading-relaxed">
              The official digital workspace and collaboration ecosystem of the Software Developer Club. Built for developers, creators, and innovators.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#14151A] border border-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-[#FF5500] hover:border-[#FF5500]/40 transition-colors"
                aria-label="GitHub Repository"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@sdcnexus.org"
                className="w-9 h-9 rounded-lg bg-[#14151A] border border-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-[#FF5500] hover:border-[#FF5500]/40 transition-colors"
                aria-label="Email Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#FF5500] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#FF5500] transition-colors">Projects Showcase</Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-[#FF5500] transition-colors">Member Directory</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#FF5500] transition-colors">Club Events</Link>
              </li>
            </ul>
          </div>

          {/* Access Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Member Ecosystem</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/signin" className="hover:text-[#FF5500] transition-colors">Member Sign In</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#FF5500] transition-colors">Join SDC</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#FF5500] transition-colors">Workspace Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280]">
          <p>© {new Date().getFullYear()} Software Developer Club (SDC Nexus). All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-mono text-[#9CA3AF]">
            WE BUILD THE FUTURE. TOGETHER.
          </p>
        </div>
      </div>
    </footer>
  );
};
