'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { tdghDb } from '@tdgh/db';
import { Ticket, TicketStatus, TicketDepartment } from '@tdgh/types';
import { Badge, Button, Input, Textarea } from '@tdgh/ui';
import {
  ArrowLeft,
  Send,
  User,
  Clock,
  Shield,
  Phone,
  Mail,
  CheckCircle,
  FileText,
  Lock,
} from 'lucide-react';

export default function AdminTicketDetailPage() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params?.ticketId as string;

  const [ticket, setTicket] = useState<Ticket | undefined>(tdghDb.getTicketById(ticketId));
  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);

  if (!ticket) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold">Ticket not found</h2>
        <Link href="/tickets" className="text-electric-cobalt hover:underline text-xs font-mono">
          &larr; Return to Triage Board
        </Link>
      </div>
    );
  }

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    tdghDb.addTicketMessage(ticket.id, {
      senderId: 'team-admin',
      senderName: 'Kurt Minnaar',
      senderRole: 'SUPER_ADMIN',
      isInternalNote,
      content: replyText.trim(),
    });

    setTicket(tdghDb.getTicketById(ticket.id));
    setReplyText('');
  };

  const handleStatusUpdate = (status: TicketStatus) => {
    const updated = tdghDb.updateTicketStatus(ticket.id, status);
    setTicket({ ...updated });
  };

  // Canned responses for rapid triage
  const CANNED_RESPONSES = [
    'Hi, thanks for reaching out! We have confirmed your boardroom reservation for Friday. Coffee and 4K display are ready.',
    'Thank you for your application to Codetrepreneurs! We have verified your GitHub repo and scheduled your aptitude assessment.',
    'Hi! Our 3D FabLab has received your STL file. The estimated print time is 4.5 hours in recycled PETG.',
  ];

  return (
    <div className="space-y-6">
      <Link
        href="/tickets"
        className="inline-flex items-center gap-2 text-xs font-mono text-obsidian-500 hover:text-obsidian"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Triage Queue
      </Link>

      {/* Top Action Bar */}
      <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-electric-cobalt font-bold">{ticket.ticketNumber}</span>
            <Badge variant="default">{ticket.department}</Badge>
            <Badge variant={ticket.priority === 'URGENT' ? 'danger' : 'default'}>
              {ticket.priority} Priority
            </Badge>
          </div>
          <h1 className="text-2xl font-black text-obsidian tracking-tight mt-1">
            {ticket.subject}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-obsidian-500">Status:</span>
          <select
            value={ticket.status}
            onChange={(e) => handleStatusUpdate(e.target.value as TicketStatus)}
            className="text-xs font-mono font-semibold bg-porcelain border border-porcelain-border rounded-lg px-3 py-1.5 text-obsidian focus:outline-none"
          >
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="WAITING_ON_USER">WAITING_ON_USER</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      {/* Main Split: Left Audit Thread, Right Submitter Profile Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Messages & Reply */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-4 bg-porcelain rounded-2xl border border-porcelain-border text-xs space-y-1">
              <span className="font-mono text-obsidian-400">Original Inquiry Payload:</span>
              <p className="text-obsidian-700 leading-relaxed">{ticket.description}</p>
            </div>

            {/* Thread History */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {ticket.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl text-xs space-y-1.5 ${
                    msg.isInternalNote
                      ? 'bg-amber-50 border border-amber-200 text-amber-950'
                      : msg.senderRole === 'SUPER_ADMIN' || msg.senderRole === 'DEPARTMENT_STAFF'
                      ? 'bg-blue-50 border border-blue-200 text-blue-950 ml-4'
                      : 'bg-porcelain border border-porcelain-border text-obsidian mr-4'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="font-bold flex items-center gap-1.5">
                      {msg.isInternalNote && <Lock className="w-3 h-3 text-amber-600" />}
                      {msg.senderName} ({msg.senderRole})
                    </span>
                    <span className="text-obsidian-400">
                      {new Date(msg.createdAt).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Canned Responses Shortcut Buttons */}
          <div className="space-y-2 pt-4 border-t border-porcelain-border">
            <span className="text-[10px] font-mono uppercase text-obsidian-400">
              One-Click Canned Responses:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CANNED_RESPONSES.map((canned, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setReplyText(canned)}
                  className="text-[11px] font-mono bg-porcelain hover:bg-porcelain-muted text-obsidian-600 px-2.5 py-1 rounded-md border border-porcelain-border truncate max-w-xs"
                >
                  "{canned}"
                </button>
              ))}
            </div>
          </div>

          {/* Response Form */}
          <form onSubmit={handleSendResponse} className="space-y-3 pt-2">
            <div className="flex items-center gap-4 text-xs font-mono">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isInternalNote}
                  onChange={(e) => setIsInternalNote(e.target.checked)}
                  className="rounded text-amber-500 accent-amber-500"
                />
                <span className={isInternalNote ? 'text-amber-700 font-bold' : 'text-obsidian-500'}>
                  Internal Staff Note (Hidden from applicant)
                </span>
              </label>
            </div>

            <Textarea
              rows={3}
              placeholder={
                isInternalNote
                  ? 'Add internal staff comment or escalation note...'
                  : 'Type public response to applicant...'
              }
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="text-xs"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-obsidian-400">
                Logged under Kurt Minnaar (Super Admin)
              </span>
              <Button type="submit" variant="primary" size="sm">
                <Send className="w-3.5 h-3.5 mr-1.5" /> Dispatch Reply
              </Button>
            </div>
          </form>
        </div>

        {/* Right: Submitter Profile Context Drawer */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-6">
          <div className="space-y-1 border-b border-porcelain-border pb-4">
            <span className="text-xs font-mono uppercase text-obsidian-400">
              Applicant Profile Context
            </span>
            <h3 className="text-lg font-bold text-obsidian">
              {ticket.submittedByName}
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-obsidian-700">
              <Mail className="w-4 h-4 text-obsidian-400 shrink-0" />
              <span>{ticket.submittedByEmail}</span>
            </div>
            {ticket.submittedByPhone && (
              <div className="flex items-center gap-2 text-obsidian-700">
                <Phone className="w-4 h-4 text-obsidian-400 shrink-0" />
                <span>{ticket.submittedByPhone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-obsidian-700">
              <Clock className="w-4 h-4 text-obsidian-400 shrink-0" />
              <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="p-4 bg-porcelain rounded-2xl border border-porcelain-border space-y-2">
            <div className="text-[11px] font-mono uppercase font-bold text-obsidian">
              Department Assigned
            </div>
            <p className="text-xs text-obsidian-600">
              Target: <strong>{ticket.department}</strong>
            </p>
            <p className="text-xs text-obsidian-600">
              Lead Officer: <strong>{ticket.assignedToName || 'Unassigned Queue'}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
