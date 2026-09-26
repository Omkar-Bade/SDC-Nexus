import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { PublicNavbar } from '../../components/common/PublicNavbar';
import { PublicFooter } from '../../components/common/PublicFooter';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Password reset link sent to your email', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F3F4F6] flex flex-col subtle-grid-bg">
      <PublicNavbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md glass-panel rounded-2xl p-8 border border-white/10 shadow-2xl">
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold font-heading text-[#F3F4F6]">Reset Password</h1>
                <p className="mt-1 text-xs text-[#9CA3AF]">
                  Enter your registered member email address to receive password reset instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Registered Email"
                  type="email"
                  placeholder="name@sdcnexus.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                  required
                />

                <Button type="submit" variant="primary" className="w-full mt-2">
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#F3F4F6]">Check Your Email</h2>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                We have sent password reset instructions to <span className="font-mono text-[#F3F4F6]">{email}</span>.
              </p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs">
            <Link to="/signin" className="text-[#FF5500] hover:underline font-semibold inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};
