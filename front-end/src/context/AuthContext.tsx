import React, { createContext, useContext, useState, useEffect } from 'react';
import { Member, SystemRole } from '../types';
import { MOCK_MEMBERS } from '../data/mockData';

interface AuthContextType {
  currentUser: Member | null;
  activeRole: SystemRole;
  isAuthenticated: boolean;
  switchRole: (role: SystemRole) => void;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<SystemRole>('Member');
  const [currentUser, setCurrentUser] = useState<Member | null>(null);

  useEffect(() => {
    // Default currentUser to the mock member corresponding to activeRole
    const defaultMember = MOCK_MEMBERS.find(m => m.systemRole === activeRole) || MOCK_MEMBERS[3];
    setCurrentUser(defaultMember);
  }, [activeRole]);

  const switchRole = (role: SystemRole) => {
    setActiveRole(role);
    const targetMember = MOCK_MEMBERS.find(m => m.systemRole === role) || MOCK_MEMBERS[3];
    setCurrentUser(targetMember);
  };

  const login = async (email: string): Promise<boolean> => {
    const foundMember = MOCK_MEMBERS.find(m => m.email.toLowerCase() === email.toLowerCase());
    if (foundMember) {
      setCurrentUser(foundMember);
      setActiveRole(foundMember.systemRole);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        activeRole,
        isAuthenticated: !!currentUser,
        switchRole,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
