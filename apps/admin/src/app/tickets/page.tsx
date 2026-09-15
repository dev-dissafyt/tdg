'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { tdghDb } from '@tdgh/db';
import { Ticket, TicketDepartment, TicketStatus } from '@tdgh/types';
import { Badge, Button, Tabs, Card } from '@tdgh/ui';
import { Inbox, Filter, ArrowRight, UserCheck, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(tdghDb.getTickets());
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  const filteredTickets = tickets.filter((t) => {
    if (selectedDept === 'ALL') return true;
    return t.department === selectedDept;
  });

  const columns: { status: TicketStatus; label: string; color: string }[] = [
    { status: 'OPEN', label: 'Unassigned / Open', color: 'border-amber-400' },
    { status: 'IN_PROGRESS', label: 'In Progress / Assigned', color: 'border-blue-500' },
    { status: 'WAITING_ON_USER', label: 'Waiting on User', color: 'border-purple-500' },
    { status: 'RESOLVED', label: 'Resolved / Closed', color: 'border-emerald-500' },
  ];

  const handleQuickStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    const updated = tdghDb.updateTicketStatus(ticketId, newStatus);
    setTickets([...tdghDb.getTickets()]);
  };

  return (
    <div className="space-y-8">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Multi-Department Triage</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase">
              Inquiry Dispatch Pipeline
            </span>
          </div>
          <h1 className="text-3xl font-black text-obsidian tracking-tight mt-1">
            Ticketing Triage Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-porcelain border border-porcelain-border rounded-lg p-1 flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-obsidian shadow-sm' : 'text-obsidian-500'
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                viewMode === 'table' ? 'bg-white text-obsidian shadow-sm' : 'text-obsidian-500'
              }`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {/* Department Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-porcelain-border pb-4">
        {[
          { id: 'ALL', label: 'All Departments' },
          { id: 'COWORKING', label: 'Co-Working & Desks' },
          { id: 'CODETREPRENEURS', label: 'Codetrepreneurs Admissions' },
          { id: 'MAKER_3D', label: '3D Maker Studio' },
          { id: 'INCUBATION', label: 'Pre-Incubation BMS' },
          { id: 'GENERAL', label: 'General & Donors' },
        ].map((dept) => {
          const isSelected = selectedDept === dept.id;
          return (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                isSelected
                  ? 'bg-obsidian text-white font-semibold'
                  : 'bg-white text-obsidian-600 border border-porcelain-border hover:bg-porcelain'
              }`}
            >
              {dept.label}
            </button>
          );
        })}
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {columns.map((col) => {
            const colTickets = filteredTickets.filter((t) => t.status === col.status);
            return (
              <div
                key={col.status}
                className="bg-white rounded-3xl border border-porcelain-border p-4 shadow-sm space-y-4 min-h-[500px]"
              >
                <div className={`border-t-4 ${col.color} pt-2 flex items-center justify-between`}>
                  <h3 className="text-xs font-bold font-mono text-obsidian uppercase">
                    {col.label}
                  </h3>
                  <span className="text-xs font-mono text-obsidian-500 bg-porcelain px-2 py-0.5 rounded-full">
                    {colTickets.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-4 rounded-xl bg-porcelain border border-porcelain-border space-y-3 hover:border-obsidian transition-colors shadow-xs group"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-electric-cobalt font-bold">
                          {ticket.ticketNumber}
                        </span>
                        <Badge variant={ticket.priority === 'URGENT' ? 'danger' : 'default'}>
                          {ticket.priority}
                        </Badge>
                      </div>

                      <Link href={`/tickets/${ticket.id}`} className="block space-y-1">
                        <h4 className="text-xs font-bold text-obsidian group-hover:text-electric-cobalt transition-colors line-clamp-2">
                          {ticket.subject}
                        </h4>
                        <p className="text-[11px] text-obsidian-500 line-clamp-2">
                          {ticket.description}
                        </p>
                      </Link>

                      <div className="text-[10px] font-mono text-obsidian-400 pt-2 border-t border-porcelain-border flex items-center justify-between">
                        <span>{ticket.submittedByName}</span>
                        <span className="text-obsidian-600 font-bold">{ticket.department}</span>
                      </div>

                      {/* Quick stage toggle buttons */}
                      <div className="flex items-center gap-1 pt-1">
                        {col.status === 'OPEN' && (
                          <button
                            onClick={() => handleQuickStatusChange(ticket.id, 'IN_PROGRESS')}
                            className="w-full py-1 bg-obsidian text-white rounded text-[10px] font-mono hover:bg-electric-cobalt"
                          >
                            Assign to Staff &rarr;
                          </button>
                        )}
                        {col.status === 'IN_PROGRESS' && (
                          <button
                            onClick={() => handleQuickStatusChange(ticket.id, 'RESOLVED')}
                            className="w-full py-1 bg-emerald-600 text-white rounded text-[10px] font-mono hover:bg-emerald-700"
                          >
                            Mark Resolved &check;
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {colTickets.length === 0 && (
                    <div className="text-center py-12 text-xs font-mono text-obsidian-400">
                      No tickets in queue
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-porcelain-border overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-porcelain border-b border-porcelain-border font-mono text-[11px] uppercase text-obsidian-500">
              <tr>
                <th className="p-4">Reference</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Department</th>
                <th className="p-4">Submitter</th>
                <th className="p-4">Status</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-porcelain-border font-mono">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-porcelain/50 transition-colors">
                  <td className="p-4 font-bold text-electric-cobalt">{t.ticketNumber}</td>
                  <td className="p-4 font-sans font-semibold text-obsidian max-w-xs truncate">
                    {t.subject}
                  </td>
                  <td className="p-4">{t.department}</td>
                  <td className="p-4">{t.submittedByName}</td>
                  <td className="p-4">
                    <Badge variant={t.status === 'OPEN' ? 'amber' : t.status === 'IN_PROGRESS' ? 'electric' : 'emerald'}>
                      {t.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant={t.priority === 'URGENT' ? 'danger' : 'default'}>
                      {t.priority}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/tickets/${t.id}`}
                      className="text-electric-blue hover:underline font-semibold"
                    >
                      Inspect &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
