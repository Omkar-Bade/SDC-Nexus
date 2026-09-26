import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SystemRole } from '../../types';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: SystemRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, activeRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(activeRole)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#F3F4F6]">Access Restricted</h2>
        <p className="mt-2 text-sm text-[#9CA3AF] max-w-md">
          Your current role (<span className="text-[#FF5500] font-semibold">{activeRole}</span>) does not have authorization to view this administrative view. Use the Dev Role Switcher at the bottom-left to test administrative permissions.
        </p>
        <div className="mt-6">
          <a href="/dashboard">
            <Button variant="secondary" size="sm">
              Return to Dashboard
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
