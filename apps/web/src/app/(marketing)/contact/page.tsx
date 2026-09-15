'use client';

import React, { useState } from 'react';
import { tdghDb } from '@tdgh/db';
import { TicketDepartment, TicketPriority } from '@tdgh/types';
import { Badge, Button, Input, Textarea, Card, CardContent } from '@tdgh/ui';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: 'GENERAL' as TicketDepartment,
    subject: '',
    description: '',
    priority: 'NORMAL' as TicketPriority,
  });

  const [submittedTicketNumber, setSubmittedTicketNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const created = tdghDb.createTicket({
          subject: formData.subject,
          description: formData.description,
          department: formData.department,
          status: 'OPEN',
          priority: formData.priority,
          submittedByName: formData.fullName,
          submittedByEmail: formData.email,
          submittedByPhone: formData.phone,
        });

        setSubmittedTicketNumber(created.ticketNumber);
        setIsSubmitting(false);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-white border-b border-porcelain-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="electric">Unified Contact & Support Intake</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase tracking-wider">
              Routes Directly to Staff Triage Console
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-obsidian tracking-tight max-w-3xl">
            Let's Build Something Meaningful Together.
          </h1>

          <p className="text-lg text-obsidian-600 max-w-2xl leading-relaxed">
            Have a question regarding desk bookings, the 1-year Codetrepreneurs fellowship, 3D printing services, or donor partnerships? Submit below and our department heads will respond promptly.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Physical Location Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Interactive Support Intake Ticket Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-obsidian tracking-tight">
                Submit an Official Inquiry / Ticket
              </h3>
              <p className="text-xs text-obsidian-500 font-mono mt-1">
                Your submission is assigned a unique reference ID and triaged directly by TDGH staff.
              </p>
            </div>

            {submittedTicketNumber ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-emerald-950">Inquiry Logged Successfully!</h4>
                <p className="text-sm text-emerald-800 max-w-md mx-auto">
                  Your ticket reference is{' '}
                  <span className="font-mono font-black text-emerald-900 bg-white px-2.5 py-1 rounded border border-emerald-300">
                    {submittedTicketNumber}
                  </span>
                  . A confirmation has been routed to our staff triage queue.
                </p>
                <div className="pt-2 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmittedTicketNumber(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        department: 'GENERAL',
                        subject: '',
                        description: '',
                        priority: 'NORMAL',
                      });
                    }}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                  <a
                    href="http://localhost:3001/tickets"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-white text-emerald-900 border border-emerald-300 rounded-lg text-xs font-mono font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    View in Staff Admin Queue &rarr;
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                      Full Name *
                    </label>
                    <Input
                      required
                      placeholder="e.g. Sipho Ndlovu"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="e.g. sipho@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                      Phone / WhatsApp Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="e.g. +27 74 555 1234"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                      Department Target *
                    </label>
                    <select
                      className="flex h-11 w-full rounded-lg border border-porcelain-border bg-white px-3.5 py-2 text-sm text-obsidian focus:outline-none focus:border-obsidian focus:ring-1 focus:ring-obsidian"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value as TicketDepartment })
                      }
                    >
                      <option value="GENERAL">General Inquiries & Partnerships</option>
                      <option value="COWORKING">Co-Working Space & Boardroom Bookings</option>
                      <option value="CODETREPRENEURS">Codetrepreneurs Fellowship Admissions</option>
                      <option value="MAKER_3D">3D Printing Lab & Hardware Fabrication</option>
                      <option value="INCUBATION">Pre-Incubator & Startup Mentorship</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                    Subject Line *
                  </label>
                  <Input
                    required
                    placeholder="Brief summary of your inquiry..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                    Detailed Message *
                  </label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="How can The Daily Grind Hub assist your journey?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" /> Route Ticket to Staff Triage
                </Button>
              </form>
            )}
          </div>

          {/* Right: Physical Map & Campus Logistics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-obsidian text-white rounded-3xl p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-electric-blue font-semibold">
                  Scottsville Campus
                </span>
                <h3 className="text-2xl font-bold tracking-tight">
                  4 Midway, Scottsville
                </h3>
                <p className="text-xs text-obsidian-400 font-mono">
                  Kraaifontein, Cape Town, 7570, Western Cape
                </p>
              </div>

              <div className="space-y-4 text-xs text-obsidian-300 pt-2 border-t border-obsidian-800">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Physical Concourse:</strong>
                    <br />
                    4 Midway Street, corner of Scottsville Main Road. 3 minutes from Kraaifontein train station and taxi ranks.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Operating Hours:</strong>
                    <br />
                    Monday – Friday: 08:00 – 18:00
                    <br />
                    Saturday: 09:00 – 14:00 (Study & Maker Sessions)
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Direct Line:</strong>
                    <br />
                    +27 21 987 1000 &bull; WhatsApp: +27 74 555 1294
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Official Email:</strong>
                    <br />
                    info@dailygrindhub.co.za
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Map Representation */}
            <div className="rounded-3xl overflow-hidden border border-porcelain-border bg-porcelain h-64 relative flex items-center justify-center p-6 text-center">
              <div className="space-y-2">
                <MapPin className="w-8 h-8 text-electric-cobalt mx-auto animate-bounce" />
                <h4 className="font-bold text-obsidian">4 Midway, Scottsville Map Coordinates</h4>
                <p className="text-xs font-mono text-obsidian-500">
                  -33.8548&deg; S, 18.7183&deg; E
                </p>
                <a
                  href="https://maps.google.com/?q=-33.8548,18.7183"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-electric-cobalt hover:underline mt-2"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
