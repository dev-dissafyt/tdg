import React from 'react';
import Link from 'next/link';
import { tdghDb } from '@tdgh/db';
import { InteractiveTerminal } from '@/components/codetrepreneurs/InteractiveTerminal';
import { GitCommitTree } from '@/components/codetrepreneurs/GitCommitTree';
import { CodePreviewSandbox } from '@/components/codetrepreneurs/CodePreviewSandbox';
import { Badge, Card, CardContent } from '@tdgh/ui';
import { Terminal, Code, Database, Rocket, Laptop, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Codetrepreneurs 1-Year Fellowship | The Daily Grind Hub',
  description:
    'Full-time 12-month software engineering fellowship for Kraaifontein youth. TypeScript, Next.js, PostgreSQL, Lean Startup validation, and venture pitching.',
};

export default function CodetrepreneursPage() {
  const cohort = tdghDb.getCohort('2025', 'codetrepreneurs');

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Hero */}
      <section className="bg-white border-b border-porcelain-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="electric">1-Year Intensive Fellowship</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase tracking-wider">
              100% Tuition-Free &bull; Scottsville Campus
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-obsidian tracking-tight max-w-4xl">
            Codetrepreneurs: Where Kraaifontein Coders Build the Digital Economy.
          </h1>

          <p className="text-lg text-obsidian-600 max-w-3xl leading-relaxed">
            A rigorous 12-month technical fellowship converting youth with zero formal programming background into senior-ready full-stack software engineers and startup founders.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/portal/applications/new?track=CODETREPRENEURS"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-obsidian text-white font-semibold hover:bg-electric-cobalt transition-colors shadow-tactile hover:shadow-tactile-hover"
            >
              Apply for 2026 Intake &rarr;
            </Link>
            <Link
              href="/cohorts/2025/codetrepreneurs"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg border-2 border-obsidian text-obsidian font-semibold hover:bg-obsidian hover:text-white transition-colors"
            >
              View 2025 Graduate Capstones
            </Link>
          </div>
        </div>
      </section>

      {/* Feature 1: Live Interactive Terminal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="space-y-1">
          <Badge variant="default">Module Telemetry</Badge>
          <h2 className="text-2xl font-bold text-obsidian tracking-tight">
            Live Automated Terminal Shell
          </h2>
          <p className="text-xs text-obsidian-500 font-mono">
            Experience the automated build cycle running live on student pair-programming terminals.
          </p>
        </div>
        <InteractiveTerminal />
      </section>

      {/* Feature 2: 1-Year Git Journey Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="space-y-1">
          <Badge variant="amber">12-Month Syllabus Graph</Badge>
          <h2 className="text-2xl font-bold text-obsidian tracking-tight">
            From "First Commit" to "Venture Capital Pitch"
          </h2>
          <p className="text-xs text-obsidian-600 font-mono">
            Interactive branch visualization tracking the four foundational quarters of student growth.
          </p>
        </div>
        <GitCommitTree />
      </section>

      {/* Feature 3: Split-Pane Student Capstone Code Sandbox */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="space-y-1">
          <Badge variant="emerald">Live Runtime Preview</Badge>
          <h2 className="text-2xl font-bold text-obsidian tracking-tight">
            Inspect Real Student Code in Production
          </h2>
          <p className="text-xs text-obsidian-600 font-mono">
            Real software built by students to solve real problems in Scottsville and Bloekombos.
          </p>
        </div>
        <CodePreviewSandbox />
      </section>

      {/* Four Quarter Curriculum Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="electric">Technical Syllabus</Badge>
          <h2 className="text-3xl font-black text-obsidian tracking-tight">
            Engineered for Production Readiness
          </h2>
          <p className="text-sm text-obsidian-600">
            Every module delivers tangible, deployable artifacts. No abstract multiple-choice quizzes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-electric-cobalt flex items-center justify-center font-mono font-bold">
              Q1
            </div>
            <h3 className="font-bold text-lg text-obsidian">Design Thinking & Foundations</h3>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              Problem discovery in Kraaifontein, semantic HTML5, CSS Grid/Flexbox, Tailwind CSS, Git CLI branching, and Figma prototyping.
            </p>
            <div className="text-xs font-mono text-electric-cobalt font-semibold pt-2 border-t border-porcelain-border">
              Artifact: Personal Portfolio
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-mono font-bold">
              Q2
            </div>
            <h3 className="font-bold text-lg text-obsidian">Modern Web & TypeScript</h3>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              Strict typing with TypeScript, component architecture, React Server Components, Next.js 15 App Router, and client state orchestration.
            </p>
            <div className="text-xs font-mono text-cyan-700 font-semibold pt-2 border-t border-porcelain-border">
              Artifact: Full-Stack Storefront
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-bold">
              Q3
            </div>
            <h3 className="font-bold text-lg text-obsidian">Databases, APIs & DevOps</h3>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              Relational schemas in PostgreSQL, Prisma ORM, REST/GraphQL APIs, Auth.js, Docker containers, and CI/CD automated GitHub Actions.
            </p>
            <div className="text-xs font-mono text-purple-700 font-semibold pt-2 border-t border-porcelain-border">
              Artifact: Real-Time Ticketing App
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-mono font-bold">
              Q4
            </div>
            <h3 className="font-bold text-lg text-obsidian">Lean Startup & Capstone Pitch</h3>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              9-Block Business Model Canvas, 10-week pre-incubation sprint, CIPC formalization, investor decks, and live graduation Demo Day.
            </p>
            <div className="text-xs font-mono text-amber-700 font-semibold pt-2 border-t border-porcelain-border">
              Artifact: Commercial Startup
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cohort Members */}
      {cohort && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Badge variant="electric">Cohort Spotlight</Badge>
              <h2 className="text-2xl font-bold text-obsidian tracking-tight mt-1">
                Meet the Fellows of {cohort.title}
              </h2>
            </div>
            <Link
              href="/cohorts/2025/codetrepreneurs"
              className="text-xs font-mono font-bold text-electric-cobalt hover:underline flex items-center gap-1"
            >
              View All 22 Students &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cohort.members.map((member) => (
              <div
                key={member.id}
                className="p-6 bg-white rounded-2xl border border-porcelain-border shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover border border-porcelain-border"
                  />
                  <div>
                    <h4 className="font-bold text-base text-obsidian">{member.name}</h4>
                    <p className="text-xs text-obsidian-500 font-mono">{member.suburb}</p>
                    <span className="inline-block mt-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-semibold">
                      Capstone: {member.capstoneTitle}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-obsidian-600 leading-relaxed">{member.bio}</p>

                <div className="pt-3 border-t border-porcelain-border flex items-center justify-between text-xs font-mono text-obsidian-500">
                  <span>100% Attendance</span>
                  <span className="text-electric-cobalt font-semibold">Active Fellow</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final Application Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-obsidian text-white text-center space-y-6">
          <Badge variant="amber">2026 Admissions Open</Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            Ready to Commit One Year to Change Your Life?
          </h2>
          <p className="text-sm text-obsidian-300 max-w-xl mx-auto leading-relaxed">
            No prior coding experience required. All you need is a matric certificate, hunger to learn, and commitment to Scottsville and Kraaifontein.
          </p>
          <Link
            href="/portal/applications/new?track=CODETREPRENEURS"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-electric-cobalt text-white font-bold text-base hover:bg-blue-600 transition-colors shadow-glow-blue active:translate-y-0.5"
          >
            Start Your 2026 Application Now &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
