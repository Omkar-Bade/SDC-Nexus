import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Code2, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const SignInPage: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('rohan.verma@sdcnexus.org');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(email);
      if (success) {
        showToast('Signed in successfully', 'success');
        navigate('/dashboard');
      } else {
        showToast('Invalid email address', 'error');
      }
    } catch {
      showToast('Authentication failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F3F4F6] flex flex-col subtle-grid-bg">
      <PublicNavbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md glass-panel rounded-2xl p-8 border border-white/10 shadow-2xl">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#FF5500] flex items-center justify-center text-white mx-auto shadow-lg shadow-[#FF5500]/30 mb-4">
              <Code2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-bold font-heading text-[#F3F4F6]">Sign In to SDC Nexus</h1>
            <p className="mt-1 text-xs text-[#9CA3AF]">
              Access your project workspace, tasks, and meetings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Member Email"
              type="email"
              placeholder="name@sdcnexus.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-[#6B7280] hover:text-[#F3F4F6]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-[#9CA3AF] cursor-pointer">
                <input type="checkbox" className="rounded bg-[#121318] border-white/10 text-[#FF5500]" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[#FF5500] hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Workspace
            </Button>
          </form>

          {/* Preset Helper Accounts */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] text-center mb-3">
              Quick Test Demo Accounts
            </p>
            <div className="space-y-1.5 text-xs">
              <button
                type="button"
                onClick={() => setEmail('rajesh.sharma@sdcnexus.org')}
                className="w-full text-left p-2 rounded bg-[#14151A] hover:bg-white/5 text-[#9CA3AF] flex items-center justify-between"
              >
                <span>Faculty Coordinator</span>
                <span className="font-mono text-[10px] text-[#6B7280]">rajesh.sharma@...</span>
              </button>
              <button
                type="button"
                onClick={() => setEmail('aarav.mehta@sdcnexus.org')}
                className="w-full text-left p-2 rounded bg-[#14151A] hover:bg-white/5 text-[#9CA3AF] flex items-center justify-between"
              >
                <span>Club President</span>
                <span className="font-mono text-[10px] text-[#6B7280]">aarav.mehta@...</span>
              </button>
              <button
                type="button"
                onClick={() => setEmail('priya.patel@sdcnexus.org')}
                className="w-full text-left p-2 rounded bg-[#14151A] hover:bg-white/5 text-[#9CA3AF] flex items-center justify-between"
              >
                <span>Project Leader</span>
                <span className="font-mono text-[10px] text-[#6B7280]">priya.patel@...</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-[#9CA3AF]">
            Not an SDC member yet?{' '}
            <Link to="/register" className="text-[#FF5500] hover:underline font-semibold">
              Apply to Join
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
