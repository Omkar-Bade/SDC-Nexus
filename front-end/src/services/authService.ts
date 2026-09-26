import { Member, SystemRole } from '../types';
import { MOCK_MEMBERS } from '../data/mockData';

export const authService = {
  async getCurrentUser(activeRole?: SystemRole): Promise<Member> {
    if (!activeRole) {
      return MOCK_MEMBERS.find(m => m.systemRole === 'Member') || MOCK_MEMBERS[3];
    }
    const matchedMember = MOCK_MEMBERS.find(m => m.systemRole === activeRole);
    return matchedMember || MOCK_MEMBERS[3];
  },

  async login(email: string): Promise<Member> {
    const member = MOCK_MEMBERS.find(m => m.email.toLowerCase() === email.toLowerCase());
    if (!member) {
      throw new Error('Invalid credentials');
    }
    return member;
  },

  async register(name: string, email: string, department: string): Promise<Member> {
    const newMember: Member = {
      id: `mem-${Date.now()}`,
      name,
      email,
      memberId: `SDC-2026-${Math.floor(100 + Math.random() * 900)}`,
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
      department,
      academicYear: 'First Year',
      systemRole: 'Member',
      clubPosition: 'Member',
      skills: ['JavaScript'],
      joinedDate: new Date().toISOString().split('T')[0],
      assignedProjectIds: []
    };
    MOCK_MEMBERS.push(newMember);
    return newMember;
  }
};
