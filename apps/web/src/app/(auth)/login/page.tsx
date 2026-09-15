'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge, Button, Input } from '@tdgh/ui';
import { ArrowRight, Mail, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsMagicLinkSent(true);
    }, 600);
  };

  const handleDirectDemoLogin = () => {
    router.push('/portal/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-obsidian text-white flex items-center justify-center font-mono font-black text-xl mx-auto shadow-tactile">
            TDG
          </div>
          <h2 className="text-2xl font-black text-obsidian tracking-tight">
            Applicant & Member Portal
          </h2>
          <p className="text-xs text-obsidian-500 font-mono">
            Track your cohort applications, desk reservations, and support tickets.
          </p>
        </div>

        {isMagicLinkSent ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-emerald-950 text-base">Magic Link Dispatched!</h4>
            <p className="text-xs text-emerald-800">
              We emailed a secure sign-in token to <strong>{email}</strong>. Click the link in your inbox to access your portal.
            </p>
            <Button
              variant="electric"
              size="md"
              onClick={handleDirectDemoLogin}
              className="w-full text-xs font-mono"
            >
              Continue to Dashboard Demo &rarr;
            </Button>
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
                <Mail className="w-4 h-4 text-obsidian-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full text-sm font-semibold"
            >
              Send Passwordless Magic Link &rarr;
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-porcelain-border" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono">
                <span className="bg-white px-2 text-obsidian-400">Demo Instant Access</span>
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={handleDirectDemoLogin}
              className="w-full text-xs font-mono"
            >
              ⚡ Enter Demo Applicant Dashboard
            </Button>
          </form>
        )}

        <div className="text-center text-xs text-obsidian-500 pt-2 border-t border-porcelain-border">
          New to The Daily Grind Hub?{' '}
          <Link href="/register" className="font-semibold text-electric-cobalt hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
