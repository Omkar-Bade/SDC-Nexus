import React, { useState, useEffect } from 'react';
import { positionService } from '../../services/positionService';
import { memberService } from '../../services/memberService';
import { PositionDefinition, Member } from '../../types';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { Award, Plus, Trash2, UserPlus, ShieldAlert } from 'lucide-react';

export const PositionManagementPage: React.FC = () => {
  const { showToast } = useToast();
  const [positions, setPositions] = useState<PositionDefinition[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<PositionDefinition | null>(null);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [assignMemberId, setAssignMemberId] = useState('');

  const loadData = () => {
    positionService.getAllPositions().then(setPositions);
    memberService.getAllMembers().then(setMembers);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreatePosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      await positionService.createPosition(newTitle, newDesc);
      showToast('Position created successfully', 'success');
      setNewTitle('');
      setNewDesc('');
      setIsCreateOpen(false);
      loadData();
    } catch {
      showToast('Failed to create position', 'error');
    }
  };

  const handleAssignPosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPosition) return;
    try {
      await positionService.assignPosition(selectedPosition.id, assignMemberId || undefined);
      showToast('Position assignment updated', 'success');
      setIsAssignOpen(false);
      setSelectedPosition(null);
      loadData();
    } catch {
      showToast('Failed to update position assignment', 'error');
    }
  };

  const handleRemovePosition = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this position definition?')) return;
    try {
      await positionService.removePosition(id);
      showToast('Position removed', 'info');
      loadData();
    } catch {
      showToast('Failed to remove position', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Position Management"
        subtitle="Create, assign, change, and remove organizational titles across SDC Nexus"
        badge={<Badge variant="orange">Faculty Administrator Only</Badge>}
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Create New Position
          </Button>
        }
      />

      {/* Positions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {positions.map((pos) => (
          <Card key={pos.id} className="glass-card flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FF5500]" />
                  <h3 className="text-lg font-bold text-[#F3F4F6]">{pos.title}</h3>
                </div>
                <Badge variant={pos.assignedMemberName ? 'orange' : 'neutral'}>
                  {pos.assignedMemberName ? 'Assigned' : 'Vacant'}
                </Badge>
              </div>

              <p className="text-xs text-[#9CA3AF] leading-relaxed mt-2">{pos.description}</p>

              <div className="mt-4 pt-3 border-t border-white/10 text-xs">
                <span className="text-[#6B7280]">Currently Assigned Member:</span>
                <div className="mt-1 font-semibold text-[#F3F4F6]">
                  {pos.assignedMemberName || <span className="text-amber-400 font-normal">Unassigned</span>}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedPosition(pos);
                  setAssignMemberId(pos.assignedMemberId || '');
                  setIsAssignOpen(true);
                }}
                icon={<UserPlus className="w-4 h-4" />}
              >
                Change Assignment
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemovePosition(pos.id)}
                className="text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Position Modal */}
      {isCreateOpen && (
        <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Position">
          <form onSubmit={handleCreatePosition} className="space-y-4">
            <Input
              label="Position Title"
              placeholder="e.g. Vice President, Marketing Head"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <Textarea
              label="Position Description"
              placeholder="Responsibilities and domain authority..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Position
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Assign Member Modal */}
      {isAssignOpen && selectedPosition && (
        <Modal isOpen={isAssignOpen} onClose={() => setIsAssignOpen(false)} title={`Assign: ${selectedPosition.title}`}>
          <form onSubmit={handleAssignPosition} className="space-y-4">
            <Select
              label="Select Member to Assign"
              value={assignMemberId}
              onChange={(e) => setAssignMemberId(e.target.value)}
              options={[
                { label: '-- Unassigned (Vacant) --', value: '' },
                ...members.map(m => ({ label: `${m.name} (${m.memberId})`, value: m.id }))
              ]}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsAssignOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Update Assignment
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
