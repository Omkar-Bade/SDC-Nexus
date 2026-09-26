import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Community', path: '/community' },
    { name: 'Events', path: '/events' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#FF5500] flex items-center justify-center text-white shadow-md shadow-[#FF5500]/30 transition-transform group-hover:scale-105">
            <Code2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex items-center font-bold tracking-tight text-lg">
            <span className="text-[#FF5500] font-mono mr-1.5">&lt;/&gt;</span>
            <span className="text-white font-heading">SDC Nexus</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-[#FF5500] text-white shadow-sm shadow-[#FF5500]/30'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/signin">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Join SDC
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#9CA3AF] hover:text-white p-2 rounded-lg hover:bg-white/5"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg ${
                  isActive(link.path)
                    ? 'bg-[#FF5500]/20 text-[#FF5500] font-semibold'
                    : 'text-[#9CA3AF] hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" className="w-full justify-center">
                Sign In
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Join SDC
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
