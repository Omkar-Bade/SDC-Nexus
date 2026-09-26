export type SystemRole = 
  | 'Faculty Coordinator' 
  | 'Club President' 
  | 'Project Leader' 
  | 'Member' 
  | 'Alumni';

export interface Member {
  id: string;
  name: string;
  email: string;
  memberId: string;
  photo: string;
  department: string;
  academicYear: string;
  systemRole: SystemRole;
  clubPosition: string;
  skills: string[];
  joinedDate: string;
  githubUrl?: string;
  linkedinUrl?: string;
  assignedProjectIds: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  leaderId: string;
  leaderName: string;
  memberIds: string[];
  state: 'Active' | 'In Development' | 'Completed' | 'Archived';
  startDate: string;
  githubRepo?: string;
  liveDemo?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedMemberId: string;
  assignedMemberName: string;
  deadline: string;
  projectId: string;
  projectName: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Project' | 'Club' | 'Executive';
  projectId?: string;
  projectName?: string;
  participantIds: string[];
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  meetingId: string;
  meetingTitle: string;
  meetingDate: string;
  attended: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'Workshop' | 'Hackathon' | 'Seminar' | 'Tech Talk';
  image: string;
  isPast: boolean;
}

export interface PositionDefinition {
  id: string;
  title: string;
  description: string;
  assignedMemberId?: string;
  assignedMemberName?: string;
}
