'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge, Button, Input } from '@tdgh/ui';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    suburb: 'Scottsville, Kraaifontein',
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
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
            Create Hub Profile
          </h2>
          <p className="text-xs text-obsidian-500 font-mono">
            Build your unified applicant profile for Coding, 3D, and Incubation tracks.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-obsidian uppercase">
              Full Legal Name
            </label>
            <Input
              required
              placeholder="e.g. Kaylin Fortuin"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-obsidian uppercase">
              Email Address
            </label>
            <Input
              type="email"
              required
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-obsidian uppercase">
              WhatsApp / Mobile Number
            </label>
            <Input
              type="tel"
              required
              placeholder="+27 74 123 4567"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-obsidian uppercase">
              Residential Area / Suburb
            </label>
            <Input
              required
              placeholder="e.g. Scottsville, Bloekombos, Wallacedene"
              value={form.suburb}
              onChange={(e) => setForm({ ...form, suburb: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full text-sm font-semibold"
          >
            Create Account & Launch Dashboard &rarr;
          </Button>
        </form>

        <div className="text-center text-xs text-obsidian-500 pt-2 border-t border-porcelain-border">
          Already have a profile?{' '}
          <Link href="/login" className="font-semibold text-electric-cobalt hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
