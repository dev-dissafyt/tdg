import React from 'react';
import Link from 'next/link';
import { tdghDb } from '@tdgh/db';
import { Badge, Card, CardHeader, CardTitle, CardContent } from '@tdgh/ui';
import {
  Users,
  Inbox,
  GraduationCap,
  Sparkles,
  Building2,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const tickets = tdghDb.getTickets();
  const applications = tdghDb.getApplications();
  const cohorts = tdghDb.getCohorts();
  const zones = tdghDb.getCoworkZones();

  const openTickets = tickets.filter((t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS');
  const pendingApps = applications.filter((a) => a.stage === 'SUBMITTED' || a.stage === 'IN_REVIEW');

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Hub Telemetry</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase">
              Real-Time Operations
            </span>
          </div>
          <h1 className="text-3xl font-black text-obsidian tracking-tight mt-1">
            Scottsville Operations Telemetry
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/tickets"
            className="px-4 py-2 bg-obsidian text-white rounded-lg text-xs font-mono font-semibold hover:bg-electric-cobalt transition-colors shadow-tactile"
          >
            Triage Inquiries &rarr;
          </Link>
        </div>
      </div>

      {/* Top 4 Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-porcelain-border p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-obsidian-500 font-semibold">
              Open Inquiries
            </span>
            <Inbox className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-black font-mono text-obsidian">
            {openTickets.length}{' '}
            <span className="text-xs font-normal text-obsidian-500">Tickets</span>
          </div>
          <div className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block">
            Across 5 Hub Departments
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-porcelain-border p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-obsidian-500 font-semibold">
              Pending Admissions
            </span>
            <Users className="w-5 h-5 text-electric-cobalt" />
          </div>
          <div className="text-3xl font-black font-mono text-obsidian">
            {pendingApps.length}{' '}
            <span className="text-xs font-normal text-obsidian-500">Applicants</span>
          </div>
          <div className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block">
            2026 Cohort Review Queue
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-porcelain-border p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-obsidian-500 font-semibold">
              Active Fellows
            </span>
            <GraduationCap className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black font-mono text-obsidian">
            38{' '}
            <span className="text-xs font-normal text-obsidian-500">Enrolled</span>
          </div>
          <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
            22 Coders &bull; 16 3D Makers
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-porcelain-border p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-obsidian-500 font-semibold">
              Facility Occupancy
            </span>
            <Building2 className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-black font-mono text-obsidian">
            84%{' '}
            <span className="text-xs font-normal text-obsidian-500">Capacity</span>
          </div>
          <div className="text-xs font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded inline-block">
            4 Midway Concourse Active
          </div>
        </div>
      </div>

      {/* Middle Grid: Triage Queue + Cowork Space Occupancy Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Department Triage Breakdown */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-porcelain-border pb-4">
            <div>
              <h3 className="text-lg font-bold text-obsidian tracking-tight">
                Department Triage Pipeline
              </h3>
              <p className="text-xs font-mono text-obsidian-500">
                Live routing queue from marketing intake forms
              </p>
            </div>
            <Link
              href="/tickets"
              className="text-xs font-mono font-bold text-electric-cobalt hover:underline"
            >
              Open Kanban Console &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {tickets.slice(0, 4).map((ticket) => (
              <Link
                key={ticket.id}
                href={`/tickets/${ticket.id}`}
                className="p-4 rounded-xl bg-porcelain border border-porcelain-border flex items-center justify-between hover:bg-white hover:border-obsidian transition-all group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-electric-cobalt font-bold">
                      {ticket.ticketNumber}
                    </span>
                    <Badge variant={ticket.status === 'OPEN' ? 'amber' : 'electric'}>
                      {ticket.status}
                    </Badge>
                    <span className="text-obsidian-400">&bull; {ticket.department}</span>
                  </div>
                  <h4 className="text-xs font-bold text-obsidian group-hover:text-electric-cobalt transition-colors line-clamp-1">
                    {ticket.subject}
                  </h4>
                  <p className="text-[11px] text-obsidian-500">
                    From: {ticket.submittedByName} ({ticket.submittedByEmail})
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-obsidian-400 group-hover:text-obsidian shrink-0 ml-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Coworking Space Capacity Gauges */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-porcelain-border pb-4">
            <div>
              <h3 className="text-lg font-bold text-obsidian tracking-tight">
                Zone Occupancy Gauges
              </h3>
              <p className="text-xs font-mono text-obsidian-500">
                Spatial utilization at 4 Midway
              </p>
            </div>
            <Link
              href="/cms/cowork-spaces"
              className="text-xs font-mono font-bold text-electric-cobalt hover:underline"
            >
              Edit Spaces &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {zones.slice(0, 5).map((zone) => (
              <div key={zone.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-semibold text-obsidian">{zone.name}</span>
                  <span className="text-obsidian-500">{zone.capacity} max seats</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-porcelain-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(zone.capacity * 4, 90)}%`,
                      backgroundColor: zone.colorToken,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
