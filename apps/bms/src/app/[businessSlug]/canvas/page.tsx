'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { tdghDb } from '@tdgh/db';
import { BmcBlockType, BmsCanvas, BmcCard } from '@tdgh/types';
import { Badge, Button, Input, Textarea, Modal } from '@tdgh/ui';
import {
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Download,
  Share2,
  Sparkles,
  Users,
  Layers,
  HeartHandshake,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export default function BusinessModelCanvasPage() {
  const params = useParams();
  const businessSlug = (params?.businessSlug as string) || 'kasipay';

  const [canvas, setCanvas] = useState<BmsCanvas>(tdghDb.getBmsCanvas(businessSlug));
  const [editingCard, setEditingCard] = useState<{ block: BmcBlockType; card?: BmcCard } | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [saveBanner, setSavedBanner] = useState(false);

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
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2500);
  };

  const handleDeleteCard = (block: BmcBlockType, cardId: string) => {
    const currentBlocks = { ...canvas.blocks };
    currentBlocks[block] = (currentBlocks[block] || []).filter((c) => c.id !== cardId);

    const updated = tdghDb.updateBmsCanvas(businessSlug, {
      ...canvas,
      blocks: currentBlocks,
    });
    setCanvas({ ...updated });
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-porcelain-border shadow-xs">
        <div className="flex items-start sm:items-center gap-4">
          <div className="hidden sm:flex bg-porcelain px-3 py-1.5 rounded-xl border border-porcelain-border shrink-0">
            <Image
              src="/logo.png"
              alt="The Daily Grind Hub"
              width={140}
              height={33}
              className="h-8 w-auto object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="purple">9-Box Business Model Canvas</Badge>
              <span className="text-xs font-mono text-obsidian-500 uppercase">
                Lean Startup Framework &bull; Alexander Osterwalder Standard
              </span>
            </div>
            <h1 className="text-2xl font-black text-obsidian tracking-tight mt-1">
              {canvas.businessName} &mdash; Strategic BMC
            </h1>
            <p className="text-xs text-obsidian-500 font-mono">
              Tagline: "{canvas.tagline}" &bull; Auto-saved: {new Date(canvas.lastEdited).toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => alert('PDF Export rendering canvas matrix with investor executive summary...')}
            className="text-xs font-mono"
          >
            <Download className="w-3.5 h-3.5 mr-1" /> Export Canvas PDF
          </Button>
        </div>
      </div>

      {saveBanner && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Canvas block updated and synchronized across venture profile!</span>
        </div>
      )}

      {/* 9-Box Osterwalder Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Top 7 Vertical Blocks */}
        {blockDefinitions.slice(0, 7).map((def) => {
          const cards = canvas.blocks[def.type] || [];
          const Icon = def.icon;

          return (
            <div
              key={def.type}
              className={`bg-white rounded-2xl p-4 shadow-sm border border-porcelain-border ${def.color} flex flex-col justify-between min-h-[300px]`}
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

                {/* Cards List */}
                <div className="space-y-2.5 pt-1">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="p-3 rounded-xl bg-porcelain border border-porcelain-border text-xs space-y-1 group hover:border-obsidian transition-colors relative"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <strong className="text-obsidian leading-snug">{card.title}</strong>
                        <button
                          onClick={() => handleDeleteCard(def.type, card.id)}
                          className="opacity-0 group-hover:opacity-100 text-obsidian-400 hover:text-rose-600 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      {card.notes && (
                        <p className="text-[11px] text-obsidian-600 leading-relaxed pt-0.5">
                          {card.notes}
                        </p>
                      )}
                    </div>
                  ))}
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
              } flex flex-col justify-between min-h-[200px]`}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="p-3 rounded-xl bg-porcelain border border-porcelain-border text-xs space-y-1 group relative"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <strong className="text-obsidian">{card.title}</strong>
                        <button
                          onClick={() => handleDeleteCard(def.type, card.id)}
                          className="opacity-0 group-hover:opacity-100 text-obsidian-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      {card.notes && (
                        <p className="text-[11px] text-obsidian-600 pt-0.5">{card.notes}</p>
                      )}
                    </div>
                  ))}
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

      {/* Add / Edit Card Modal */}
      {editingCard && (
        <Modal
          isOpen={true}
          onClose={() => setEditingCard(null)}
          title={`Add Hypothesis Card: ${editingCard.block.replace('_', ' ')}`}
          description="Enter a concise statement and supporting customer research notes"
          maxWidth="md"
        >
          <form onSubmit={handleSaveCard} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">
                Hypothesis / Proposition Title *
              </label>
              <Input
                required
                placeholder="e.g. 0.8% Merchant Fee vs Bank 3.5%"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">
                Supporting Evidence & Customer Feedback
              </label>
              <Textarea
                rows={3}
                placeholder="Discovered during Scottsville spaza interviews..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-porcelain-border">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setEditingCard(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save to Canvas Block &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
