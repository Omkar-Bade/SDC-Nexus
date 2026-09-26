import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AppSidebar } from './components/common/AppSidebar';
import { AppHeader } from './components/common/AppHeader';
import { RoleSwitcher } from './components/common/RoleSwitcher';
import { ToastContainer } from './components/ui/Toast';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { PublicProjectsPage } from './pages/public/PublicProjectsPage';
import { PublicCommunityPage } from './pages/public/PublicCommunityPage';
import { PublicEventsPage } from './pages/public/PublicEventsPage';
import { SignInPage } from './pages/public/SignInPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';

// Authenticated Pages
import { DashboardPage } from './pages/authenticated/DashboardPage';
import { ProfilePage } from './pages/authenticated/ProfilePage';
import { ProjectsPage } from './pages/authenticated/ProjectsPage';
import { ProjectDetailPage } from './pages/authenticated/ProjectDetailPage';
import { TasksPage } from './pages/authenticated/TasksPage';
import { MeetingsPage } from './pages/authenticated/MeetingsPage';
import { AttendancePage } from './pages/authenticated/AttendancePage';
import { CommunityPage } from './pages/authenticated/CommunityPage';

// Admin Pages
import { MembersManagementPage } from './pages/admin/MembersManagementPage';
import { MemberProfileAdminPage } from './pages/admin/MemberProfileAdminPage';
import { PositionManagementPage } from './pages/admin/PositionManagementPage';
import { ProjectManagementPage } from './pages/admin/ProjectManagementPage';
import { MeetingManagementPage } from './pages/admin/MeetingManagementPage';
import { AttendanceManagementPage } from './pages/admin/AttendanceManagementPage';

// Layout wrapper for authenticated workspace views
const AuthenticatedLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0B] text-[#F3F4F6]">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<PublicProjectsPage />} />
        <Route path="/community" element={<PublicCommunityPage />} />
        <Route path="/events" element={<PublicEventsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Authenticated Workspace Routes */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/app/community" element={<CommunityPage />} />

          {/* Admin & Leadership Routes */}
          <Route
            path="/admin/members"
            element={
              <ProtectedRoute allowedRoles={['Faculty Coordinator', 'Club President', 'Project Leader']}>
                <MembersManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/members/:memberId"
            element={
              <ProtectedRoute allowedRoles={['Faculty Coordinator', 'Club President', 'Project Leader']}>
                <MemberProfileAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/positions"
            element={
              <ProtectedRoute allowedRoles={['Faculty Coordinator']}>
                <PositionManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute allowedRoles={['Faculty Coordinator', 'Club President']}>
                <ProjectManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/meetings"
            element={
              <ProtectedRoute allowedRoles={['Faculty Coordinator', 'Club President']}>
                <MeetingManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <ProtectedRoute allowedRoles={['Faculty Coordinator', 'Club President']}>
                <AttendanceManagementPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Floating Dev Role Switcher */}
      <RoleSwitcher />

      {/* Notifications Toast Container */}
      <ToastContainer />
    </>
  );
}
