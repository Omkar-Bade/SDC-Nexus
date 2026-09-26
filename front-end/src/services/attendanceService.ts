import { AttendanceRecord } from '../types';
import { MOCK_ATTENDANCE } from '../data/mockData';

export const attendanceService = {
  async getAttendanceForMember(memberId: string): Promise<AttendanceRecord[]> {
    return MOCK_ATTENDANCE.filter(a => a.memberId === memberId);
  },

  async getAllAttendanceRecords(): Promise<AttendanceRecord[]> {
    return [...MOCK_ATTENDANCE];
  },

  async recordAttendance(record: Omit<AttendanceRecord, 'id'>): Promise<AttendanceRecord> {
    const newRecord: AttendanceRecord = {
      ...record,
      id: `att-${Date.now()}`
    };
    MOCK_ATTENDANCE.push(newRecord);
    return newRecord;
  }
};
