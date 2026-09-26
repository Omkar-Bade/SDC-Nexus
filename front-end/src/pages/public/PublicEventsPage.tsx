import React, { useState, useEffect } from 'react';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import { eventService } from '../../services/eventService';
import { Event } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

export const PublicEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    eventService.getAllEvents().then(setEvents);
  }, []);

  const filteredEvents = events.filter(e => tab === 'upcoming' ? !e.isPast : e.isPast);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F3F4F6] flex flex-col subtle-grid-bg">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <Badge variant="orange" className="mb-2">SDC EVENTS</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#F3F4F6]">Workshops & Events</h1>
          <p className="mt-2 text-sm text-[#9CA3AF]">
            Technical workshops, hackathons, and guest lectures organized by the Software Developer Club.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#14151A] p-1 rounded-xl border border-white/10 flex gap-1">
            <button
              onClick={() => setTab('upcoming')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === 'upcoming'
                  ? 'bg-[#FF5500] text-white shadow-md shadow-[#FF5500]/20'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setTab('past')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === 'past'
                  ? 'bg-[#FF5500] text-white shadow-md shadow-[#FF5500]/20'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Event List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(evt => (
            <Card key={evt.id} className="glass-card overflow-hidden p-0 flex flex-col justify-between">
              <div className="relative h-48 w-full overflow-hidden bg-[#1E2028]">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="orange">{evt.category}</Badge>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#F3F4F6] line-clamp-1">{evt.title}</h3>
                  <p className="mt-2 text-xs text-[#9CA3AF] leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-[#9CA3AF] pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                {!evt.isPast && (
                  <Button variant="primary" size="sm" className="w-full mt-2" icon={<ArrowRight className="w-4 h-4" />}>
                    Register for Event
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
