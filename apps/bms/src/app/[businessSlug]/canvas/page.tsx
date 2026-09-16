'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { tdghDb } from '@tdgh/db';
import { BmcBlockType, BmsCanvas, BmcCard } from '@tdgh/types';
import { Badge, Button, Input, Textarea, Modal } from '@tdgh/ui';
import {
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Sparkles,
  Users,
  Layers,
  HeartHandshake,
  DollarSign,
  TrendingUp,
  FileText,
  ShieldCheck,
  Share2,
} from 'lucide-react';

export default function BusinessModelCanvasPage() {
  const params = useParams();
  const businessSlug = (params?.businessSlug as string) || 'kasipay';

  const [canvas, setCanvas] = useState<BmsCanvas>(() => tdghDb.getBmsCanvas(businessSlug));
  const [editingCard, setEditingCard] = useState<{ block: BmcBlockType; card?: BmcCard } | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [saveBanner, setSavedBanner] = useState<string | null>(null);

  // Venture Profile Edit State
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    businessName: canvas.businessName || '',
    tagline: canvas.tagline || '',
    founderName: canvas.founderName || 'Sipho Ndlovu',
    founderEmail: canvas.founderEmail || 'sipho@kasipay.co.za',
    founderPhone: canvas.founderPhone || '+27 82 456 7890',
    industrySector: canvas.industrySector || 'Fintech & Micro-Payments',
    stage: canvas.stage || 'Pilot Phase (26 Active Retailers)',
    cipcNumber: canvas.cipcNumber || '2024/782194/07',
    taxPin: canvas.taxPin || '9823-1490-5512',
    location: canvas.location || 'Kraaifontein (Scottsville & Bloekombos)',
  });

  const blockDefinitions: {
    type: BmcBlockType;
    label: string;
    description: string;
    color: string;
    icon: any;
    colSpan?: string;
  }[] = [
    {
      type: 'KEY_PARTNERS',
      label: 'Key Partners',
      description: 'Who are our key partners and suppliers?',
      color: 'border-l-4 border-blue-500',
      icon: Users,
    },
    {
      type: 'KEY_ACTIVITIES',
      label: 'Key Activities',
      description: 'What key activities do our value propositions require?',
      color: 'border-l-4 border-cyan-500',
      icon: Layers,
    },
    {
      type: 'VALUE_PROPOSITIONS',
      label: 'Value Propositions',
      description: 'What core value do we deliver to the customer?',
      color: 'border-l-4 border-purple-600',
      icon: Sparkles,
    },
    {
      type: 'CUSTOMER_RELATIONSHIPS',
      label: 'Customer Relationships',
      description: 'What relationship does each customer segment expect?',
      color: 'border-l-4 border-rose-500',
      icon: HeartHandshake,
    },
    {
      type: 'CUSTOMER_SEGMENTS',
      label: 'Customer Segments',
      description: 'For whom are we creating value? Who are most important?',
      color: 'border-l-4 border-emerald-500',
      icon: Users,
    },
    {
      type: 'KEY_RESOURCES',
      label: 'Key Resources',
      description: 'What key resources do our value propositions require?',
      color: 'border-l-4 border-indigo-500',
      icon: Layers,
    },
    {
      type: 'CHANNELS',
      label: 'Channels',
      description: 'Through which channels do our customer segments want to be reached?',
      color: 'border-l-4 border-amber-500',
      icon: Share2,
    },
    {
      type: 'COST_STRUCTURE',
      label: 'Cost Structure',
      description: 'What are the most important costs inherent in our business model?',
      color: 'border-t-4 border-rose-400',
      icon: DollarSign,
      colSpan: 'col-span-1 md:col-span-2 lg:col-span-5',
    },
    {
      type: 'REVENUE_STREAMS',
      label: 'Revenue Streams',
      description: 'For what value are our customers really willing to pay?',
      color: 'border-t-4 border-emerald-500',
      icon: TrendingUp,
      colSpan: 'col-span-1 md:col-span-2 lg:col-span-5',
    },
  ];

  const handleOpenAddModal = (block: BmcBlockType) => {
    setEditingCard({ block });
    setNewTitle('');
    setNewNotes('');
  };

  const handleOpenEditModal = (block: BmcBlockType, card: BmcCard) => {
    setEditingCard({ block, card });
    setNewTitle(card.title);
    setNewNotes(card.notes || '');
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard || !newTitle.trim()) return;

    const currentBlocks = { ...canvas.blocks };
    const blockList = [...(currentBlocks[editingCard.block] || [])];

    if (editingCard.card) {
      // Edit
      const idx = blockList.findIndex((c) => c.id === editingCard.card?.id);
      if (idx >= 0) {
        blockList[idx] = {
          ...blockList[idx],
          title: newTitle.trim(),
          notes: newNotes.trim(),
        };
      }
    } else {
      // Add
      blockList.push({
        id: `card-${Date.now()}`,
        title: newTitle.trim(),
        notes: newNotes.trim(),
        createdAt: new Date().toISOString().split('T')[0],
      });
    }

    currentBlocks[editingCard.block] = blockList;
    const updated = tdghDb.updateBmsCanvas(businessSlug, {
      ...canvas,
      blocks: currentBlocks,
    });

    setCanvas({ ...updated });
    setEditingCard(null);
    triggerBanner('Hypothesis card saved and synchronized across venture portfolio!');
  };

  const handleDeleteCard = (block: BmcBlockType, cardId: string) => {
    const currentBlocks = { ...canvas.blocks };
    currentBlocks[block] = (currentBlocks[block] || []).filter((c) => c.id !== cardId);

    const updated = tdghDb.updateBmsCanvas(businessSlug, {
      ...canvas,
      blocks: currentBlocks,
    });
    setCanvas({ ...updated });
    if (editingCard?.card?.id === cardId) {
      setEditingCard(null);
    }
    triggerBanner('Hypothesis card removed from canvas.');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = tdghDb.updateBmsCanvas(businessSlug, {
      ...canvas,
      businessName: profileForm.businessName.trim(),
      tagline: profileForm.tagline.trim(),
      founderName: profileForm.founderName.trim(),
      founderEmail: profileForm.founderEmail.trim(),
      founderPhone: profileForm.founderPhone.trim(),
      industrySector: profileForm.industrySector.trim(),
      stage: profileForm.stage.trim(),
      cipcNumber: profileForm.cipcNumber.trim(),
      taxPin: profileForm.taxPin.trim(),
      location: profileForm.location.trim(),
    });

    setCanvas({ ...updated });
    setIsEditProfileOpen(false);
    triggerBanner('Venture details updated! Synchronized with platform header and incubator ledger.');

    // Dispatch custom event so root layout header and sidebar re-render immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('tdgh-canvas-updated'));
    }
  };

  const triggerBanner = (msg: string) => {
    setSavedBanner(msg);
    setTimeout(() => setSavedBanner(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* 1. VENTURE HERO & PROFILE DETAILS HEADER */}
      <div className="bg-white rounded-3xl p-6 border border-porcelain-border shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="purple">9-Box Canvas</Badge>
              <span className="text-xs font-mono text-obsidian-500 uppercase">
                Alexander Osterwalder Matrix &bull; Lean Startup
              </span>
              <span className="text-obsidian-300">&bull;</span>
              <span className="text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Mentor Assigned: {canvas.assignedMentorName || 'Tariq Johnson'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-obsidian tracking-tight">
              {canvas.businessName}
            </h1>
            <p className="text-xs sm:text-sm text-obsidian-600 font-medium">
              "{canvas.tagline}"
            </p>
          </div>

          {/* Action Buttons: Edit Business Details */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={() => setIsEditProfileOpen(true)}
              variant="secondary"
              size="sm"
              className="font-mono text-xs font-semibold gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5 text-purple-700" />
              <span>Edit Venture Details</span>
            </Button>

            <div className="bg-porcelain px-3 py-2 rounded-xl border border-porcelain-border text-xs font-mono text-obsidian-700">
              Hypotheses Validated:{' '}
              <span className="font-bold text-purple-700">
                {Object.values(canvas.blocks).flat().length}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Venture Details Quick Metadata Bar */}
        <div className="pt-3 border-t border-porcelain-border grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="space-y-0.5">
            <span className="text-obsidian-400 text-[10px] uppercase">Industry Sector</span>
            <div className="font-semibold text-obsidian truncate">
              {canvas.industrySector || 'Fintech & Micro-Payments'}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-obsidian-400 text-[10px] uppercase">Venture Stage</span>
            <div className="font-semibold text-purple-700 truncate">
              {canvas.stage || 'Pilot Phase'}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-obsidian-400 text-[10px] uppercase">CIPC Reg Number</span>
            <div className="font-semibold text-obsidian truncate">
              {canvas.cipcNumber || '2024/782194/07'}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-obsidian-400 text-[10px] uppercase">Founder & Lead</span>
            <div className="font-semibold text-obsidian truncate">
              {canvas.founderName || 'Sipho Ndlovu'}
            </div>
          </div>
        </div>
      </div>

      {saveBanner && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{saveBanner}</span>
        </div>
      )}

      {/* 2. SIMPLIFIED 9-BOX OSTERWALDER CANVAS (CARDS CLICKABLE TO REVEAL & EDIT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Top 7 Core Operational Blocks */}
        {blockDefinitions.slice(0, 7).map((def) => {
          const cards = canvas.blocks[def.type] || [];
          const Icon = def.icon;

          return (
            <div
              key={def.type}
              className={`bg-white rounded-2xl p-4 shadow-sm border border-porcelain-border ${def.color} flex flex-col justify-between min-h-[290px]`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold font-mono text-obsidian uppercase flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-obsidian-600" />
                      {def.label}
                    </h3>
                    <p className="text-[10px] text-obsidian-400 line-clamp-1">{def.description}</p>
                  </div>
                  <span className="text-[10px] font-mono text-obsidian-500 bg-porcelain px-1.5 py-0.5 rounded">
                    {cards.length}
                  </span>
                </div>

                {/* Simplified Card Chips: Title Only, Click to Reveal & Edit Details */}
                <div className="space-y-2 pt-1">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleOpenEditModal(def.type, card)}
                      title="Click to reveal details & edit hypothesis"
                      className="p-2.5 rounded-xl bg-porcelain border border-porcelain-border hover:border-purple-600 hover:bg-purple-50/20 hover:shadow-xs transition-all cursor-pointer group relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-obsidian leading-snug group-hover:text-purple-700 transition-colors">
                          {card.title}
                        </span>
                        {card.notes ? (
                          <span
                            className="shrink-0 text-obsidian-400 group-hover:text-purple-600 transition-colors pt-0.5"
                            title="Contains research notes (click to view)"
                          >
                            <FileText className="w-3 h-3" />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}

                  {cards.length === 0 && (
                    <div className="py-6 text-center border border-dashed border-porcelain-border rounded-xl text-[11px] font-mono text-obsidian-400">
                      No cards yet
                    </div>
                  )}
                </div>
              </div>

              {/* Add Card Button */}
              <button
                onClick={() => handleOpenAddModal(def.type)}
                className="mt-4 w-full py-2 rounded-lg border border-dashed border-obsidian-300 text-obsidian-600 hover:border-obsidian hover:text-obsidian text-[11px] font-mono font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Hypothesis Card
              </button>
            </div>
          );
        })}

        {/* Bottom 2 Financial Foundation Blocks (Cost Structure & Revenue Streams) */}
        {blockDefinitions.slice(7).map((def) => {
          const cards = canvas.blocks[def.type] || [];
          const Icon = def.icon;

          return (
            <div
              key={def.type}
              className={`bg-white rounded-2xl p-5 shadow-sm border border-porcelain-border ${def.color} ${
                def.colSpan || ''
              } flex flex-col justify-between min-h-[190px]`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-mono text-obsidian uppercase flex items-center gap-2">
                      <Icon className="w-4 h-4 text-obsidian-600" />
                      {def.label}
                    </h3>
                    <p className="text-[11px] text-obsidian-500">{def.description}</p>
                  </div>
                  <span className="text-xs font-mono text-obsidian-500 bg-porcelain px-2 py-0.5 rounded">
                    {cards.length} Streams
                  </span>
                </div>

                {/* Simplified Card Chips for Financial Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleOpenEditModal(def.type, card)}
                      title="Click to reveal details & edit financial model"
                      className="p-3 rounded-xl bg-porcelain border border-porcelain-border hover:border-purple-600 hover:bg-purple-50/20 hover:shadow-xs transition-all cursor-pointer group relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <strong className="text-xs font-bold text-obsidian leading-snug group-hover:text-purple-700 transition-colors">
                          {card.title}
                        </strong>
                        {card.notes ? (
                          <span
                            className="shrink-0 text-obsidian-400 group-hover:text-purple-600 transition-colors pt-0.5"
                            title="Contains financial notes (click to view)"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}

                  {cards.length === 0 && (
                    <div className="col-span-full py-4 text-center border border-dashed border-porcelain-border rounded-xl text-[11px] font-mono text-obsidian-400">
                      No financial streams added yet
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleOpenAddModal(def.type)}
                className="mt-4 py-2 rounded-lg border border-dashed border-obsidian-300 text-obsidian-600 hover:border-obsidian hover:text-obsidian text-xs font-mono font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add {def.label} Hypothesis
              </button>
            </div>
          );
        })}
      </div>

      {/* 3. CARD DETAIL & EDIT MODAL (CLICK TO REVEAL & EDIT) */}
      {editingCard && (
        <Modal
          isOpen={true}
          onClose={() => setEditingCard(null)}
          title={
            editingCard.card
              ? `Hypothesis: ${editingCard.block.replace('_', ' ')}`
              : `Add Hypothesis Card: ${editingCard.block.replace('_', ' ')}`
          }
          description="Clicking cards reveals full customer research and underlying financial assumptions."
          maxWidth="lg"
        >
          <form onSubmit={handleSaveCard} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                Hypothesis Title / Core Proposition *
              </label>
              <Input
                required
                placeholder="e.g. 0.8% Merchant Fee vs Bank 3.5%"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  Supporting Evidence, Assumptions & Research Notes
                </label>
                <span className="text-[10px] font-mono text-obsidian-400">
                  Hidden on main canvas board
                </span>
              </div>
              <Textarea
                rows={5}
                placeholder="Discovered during Scottsville spaza interviews. 84% of local traders lost card sales during power cuts..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-porcelain-border">
              {editingCard.card ? (
                <button
                  type="button"
                  onClick={() => handleDeleteCard(editingCard.block, editingCard.card!.id)}
                  className="text-xs font-mono text-rose-600 hover:text-rose-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Card</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2.5">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditingCard(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Hypothesis &rarr;
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* 4. EDIT BUSINESS DETAILS MODAL */}
      {isEditProfileOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsEditProfileOpen(false)}
          title="Edit Venture Profile & Business Details"
          description="Update your corporate entity name, sector, stage, and founder credentials."
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  Venture / Business Name *
                </label>
                <Input
                  required
                  placeholder="e.g. KasiPay Financial Technologies (Pty) Ltd"
                  value={profileForm.businessName}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, businessName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  Tagline / Core Elevator Pitch *
                </label>
                <Input
                  required
                  placeholder="e.g. The Offline-First Payment Terminal for Township Spaza Retailers"
                  value={profileForm.tagline}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, tagline: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  Founder Full Name *
                </label>
                <Input
                  required
                  placeholder="e.g. Sipho Ndlovu"
                  value={profileForm.founderName}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, founderName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  Founder Email Address *
                </label>
                <Input
                  type="email"
                  required
                  placeholder="e.g. sipho@kasipay.co.za"
                  value={profileForm.founderEmail}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, founderEmail: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  Industry Sector / Focus *
                </label>
                <Input
                  required
                  placeholder="e.g. Fintech & Micro-Payments"
                  value={profileForm.industrySector}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, industrySector: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  Current Venture Stage *
                </label>
                <Input
                  required
                  placeholder="e.g. MVP Pilot (26 Spaza Terminals)"
                  value={profileForm.stage}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, stage: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  CIPC Registration Number
                </label>
                <Input
                  placeholder="e.g. 2024/782194/07"
                  value={profileForm.cipcNumber}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, cipcNumber: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  SARS Tax Clearance PIN
                </label>
                <Input
                  placeholder="e.g. 9823-1490-5512"
                  value={profileForm.taxPin}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, taxPin: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono font-semibold uppercase text-obsidian">
                  Operating Location / Township Hub
                </label>
                <Input
                  placeholder="e.g. Kraaifontein (Scottsville & Bloekombos)"
                  value={profileForm.location}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, location: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-porcelain-border">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsEditProfileOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save & Update Venture Profile &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
