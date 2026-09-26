import { Member, SystemRole } from '../types';
import { MOCK_MEMBERS } from '../data/mockData';

export const memberService = {
  async getAllMembers(): Promise<Member[]> {
    return [...MOCK_MEMBERS];
  },

  async getMemberById(targetMemberId: string, currentUser: Member): Promise<Member | null> {
    const targetMember = MOCK_MEMBERS.find(m => m.id === targetMemberId || m.memberId === targetMemberId);
    if (!targetMember) return null;

    // Privacy Authorization Check
    const canAccess = this.canAccessProfile(currentUser, targetMember);
    if (!canAccess) {
      throw new Error('UNAUTHORIZED_PROFILE_ACCESS');
    }

    return targetMember;
  },

  canAccessProfile(currentUser: Member, targetMember: Member): boolean {
    // 1. Own profile is always accessible
    if (currentUser.id === targetMember.id) return true;

    // 2. Faculty Coordinator & Club President can view all profiles
    if (currentUser.systemRole === 'Faculty Coordinator' || currentUser.systemRole === 'Club President') {
      return true;
    }

    // 3. Project Leader can access profile if target member is in one of their assigned projects
    if (currentUser.systemRole === 'Project Leader') {
      const sharedProjects = currentUser.assignedProjectIds.filter(pId =>
        targetMember.assignedProjectIds.includes(pId)
      );
      return sharedProjects.length > 0;
    }

    // 4. Normal members and Alumni CANNOT access private profiles of other members
    return false;
  },

  async updateMemberPosition(memberId: string, newPosition: string): Promise<Member> {
    const member = MOCK_MEMBERS.find(m => m.id === memberId);
    if (!member) throw new Error('Member not found');
    member.clubPosition = newPosition;
    return member;
  }
};
