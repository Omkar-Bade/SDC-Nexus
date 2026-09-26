import { Task } from '../types';
import { MOCK_TASKS } from '../data/mockData';

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    return [...MOCK_TASKS];
  },

  async getTasksForMember(memberId: string): Promise<Task[]> {
    return MOCK_TASKS.filter(t => t.assignedMemberId === memberId);
  },

  async getTasksForProject(projectId: string): Promise<Task[]> {
    return MOCK_TASKS.filter(t => t.projectId === projectId);
  },

  async createTask(taskData: Omit<Task, 'id'>): Promise<Task> {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`
    };
    MOCK_TASKS.push(newTask);
    return newTask;
  }
};
