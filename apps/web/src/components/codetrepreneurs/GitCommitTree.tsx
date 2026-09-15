'use client';

import React, { useState } from 'react';
import { GitBranch, GitCommit, GitMerge, CheckCircle, Award, Terminal } from 'lucide-react';
import { Badge } from '@tdgh/ui';

interface CommitNode {
  id: string;
  hash: string;
  branch: 'main' | 'feature/fullstack' | 'feature/lean-startup';
  title: string;
  month: string;
  author: string;
  cx: number;
  cy: number;
  description: string;
  competencies: string[];
  deliverable: string;
}

const NODES: CommitNode[] = [
  {
    id: 'c1',
    hash: 'a1b2c3d',
    branch: 'main',
    title: 'Initial Commit: Hello World & Git Foundations',
    month: 'Month 1',
    author: 'Kraaifontein Cohort 2025',
    cx: 80,
    cy: 140,
    description: 'Hardware setup, Linux dual-boot configuration, Git CLI branching, semantic HTML5, and responsive CSS with Tailwind.',
    competencies: ['Git Workflows', 'Terminal Basics', 'Modern CSS', 'Accessibility'],
    deliverable: 'Personal Developer Portfolio hosted on Vercel',
  },
  {
    id: 'c2',
    hash: 'e4f5g6h',
    branch: 'feature/fullstack',
    title: 'feat(core): TypeScript, React & Component State',
    month: 'Months 2–4',
    author: 'Ntsika Mokoena (Lead Mentor)',
    cx: 240,
    cy: 70,
    description: 'Strict TypeScript typing, reactive state, custom hooks, component composition, and client/server component boundaries in Next.js.',
    competencies: ['TypeScript', 'React Hooks', 'Next.js App Router', 'UI State'],
    deliverable: 'Multi-step e-commerce storefront with local state storage',
  },
  {
    id: 'c3',
    hash: 'i7j8k9l',
    branch: 'feature/fullstack',
    title: 'feat(db): Relational Modeling & Supabase API',
    month: 'Months 5–6',
    author: 'Student Engineering Pod',
    cx: 420,
    cy: 70,
    description: 'Relational database schema design, Prisma ORM migrations, PostgreSQL indexing, server actions, and Row-Level Security (RLS).',
    competencies: ['PostgreSQL', 'Prisma ORM', 'REST & GraphQL', 'Auth.js'],
    deliverable: 'Full-stack CRUD ticketing and reservation application',
  },
  {
    id: 'c4',
    hash: 'm0n1o2p',
    branch: 'feature/lean-startup',
    title: 'feat(biz): Problem Validation & Empathy Interviews',
    month: 'Months 7–8',
    author: 'Tariq Johnson (Incubator Lead)',
    cx: 340,
    cy: 210,
    description: 'Conducting 20+ real-world merchant interviews across Scottsville, establishing the 9-Block Lean Canvas, and defining unit economics.',
    competencies: ['Customer Discovery', 'Lean Canvas', 'User Journey Mapping'],
    deliverable: 'Validated Problem Statement & Customer Archetype Dossier',
  },
  {
    id: 'c5',
    hash: 'q3r4s5t',
    branch: 'feature/lean-startup',
    title: 'feat(mvp): KasiPay Offline Pilot & Thermal Bluetooth',
    month: 'Months 9–10',
    author: 'Sipho Ndlovu & Pod 3',
    cx: 560,
    cy: 210,
    description: 'Integrating WebUSB Bluetooth thermal printers with offline IndexedDB transaction queues to ensure payment reliability during power cuts.',
    competencies: ['Offline-First PWAs', 'Web APIs', 'Hardware Integration'],
    deliverable: 'Deployed MVP processing live transactions in 3 Kraaifontein shops',
  },
  {
    id: 'c6',
    hash: 'u6v7w8x',
    branch: 'main',
    title: 'Merge: Production Release & Venture Capital Pitch',
    month: 'Months 11–12',
    author: 'TDGH Graduation Board',
    cx: 720,
    cy: 140,
    description: 'Full code review, security audits, CIPC corporate registration, B-BBEE Level 1 affidavits, and final demonstration day pitch to angel investors.',
    competencies: ['Production CI/CD', 'Investor Pitching', 'Legal Compliance'],
    deliverable: 'Graduation Certification & R50,000 Seed Grant Eligibility',
  },
];

export function GitCommitTree() {
  const [activeNode, setActiveNode] = useState<CommitNode>(NODES[0]);

  return (
    <div className="w-full bg-white rounded-2xl border border-porcelain-border p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-porcelain-border">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-electric-cobalt" />
            <h3 className="text-xl font-bold tracking-tight text-obsidian">
              1-Year Git Journey: First Commit to Venture Pitch
            </h3>
          </div>
          <p className="text-xs text-obsidian-500 font-mono mt-1">
            Click any commit node on the branches below to inspect the curriculum progression.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-obsidian-600">
            <span className="w-2.5 h-2.5 rounded-full bg-obsidian inline-block" /> main (Core)
          </span>
          <span className="flex items-center gap-1.5 text-electric-cobalt font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-electric-cobalt inline-block" /> feature/fullstack
          </span>
          <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> feature/lean-startup
          </span>
        </div>
      </div>

      {/* SVG Interactive Branch Diagram */}
      <div className="relative w-full aspect-[800/280] rounded-xl overflow-hidden bg-porcelain-muted border border-porcelain-border p-2">
        <svg viewBox="0 0 800 280" className="w-full h-full select-none">
          {/* Main Trunk line */}
          <line x1="40" y1="140" x2="760" y2="140" stroke="#0D0F11" strokeWidth="4" strokeLinecap="round" />

          {/* Feature Fullstack Branch (Upper) */}
          <path
            d="M 120 140 C 160 140, 180 70, 240 70 L 520 70 C 580 70, 640 140, 720 140"
            fill="none"
            stroke="#2563EB"
            strokeWidth="3.5"
            strokeDasharray="6,4"
          />

          {/* Feature Lean Startup Branch (Lower) */}
          <path
            d="M 180 140 C 220 140, 260 210, 340 210 L 600 210 C 660 210, 680 140, 720 140"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3.5"
            strokeDasharray="6,4"
          />

          {/* Labels for branches */}
          <text x="40" y="130" fill="#0D0F11" fontSize="11" fontWeight="bold" fontFamily="monospace">
            main
          </text>
          <text x="240" y="55" fill="#2563EB" fontSize="10" fontWeight="bold" fontFamily="monospace">
            feature/fullstack-engineering
          </text>
          <text x="340" y="235" fill="#D97706" fontSize="10" fontWeight="bold" fontFamily="monospace">
            feature/lean-startup-validation
          </text>

          {/* Commit Nodes */}
          {NODES.map((node) => {
            const isSelected = activeNode.id === node.id;
            const strokeColor =
              node.branch === 'main'
                ? '#0D0F11'
                : node.branch === 'feature/fullstack'
                ? '#2563EB'
                : '#F59E0B';

            return (
              <g
                key={node.id}
                className="cursor-pointer transition-transform duration-150"
                onClick={() => setActiveNode(node)}
              >
                {/* Ping ring for selected node */}
                {isSelected && (
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r="20"
                    fill={strokeColor}
                    fillOpacity="0.2"
                    className="animate-pulse"
                  />
                )}

                {/* Commit circle */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={isSelected ? 13 : 9}
                  fill={isSelected ? strokeColor : '#FFFFFF'}
                  stroke={strokeColor}
                  strokeWidth="3.5"
                  className="transition-all hover:scale-125"
                />

                {/* Commit short hash & month badge */}
                <text
                  x={node.cx}
                  y={node.cy + (node.cy > 140 ? 24 : -18)}
                  textAnchor="middle"
                  fill="#475569"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Commit Detail Inspector */}
      {activeNode && (
        <div className="p-6 rounded-xl bg-obsidian text-white space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-obsidian-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-electric-blue bg-electric-cobalt/20 border border-electric-cobalt/40 px-2 py-0.5 rounded">
                commit {activeNode.hash}
              </span>
              <span className="text-xs font-mono text-obsidian-400">
                Author: {activeNode.author}
              </span>
            </div>

            <Badge variant={activeNode.branch === 'main' ? 'default' : activeNode.branch === 'feature/fullstack' ? 'electric' : 'amber'}>
              {activeNode.branch}
            </Badge>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white tracking-tight">
              {activeNode.title}
            </h4>
            <p className="text-xs text-obsidian-300 mt-1 leading-relaxed">
              {activeNode.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-3 rounded-lg bg-obsidian-900 border border-obsidian-800 space-y-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-obsidian-400 font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Key Competencies Mastered
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeNode.competencies.map((comp, idx) => (
                  <span
                    key={idx}
                    className="bg-obsidian-800 text-obsidian-200 px-2 py-0.5 rounded font-mono text-[11px]"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-obsidian-900 border border-obsidian-800 space-y-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Graded Milestone Deliverable
              </span>
              <p className="text-xs text-white font-medium pt-1">{activeNode.deliverable}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
