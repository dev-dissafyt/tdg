'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { tdghDb } from '@tdgh/db';
import { Ticket, TicketMessage } from '@tdgh/types';
import { Badge, Button, Input, Textarea, Card, CardContent } from '@tdgh/ui';
import { ArrowLeft, MessageSquare, Send, CheckCircle2, Clock, Plus, Shield } from 'lucide-react';

export default function UserTicketsPortalPage() {
  const [tickets, setTickets] = useState<Ticket[]>(tdghDb.getTickets());
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [replyContent, setReplyContent] = useState('');

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !selectedTicket) return;

    const newMsg = tdghDb.addTicketMessage(selectedTicket.id, {
      senderId: 'user-current',
      senderName: 'Kaylin Fortuin',
      senderRole: 'APPLICANT',
      isInternalNote: false,
      content: replyContent.trim(),
    });

    // Refresh tickets from state store
    setTickets([...tdghDb.getTickets()]);
    setReplyContent('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        href="/portal/dashboard"
        className="inline-flex items-center gap-2 text-xs font-mono text-obsidian-500 hover:text-obsidian"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Portal Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Support Triage Pipeline</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase tracking-wider">
              Scottsville Help Desk
            </span>
          </div>
          <h1 className="text-3xl font-black text-obsidian tracking-tight mt-1">
            My Inquiries & Support Tickets
          </h1>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-obsidian text-white text-xs font-mono font-semibold hover:bg-electric-cobalt transition-colors shadow-tactile"
        >
          <Plus className="w-4 h-4" /> Submit New Inquiry
        </Link>
      </div>

      {/* Ticket List & Thread Split-Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Ticket Selector List */}
        <div className="lg:col-span-4 space-y-3">
          {tickets.map((t) => {
            const isSelected = t.id === selectedTicket?.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicketId(t.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-obsidian shadow-sm'
                    : 'bg-porcelain border-porcelain-border hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-electric-cobalt">
                    {t.ticketNumber}
                  </span>
                  <Badge variant={t.status === 'OPEN' ? 'amber' : t.status === 'IN_PROGRESS' ? 'electric' : 'emerald'}>
                    {t.status}
                  </Badge>
                </div>
                <h4 className="font-bold text-sm text-obsidian mt-2 line-clamp-1">{t.subject}</h4>
                <p className="text-xs text-obsidian-500 font-mono mt-1">
                  Dept: {t.department} &bull; {t.messages.length} messages
                </p>
              </div>
            );
          })}
        </div>

        {/* Right: Message Audit Log & Reply Console */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-porcelain-border p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6 min-h-[500px]">
          {selectedTicket ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              {/* Ticket Meta Header */}
              <div className="space-y-2 border-b border-porcelain-border pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-electric-cobalt">
                    {selectedTicket.ticketNumber}
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{selectedTicket.department}</Badge>
                    <Badge variant={selectedTicket.priority === 'URGENT' ? 'danger' : 'default'}>
                      {selectedTicket.priority} Priority
                    </Badge>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-obsidian tracking-tight">
                  {selectedTicket.subject}
                </h2>
                <p className="text-xs text-obsidian-600 leading-relaxed bg-porcelain p-3.5 rounded-xl border border-porcelain-border">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Message Thread History */}
              <div className="space-y-4 overflow-y-auto max-h-[360px] pr-2">
                {selectedTicket.messages.length === 0 ? (
                  <div className="text-center py-8 text-xs font-mono text-obsidian-400">
                    No replies yet. A TDGH department officer will review your ticket shortly.
                  </div>
                ) : (
                  selectedTicket.messages.map((msg) => {
                    const isStaff = msg.senderRole === 'DEPARTMENT_STAFF' || msg.senderRole === 'SUPER_ADMIN';
                    return (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-2xl text-xs space-y-1.5 ${
                          isStaff
                            ? 'bg-blue-50 border border-blue-200 text-blue-950 ml-6'
                            : 'bg-porcelain border border-porcelain-border text-obsidian mr-6'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <strong className={isStaff ? 'text-electric-cobalt' : 'text-obsidian'}>
                            {msg.senderName} {isStaff && '(Staff)'}
                          </strong>
                          <span className="text-obsidian-400">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    );
                  })
                )}
              </div>

              {/* User Reply Form */}
              <form onSubmit={handleSendReply} className="space-y-3 pt-4 border-t border-porcelain-border">
                <Textarea
                  rows={3}
                  placeholder="Add a reply or follow-up question for Hub staff..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="text-xs"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-obsidian-400">
                    Routed to: {selectedTicket.department} desk
                  </span>
                  <Button type="submit" variant="primary" size="sm">
                    <Send className="w-3.5 h-3.5 mr-1.5" /> Send Message
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-20 text-xs font-mono text-obsidian-400">
              Select a ticket on the left to view response audit logs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
