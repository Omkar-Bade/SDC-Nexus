import { Event } from '../types';
import { MOCK_EVENTS } from '../data/mockData';

export const eventService = {
  async getAllEvents(): Promise<Event[]> {
    return [...MOCK_EVENTS];
  },

  async getUpcomingEvents(): Promise<Event[]> {
    return MOCK_EVENTS.filter(e => !e.isPast);
  },

  async getPastEvents(): Promise<Event[]> {
    return MOCK_EVENTS.filter(e => e.isPast);
  }
};
