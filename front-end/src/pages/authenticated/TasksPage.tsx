import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { taskService } from '../../services/taskService';
import { Task } from '../../types';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CheckSquare, Calendar, FolderKanban, User } from 'lucide-react';

export const TasksPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    taskService.getTasksForMember(currentUser.id).then(setTasks);
  }, [currentUser]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assigned Tasks"
        subtitle="Sprint tasks and engineering deliverables assigned to you"
        badge={<Badge variant="orange">{tasks.length} Assigned</Badge>}
      />

      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <Card key={task.id} hoverEffect={false} className="p-5 glass-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-[#FF5500] shrink-0" />
                    <h3 className="text-base font-bold text-[#F3F4F6]">{task.title}</h3>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-2xl pl-6">
                    {task.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7280] pt-3 pl-6">
                    <span className="flex items-center gap-1.5">
                      <FolderKanban className="w-3.5 h-3.5 text-[#38BDF8]" />
                      Project: <strong className="text-[#F3F4F6]">{task.projectName}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      Assigned Member: <strong className="text-[#F3F4F6]">{task.assignedMemberName}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF5500]" />
                      Deadline: <strong className="font-mono text-[#FF5500]">{task.deadline}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="p-8 text-center glass-panel rounded-xl text-sm text-[#9CA3AF]">
            No assigned tasks currently pending.
          </div>
        )}
      </div>
    </div>
  );
};
