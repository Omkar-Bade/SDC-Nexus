import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { memberService } from '../../services/memberService';
import { Member } from '../../types';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { ArrowLeft, Award, CreditCard } from 'lucide-react';
import { DigitalMemberIDModal } from '../../components/common/DigitalMemberIDModal';

export const MemberProfileAdminPage: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const { currentUser, activeRole } = useAuth();
  const { showToast } = useToast();
  const [member, setMember] = useState<Member | null>(null);
  const [newPosition, setNewPosition] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDigitalIDOpen, setIsDigitalIDOpen] = useState(false);

  useEffect(() => {
    if (!memberId || !currentUser) return;
    memberService.getMemberById(memberId, currentUser)
      .then(m => {
        setMember(m);
        if (m) setNewPosition(m.clubPosition);
      })
      .catch(() => {
        setErrorMsg('UNAUTHORIZED_PROFILE_ACCESS');
      });
  }, [memberId, currentUser]);

  const handlePositionUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;
    try {
      await memberService.updateMemberPosition(member.id, newPosition);
      showToast('Member position updated successfully', 'success');
      setMember({ ...member, clubPosition: newPosition });
    } catch {
      showToast('Failed to update position', 'error');
    }
  };

  if (errorMsg === 'UNAUTHORIZED_PROFILE_ACCESS') {
    return (
      <div className="p-8 text-center glass-panel rounded-2xl">
        <h3 className="text-xl font-bold text-red-400">Access Restricted</h3>
        <p className="mt-2 text-sm text-[#9CA3AF]">
          Normal members cannot view private profiles of other members according to SDC Nexus privacy rules.
        </p>
        <Link to="/dashboard" className="mt-4 inline-block">
          <Button variant="secondary" size="sm">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  if (!member) return null;

  return (
    <div className="space-y-6">
      <Link to="/admin/members" className="text-xs text-[#9CA3AF] hover:text-[#FF5500] inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Member Directory
      </Link>

      <PageHeader
        title={`Member Administration: ${member.name}`}
        subtitle={`Member ID: ${member.memberId}`}
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDigitalIDOpen(true)}
            icon={<CreditCard className="w-4 h-4 text-[#FF5500]" />}
          >
            Digital Member ID
          </Button>
        }
      />

      <Card className="glass-panel p-6 flex flex-col sm:flex-row items-start gap-6">
        <Avatar src={member.photo} name={member.name} size="xl" className="ring-2 ring-[#FF5500]/30" />
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-[#F3F4F6]">{member.name}</h3>
            <Badge variant="orange">{member.systemRole}</Badge>
          </div>
          <p className="text-xs font-semibold text-[#FF5500]">{member.clubPosition}</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#9CA3AF] pt-2">
            <div>Email: <strong className="text-[#F3F4F6]">{member.email}</strong></div>
            <div>Department: <strong className="text-[#F3F4F6]">{member.department}</strong></div>
            <div>Year: <strong className="text-[#F3F4F6]">{member.academicYear}</strong></div>
            <div>Joined: <strong className="text-[#F3F4F6]">{member.joinedDate}</strong></div>
          </div>
        </div>
      </Card>

      {/* Position Assignment Controls for Faculty Coordinator */}
      {activeRole === 'Faculty Coordinator' && (
        <Card className="glass-card space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FF5500]" />
            <h3 className="text-base font-bold text-[#F3F4F6]">Faculty Position Control</h3>
          </div>
          <form onSubmit={handlePositionUpdate} className="flex gap-3 max-w-md">
            <Input
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              placeholder="e.g. Vice President, Frontend Lead"
              required
            />
            <Button type="submit" variant="primary" className="shrink-0">
              Update Position
            </Button>
          </form>
        </Card>
      )}

      {/* Digital ID Modal */}
      {isDigitalIDOpen && (
        <DigitalMemberIDModal
          isOpen={isDigitalIDOpen}
          onClose={() => setIsDigitalIDOpen(false)}
          member={member}
        />
      )}
    </div>
  );
};
