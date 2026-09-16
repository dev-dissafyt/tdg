import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tdghDb } from '@tdgh/db';
import { Badge, Button } from '@tdgh/ui';
import {
  Sparkles,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  LineChart,
  Layers,
  ArrowRight,
  ExternalLink,
  Target,
  FileCheck,
} from 'lucide-react';

export const metadata = {
  title: 'Business Incubation & Pre-Incubator Accelerator | The Daily Grind Hub',
  description:
    '10-Week venture creation sprint for township entrepreneurs in Scottsville, Kraaifontein. 9-box Business Model Canvas, CIPC compliance, unit economics, and seed capital readiness.',
};

export default function IncubationPage() {
  const seedCanvas = tdghDb.getBmsCanvas('kasipay');
  const roadmap = tdghDb.getBmsRoadmap('kasipay');

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-porcelain-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="purple">Venture Acceleration Engine</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase tracking-wider">
              10-Week Pre-Incubation Sprint &bull; Scottsville Campus
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-obsidian tracking-tight max-w-4xl">
            Commercializing Township Innovation from Concept to Capital.
          </h1>

          <p className="text-lg text-obsidian-600 max-w-3xl leading-relaxed">
            Our Business Incubation program bridges the gap between raw entrepreneurial ideas and investment-ready commercial enterprises. We equip accepted founders with a structured 9-Box Business Model Canvas, regulatory formalization, financial modeling, and seed capital linkage.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/portal/applications/new?track=INCUBATION"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-obsidian text-white font-semibold hover:bg-purple-700 transition-colors shadow-tactile hover:shadow-tactile-hover"
            >
              Apply for Business Incubation &rarr;
            </Link>
            <a
              href="http://localhost:3002/kasipay/canvas"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border-2 border-obsidian text-obsidian font-semibold hover:bg-obsidian hover:text-white transition-colors"
            >
              Explore Incubatee BMS App <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* The 10-Week Pre-Incubation Sprint Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="purple">Sprint Architecture</Badge>
          <h2 className="text-3xl font-black text-obsidian tracking-tight">
            The 10-Week Venture Sprint Curriculum
          </h2>
          <p className="text-sm text-obsidian-600">
            A milestone-driven roadmap guiding Kraaifontein founders through rigorous customer discovery to Demo Day pitch.
          </p>
        </div>

        <div className="space-y-4">
          {roadmap.map((step, idx) => (
            <div
              key={step.id}
              className="p-6 bg-white rounded-2xl border border-porcelain-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-obsidian transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-bold shrink-0 mt-1">
                  0{idx + 1}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple-700">
                      {step.weekRange}
                    </span>
                    <h3 className="font-bold text-base text-obsidian">{step.phaseTitle}</h3>
                  </div>
                  <ul className="space-y-1">
                    {step.objectives.map((obj, i) => (
                      <li key={i} className="text-xs text-obsidian-600 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <Badge variant={step.completed ? 'emerald' : 'amber'}>
                  {step.completed ? 'Sprint Validated' : 'Active Sprint'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Osterwalder 9-Box Business Model Canvas Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="electric">Dynamic Strategic Tool</Badge>
            <h2 className="text-2xl font-bold text-obsidian tracking-tight">
              Interactive 9-Box Business Model Canvas (BMC)
            </h2>
            <p className="text-xs font-mono text-obsidian-500">
              Every accepted founder manages their hypothesis cards and revenue mechanics in real time.
            </p>
          </div>
          <a
            href="http://localhost:3002/kasipay/canvas"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono font-bold text-electric-cobalt hover:underline flex items-center gap-1"
          >
            Launch Fullscreen BMC Workspace &rarr;
          </a>
        </div>

        <div className="p-6 bg-obsidian text-white rounded-3xl border border-obsidian-800 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-obsidian-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-white px-2.5 py-1 rounded-lg">
                <Image
                  src="/logo.png"
                  alt="The Daily Grind Hub"
                  width={110}
                  height={26}
                  className="h-5 w-auto object-contain"
                />
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs font-bold text-white">
                Live Incubatee Case Study: {seedCanvas.businessName}
              </span>
            </div>
            <span className="text-[11px] font-mono text-obsidian-400">
              Tagline: "{seedCanvas.tagline}"
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-obsidian-900 border border-obsidian-800 space-y-1.5">
              <span className="text-electric-blue font-bold uppercase tracking-wider text-[11px]">
                Value Proposition
              </span>
              <p className="text-obsidian-300">
                0.8% transaction swipe fee vs traditional bank 3.5%. Instant next-hour settlement for township spaza grocers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-900 border border-obsidian-800 space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                Key Resources & Tech
              </span>
              <p className="text-obsidian-300">
                Offline-first encrypted sync engine + 3D printed rugged terminal housings manufactured in TDGH FabLab.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-900 border border-obsidian-800 space-y-1.5">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                Customer Segment
              </span>
              <p className="text-obsidian-300">
                45 spaza retailers across Scottsville and Bloekombos currently transacting daily via local field agents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Incubation Deliverables & Formalization Vault */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge variant="emerald">Enterprise Formalization</Badge>
          <h2 className="text-3xl font-black text-obsidian tracking-tight">
            What Incubatees Graduate With
          </h2>
          <p className="text-sm text-obsidian-600">
            We ensure no founder leaves with an informal idea. You graduate with full institutional and legal credibility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-3">
            <FileCheck className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-base text-obsidian">CIPC & Tax Formalization</h4>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              Official (Pty) Ltd incorporation, SARS Good Standing Tax Clearance PIN, and business banking verification.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-3">
            <ShieldCheck className="w-6 h-6 text-purple-600" />
            <h4 className="font-bold text-base text-obsidian">B-BBEE Level 1 Certification</h4>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              Sworn commissioner-stamped affidavit qualifying your startup for corporate supply chain procurement and enterprise development grants.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-3">
            <TrendingUp className="w-6 h-6 text-electric-cobalt" />
            <h4 className="font-bold text-base text-obsidian">Demo Day Investor Pitch</h4>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              12-slide seed deck rehearsal before our mentor panel and presentation at the annual Kraaifontein Innovation Demo Day.
            </p>
          </div>
        </div>
      </section>

      {/* Final Application Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-obsidian text-white text-center space-y-6">
          <Badge variant="purple">Cohort Admissions</Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            Ready to Build a High-Growth Township Venture?
          </h2>
          <p className="text-sm text-obsidian-300 max-w-xl mx-auto leading-relaxed">
            Applications are open for the next 10-week pre-incubation cohort. Desk space, technical prototyping, legal formalization, and mentor guidance are provided at 4 Midway.
          </p>
          <Link
            href="/portal/applications/new?track=INCUBATION"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-purple-600 text-white font-bold text-base hover:bg-purple-700 transition-colors shadow-tactile active:translate-y-0.5"
          >
            Apply for Business Incubation &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
