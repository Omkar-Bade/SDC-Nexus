import { PositionDefinition } from '../types';
import { MOCK_POSITIONS, MOCK_MEMBERS } from '../data/mockData';

export const positionService = {
  async getAllPositions(): Promise<PositionDefinition[]> {
    return [...MOCK_POSITIONS];
  },

  async createPosition(title: string, description: string): Promise<PositionDefinition> {
    const newPos: PositionDefinition = {
      id: `pos-${Date.now()}`,
      title,
      description
    };
    MOCK_POSITIONS.push(newPos);
    return newPos;
  },

  async assignPosition(positionId: string, memberId?: string): Promise<PositionDefinition> {
    const position = MOCK_POSITIONS.find(p => p.id === positionId);
    if (!position) throw new Error('Position not found');

    if (!memberId) {
      position.assignedMemberId = undefined;
      position.assignedMemberName = undefined;
    } else {
      const member = MOCK_MEMBERS.find(m => m.id === memberId);
      if (!member) throw new Error('Member not found');
      position.assignedMemberId = member.id;
      position.assignedMemberName = member.name;
      member.clubPosition = position.title;
    }
    return position;
  },

  async removePosition(positionId: string): Promise<void> {
    const index = MOCK_POSITIONS.findIndex(p => p.id === positionId);
    if (index !== -1) {
      MOCK_POSITIONS.splice(index, 1);
    }
  }
};
