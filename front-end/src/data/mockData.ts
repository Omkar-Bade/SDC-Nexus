import { Member, Project, Task, Meeting, AttendanceRecord, Event, PositionDefinition } from '../types';

export const MOCK_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@sdcnexus.org',
    memberId: 'SDC-FAC-001',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    department: 'Computer Science & Engineering',
    academicYear: 'Faculty',
    systemRole: 'Faculty Coordinator',
    clubPosition: 'Faculty Coordinator',
    skills: ['System Architecture', 'Distributed Systems', 'Research', 'Mentorship'],
    joinedDate: '2021-08-15',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    assignedProjectIds: ['proj-1', 'proj-2', 'proj-3', 'proj-4']
  },
  {
    id: 'mem-2',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@sdcnexus.org',
    memberId: 'SDC-2023-001',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    department: 'Information Technology',
    academicYear: 'Final Year (4th)',
    systemRole: 'Club President',
    clubPosition: 'Club President',
    skills: ['React', 'TypeScript', 'Node.js', 'System Architecture', 'Product Operations'],
    joinedDate: '2022-09-01',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    assignedProjectIds: ['proj-1', 'proj-2']
  },
  {
    id: 'mem-3',
    name: 'Priya Patel',
    email: 'priya.patel@sdcnexus.org',
    memberId: 'SDC-2023-014',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    department: 'Computer Science & Engineering',
    academicYear: 'Third Year (3rd)',
    systemRole: 'Project Leader',
    clubPosition: 'Frontend Lead',
    skills: ['React', 'Tailwind CSS', 'TypeScript', 'UI/UX Design', 'Next.js'],
    joinedDate: '2023-01-10',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    assignedProjectIds: ['proj-1', 'proj-3']
  },
  {
    id: 'mem-4',
    name: 'Rohan Verma',
    email: 'rohan.verma@sdcnexus.org',
    memberId: 'SDC-2024-042',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    department: 'Computer Science & Engineering',
    academicYear: 'Second Year (2nd)',
    systemRole: 'Member',
    clubPosition: 'Full Stack Developer',
    skills: ['JavaScript', 'React', 'Python', 'Git', 'Docker'],
    joinedDate: '2024-02-01',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    assignedProjectIds: ['proj-1']
  },
  {
    id: 'mem-5',
    name: 'Sneha Kulkarni',
    email: 'sneha.kulkarni@sdcnexus.org',
    memberId: 'SDC-2023-009',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    department: 'Artificial Intelligence & Data Science',
    academicYear: 'Third Year (3rd)',
    systemRole: 'Project Leader',
    clubPosition: 'AI/ML Lead',
    skills: ['Python', 'PyTorch', 'FastAPI', 'MLOps', 'Computer Vision'],
    joinedDate: '2023-03-15',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    assignedProjectIds: ['proj-2', 'proj-4']
  },
  {
    id: 'mem-6',
    name: 'Ananya Roy',
    email: 'ananya.roy@sdcnexus.org',
    memberId: 'SDC-2021-003',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    department: 'Computer Science & Engineering',
    academicYear: 'Alumni (Batch 2024)',
    systemRole: 'Alumni',
    clubPosition: 'Former Technical Head',
    skills: ['Distributed Systems', 'Golang', 'Kubernetes', 'Cloud Native'],
    joinedDate: '2021-09-01',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    assignedProjectIds: []
  },
  {
    id: 'mem-7',
    name: 'Vikram Singh',
    email: 'vikram.singh@sdcnexus.org',
    memberId: 'SDC-2024-088',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    department: 'Information Technology',
    academicYear: 'Second Year (2nd)',
    systemRole: 'Member',
    clubPosition: 'Backend Developer',
    skills: ['Node.js', 'PostgreSQL', 'Express', 'Redis', 'REST APIs'],
    joinedDate: '2024-03-01',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    assignedProjectIds: ['proj-2']
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'SDC Nexus Platform',
    description: 'The unified digital workspace and collaboration portal for Software Developer Club members, project leaders, and advisors.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    leaderId: 'mem-3',
    leaderName: 'Priya Patel',
    memberIds: ['mem-2', 'mem-3', 'mem-4'],
    state: 'Active',
    startDate: '2024-01-15',
    githubRepo: 'https://github.com/sdcnexus/nexus-core',
    liveDemo: 'https://sdcnexus.org'
  },
  {
    id: 'proj-2',
    name: 'DevFlow CI/CD Pipeline Automation',
    description: 'Automated workflow engine for deploying club project previews, static sites, and containerized microservices to cloud environments.',
    technologies: ['Docker', 'Python', 'FastAPI', 'GitHub Actions'],
    leaderId: 'mem-5',
    leaderName: 'Sneha Kulkarni',
    memberIds: ['mem-2', 'mem-5', 'mem-7'],
    state: 'In Development',
    startDate: '2024-03-01',
    githubRepo: 'https://github.com/sdcnexus/devflow'
  },
  {
    id: 'proj-3',
    name: 'Algorithm Visualizer 3D',
    description: 'Interactive web-based 3D visualization engine for data structures and algorithms designed for student learning modules.',
    technologies: ['Three.js', 'TypeScript', 'React', 'WebGL'],
    leaderId: 'mem-3',
    leaderName: 'Priya Patel',
    memberIds: ['mem-3', 'mem-4'],
    state: 'Active',
    startDate: '2024-04-10',
    githubRepo: 'https://github.com/sdcnexus/algo-vis'
  },
  {
    id: 'proj-4',
    name: 'SDC Mobile Companion App',
    description: 'Cross-platform mobile application for quick meeting updates, attendance tracking, and internal club notifications.',
    technologies: ['React Native', 'TypeScript', 'Expo'],
    leaderId: 'mem-5',
    leaderName: 'Sneha Kulkarni',
    memberIds: ['mem-5', 'mem-7'],
    state: 'In Development',
    startDate: '2024-05-20',
    githubRepo: 'https://github.com/sdcnexus/companion-app'
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-101',
    title: 'Implement Responsive Navigation Shell',
    description: 'Create the responsive public floating navbar and authenticated sidebar layout according to SDC Nexus dark minimalist guidelines.',
    assignedMemberId: 'mem-4',
    assignedMemberName: 'Rohan Verma',
    deadline: '2026-09-05',
    projectId: 'proj-1',
    projectName: 'SDC Nexus Platform'
  },
  {
    id: 'task-102',
    title: 'Refactor Glassmorphic Component Library',
    description: 'Update buttons, cards, and modal dialogs to use centralized CSS custom properties and subtle backdrop blur effects.',
    assignedMemberId: 'mem-3',
    assignedMemberName: 'Priya Patel',
    deadline: '2026-09-08',
    projectId: 'proj-1',
    projectName: 'SDC Nexus Platform'
  },
  {
    id: 'task-103',
    title: 'Build Fast Container Build Runner',
    description: 'Implement asynchronous container build triggers for the DevFlow deployment engine.',
    assignedMemberId: 'mem-7',
    assignedMemberName: 'Vikram Singh',
    deadline: '2026-09-12',
    projectId: 'proj-2',
    projectName: 'DevFlow CI/CD Pipeline Automation'
  },
  {
    id: 'task-104',
    title: 'Integrate Graph Traversal Shader Animations',
    description: 'Develop custom WebGL fragment shaders for breadth-first and depth-first visualizer nodes.',
    assignedMemberId: 'mem-4',
    assignedMemberName: 'Rohan Verma',
    deadline: '2026-09-15',
    projectId: 'proj-3',
    projectName: 'Algorithm Visualizer 3D'
  }
];

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: 'meet-1',
    title: 'Weekly Sprint Sync — Nexus Core',
    date: '2026-08-30',
    time: '17:00 - 18:00',
    location: 'Lab 304 & Google Meet',
    type: 'Project',
    projectId: 'proj-1',
    projectName: 'SDC Nexus Platform',
    participantIds: ['mem-2', 'mem-3', 'mem-4']
  },
  {
    id: 'meet-2',
    title: 'Executive Leadership Strategy Assembly',
    date: '2026-09-02',
    time: '16:00 - 17:30',
    location: 'Conference Room B',
    type: 'Executive',
    participantIds: ['mem-1', 'mem-2', 'mem-3', 'mem-5']
  },
  {
    id: 'meet-3',
    title: 'AI/ML & DevFlow Architecture Review',
    date: '2026-09-04',
    time: '18:00 - 19:15',
    location: 'Google Meet (Virtual)',
    type: 'Project',
    projectId: 'proj-2',
    projectName: 'DevFlow CI/CD Pipeline Automation',
    participantIds: ['mem-2', 'mem-5', 'mem-7']
  },
  {
    id: 'meet-4',
    title: 'All-Hands SDC Monthly Briefing',
    date: '2026-09-10',
    time: '15:30 - 17:00',
    location: 'Main Auditorium',
    type: 'Club',
    participantIds: ['mem-1', 'mem-2', 'mem-3', 'mem-4', 'mem-5', 'mem-6', 'mem-7']
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    memberId: 'mem-4',
    meetingId: 'meet-old-1',
    meetingTitle: 'Nexus Sprint 1 Kickoff',
    meetingDate: '2026-08-01',
    attended: true
  },
  {
    id: 'att-2',
    memberId: 'mem-4',
    meetingId: 'meet-old-2',
    meetingTitle: 'UI/UX Design Review',
    meetingDate: '2026-08-08',
    attended: true
  },
  {
    id: 'att-3',
    memberId: 'mem-4',
    meetingId: 'meet-old-3',
    meetingTitle: 'SDC General Body Meet',
    meetingDate: '2026-08-15',
    attended: false
  },
  {
    id: 'att-4',
    memberId: 'mem-4',
    meetingId: 'meet-old-4',
    meetingTitle: 'Nexus Frontend Workshop',
    meetingDate: '2026-08-22',
    attended: true
  },
  {
    id: 'att-5',
    memberId: 'mem-3',
    meetingId: 'meet-old-1',
    meetingTitle: 'Nexus Sprint 1 Kickoff',
    meetingDate: '2026-08-01',
    attended: true
  },
  {
    id: 'att-6',
    memberId: 'mem-3',
    meetingId: 'meet-old-2',
    meetingTitle: 'UI/UX Design Review',
    meetingDate: '2026-08-08',
    attended: true
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'evt-1',
    title: 'Modern Web Architecture with Vite & React 19',
    description: 'A deep-dive hands-on workshop covering full-stack reactive design, component-driven UI architecture, and modern state management.',
    date: '2026-09-12',
    time: '14:00 - 17:00',
    location: 'Lab 302 & Stream',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    isPast: false
  },
  {
    id: 'evt-2',
    title: 'SDC HackNight 2026: Build for Developers',
    description: 'An intensive 24-hour hackathon focused on developer tools, automated pipelines, open-source utilities, and UI design systems.',
    date: '2026-09-25',
    time: '10:00 AM (24 Hours)',
    location: 'SDC Innovation Center',
    category: 'Hackathon',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    isPast: false
  },
  {
    id: 'evt-3',
    title: 'Alumni Tech Talk: Scalable Cloud Systems',
    description: 'Former technical leads return to share insights on engineering distributed microservices and handling high throughput infrastructure.',
    date: '2026-08-10',
    time: '16:00 - 18:00',
    location: 'Auditorium Hall B',
    category: 'Tech Talk',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
    isPast: true
  }
];

export const MOCK_POSITIONS: PositionDefinition[] = [
  {
    id: 'pos-1',
    title: 'Faculty Coordinator',
    description: 'Highest administrative authority responsible for faculty oversight, club policy approval, and position assignments.',
    assignedMemberId: 'mem-1',
    assignedMemberName: 'Dr. Rajesh Sharma'
  },
  {
    id: 'pos-2',
    title: 'Club President',
    description: 'Executive student leader overseeing overall club operations, project allocations, and general assembly management.',
    assignedMemberId: 'mem-2',
    assignedMemberName: 'Aarav Mehta'
  },
  {
    id: 'pos-3',
    title: 'Frontend Lead',
    description: 'Leads frontend technical direction, UI component standards, and design system governance across SDC web platforms.',
    assignedMemberId: 'mem-3',
    assignedMemberName: 'Priya Patel'
  },
  {
    id: 'pos-4',
    title: 'AI/ML Lead',
    description: 'Directs data science, machine learning models, and automation intelligence projects within the club.',
    assignedMemberId: 'mem-5',
    assignedMemberName: 'Sneha Kulkarni'
  },
  {
    id: 'pos-5',
    title: 'Event Coordinator',
    description: 'Manages logistics, registrations, and execution of workshops, hackathons, and technical talks.',
    assignedMemberId: undefined,
    assignedMemberName: undefined
  }
];
