import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { authService } from '../../services/authService';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Code2, User, Mail, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.register(name, email, department);
      showToast('Registration submitted successfully! Please sign in.', 'success');
      navigate('/signin');
    } catch {
      showToast('Registration failed.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F3F4F6] flex flex-col subtle-grid-bg">
      <PublicNavbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md glass-panel rounded-2xl p-8 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#FF5500] flex items-center justify-center text-white mx-auto shadow-lg shadow-[#FF5500]/30 mb-4">
              <Code2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-[#F3F4F6]">Join Software Developer Club</h1>
            <p className="mt-1 text-xs text-[#9CA3AF]">
              Create your SDC Nexus account and start collaborating.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Vikram Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Student Email"
              type="email"
              placeholder="your.name@student.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Select
              label="Academic Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              options={[
                { label: 'Computer Science & Engineering', value: 'Computer Science & Engineering' },
                { label: 'Information Technology', value: 'Information Technology' },
                { label: 'Artificial Intelligence & Data Science', value: 'Artificial Intelligence & Data Science' },
                { label: 'Electronics & Communication', value: 'Electronics & Communication' }
              ]}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              isLoading={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Submit Membership Registration
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-[#9CA3AF]">
            Already registered?{' '}
            <Link to="/signin" className="text-[#FF5500] hover:underline font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
