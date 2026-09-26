import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { meetingService } from '../../services/meetingService';
import { Meeting } from '../../types';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export const MeetingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    meetingService.getMeetingsForMember(currentUser.id).then(setMeetings);
  }, [currentUser]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meetings & Sprint Syncs"
        subtitle="Scheduled project syncs, club assemblies, and committee meetings"
        badge={<Badge variant="orange">{meetings.length} Meetings</Badge>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((m) => (
          <Card key={m.id} className="glass-card flex flex-col justify-between border-l-4 border-l-[#FF5500]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant={m.type === 'Executive' ? 'orange' : m.type === 'Project' ? 'blue' : 'neutral'}>
                  {m.type} Sync
                </Badge>
                {m.projectName && (
                  <span className="text-xs font-mono text-[#9CA3AF] truncate max-w-[150px]">{m.projectName}</span>
                )}
              </div>

              <h3 className="text-base font-bold text-[#F3F4F6]">{m.title}</h3>

              <div className="space-y-2 text-xs text-[#9CA3AF] mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Date: <strong className="text-[#F3F4F6]">{m.date}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Time: <strong className="text-[#F3F4F6]">{m.time}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Location: <strong className="text-[#F3F4F6]">{m.location}</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#6B7280]">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {m.participantIds.length} Invited Participants
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
