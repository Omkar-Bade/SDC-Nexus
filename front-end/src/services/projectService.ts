import { Project } from '../types';
import { MOCK_PROJECTS } from '../data/mockData';

export const projectService = {
  async getAllProjects(): Promise<Project[]> {
    return [...MOCK_PROJECTS];
  },

  async getProjectById(id: string): Promise<Project | null> {
    const project = MOCK_PROJECTS.find(p => p.id === id);
    return project || null;
  },

  async getProjectsForMember(memberId: string): Promise<Project[]> {
    return MOCK_PROJECTS.filter(p => p.memberIds.includes(memberId) || p.leaderId === memberId);
  },

  async createProject(projectData: Omit<Project, 'id'>): Promise<Project> {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`
    };
    MOCK_PROJECTS.push(newProject);
    return newProject;
  }
};
