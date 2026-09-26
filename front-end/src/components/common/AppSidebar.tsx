import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Code2,
  LayoutDashboard,
  User,
  FolderKanban,
  CheckSquare,
  Calendar,
  Clock,
  Users,
  Award,
  Settings,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

export const AppSidebar: React.FC = () => {
  const { currentUser, activeRole, logout } = useAuth();
  const location = useLocation();

  if (!currentUser) return null;

  const isActive = (path: string) => location.pathname === path;

  // Base navigation available to all authenticated members
  const memberNav = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/profile', icon: User },
    { label: 'Projects', path: '/projects', icon: FolderKanban },
    { label: 'Tasks', path: '/tasks', icon: CheckSquare },
    { label: 'Meetings', path: '/meetings', icon: Calendar },
    { label: 'Attendance', path: '/attendance', icon: Clock },
    { label: 'Community', path: '/app/community', icon: Users }
  ];

  // Administrative links filtered by role
  const adminNav = [];

  if (activeRole === 'Faculty Coordinator') {
    adminNav.push(
      { label: 'Member Directory', path: '/admin/members', icon: Users },
      { label: 'Position Management', path: '/admin/positions', icon: Award },
      { label: 'Project Control', path: '/admin/projects', icon: FolderKanban },
      { label: 'Meeting Admin', path: '/admin/meetings', icon: Calendar },
      { label: 'Attendance Admin', path: '/admin/attendance', icon: Clock }
    );
  } else if (activeRole === 'Club President') {
    adminNav.push(
      { label: 'Member Directory', path: '/admin/members', icon: Users },
      { label: 'Project Control', path: '/admin/projects', icon: FolderKanban },
      { label: 'Meeting Admin', path: '/admin/meetings', icon: Calendar },
      { label: 'Attendance Admin', path: '/admin/attendance', icon: Clock }
    );
  } else if (activeRole === 'Project Leader') {
    adminNav.push(
      { label: 'Project Members', path: '/admin/members', icon: Users }
    );
  }

  return (
    <aside className="w-64 bg-[#0D0E12] border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 shrink-0">
      <div>
        {/* Sidebar Header Logo */}
        <div className="h-16 px-6 flex items-center border-b border-white/10">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF5500] flex items-center justify-center text-white shadow-md shadow-[#FF5500]/30">
              <Code2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="font-bold text-base text-white tracking-tight">
              <span className="text-[#FF5500] font-mono mr-1">&lt;/&gt;</span>
              <span className="font-heading">SDC Nexus</span>
            </div>
          </Link>
        </div>

        {/* User Card Header */}
        <div className="p-4 mx-3 my-3 bg-[#14151A] rounded-xl border border-white/5 flex items-center gap-3">
          <Avatar src={currentUser.photo} name={currentUser.name} size="md" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-[#F3F4F6] truncate">{currentUser.name}</div>
            <div className="text-xs text-[#9CA3AF] truncate">{currentUser.clubPosition}</div>
          </div>
        </div>

        {/* Main Navigation Links */}
        <div className="px-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Workspace
          </div>
          {memberNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'bg-[#FF5500] text-white font-semibold shadow-md shadow-[#FF5500]/20'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Administrative Navigation */}
        {adminNav.length > 0 && (
          <div className="px-3 pt-4 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#FF5500] flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              <span>Administration</span>
            </div>
            {adminNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/40 font-semibold'
                      : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <div className="flex items-center justify-between px-2 text-xs">
          <span className="text-[#6B7280]">System Role:</span>
          <Badge variant="orange" size="sm">
            {activeRole}
          </Badge>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
