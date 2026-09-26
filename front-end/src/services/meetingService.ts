import { Meeting } from '../types';
import { MOCK_MEETINGS } from '../data/mockData';

export const meetingService = {
  async getAllMeetings(): Promise<Meeting[]> {
    return [...MOCK_MEETINGS];
  },

  async getMeetingsForMember(memberId: string): Promise<Meeting[]> {
    return MOCK_MEETINGS.filter(m => m.participantIds.includes(memberId));
  },

  async createMeeting(meetingData: Omit<Meeting, 'id'>): Promise<Meeting> {
    const newMeeting: Meeting = {
      ...meetingData,
      id: `meet-${Date.now()}`
    };
    MOCK_MEETINGS.push(newMeeting);
    return newMeeting;
  }
};
