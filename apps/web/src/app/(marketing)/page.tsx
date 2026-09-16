import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tdghDb } from '@tdgh/db';
import { Badge, StatCounter, Button } from '@tdgh/ui';
import { Terminal, Box, Sparkles, Building2, ArrowRight, ShieldCheck, HeartHandshake, Check } from 'lucide-react';

export default function HomePage() {
  const cohorts = tdghDb.getCohorts();
  const zones = tdghDb.getCoworkZones();

  return (
    <div className="space-y-20 pb-20">
      {/* High-Impact Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-porcelain-border py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 filament-noise opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2">
            <Badge variant="electric">Scottsville, Kraaifontein</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase tracking-wider">
              An Enterprise Digital Ecosystem
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-obsidian tracking-tight leading-[1.05] max-w-5xl">
            Transforming Youth from Job Seekers into Job Creators.
          </h1>

          <p className="text-lg sm:text-xl text-obsidian-600 max-w-3xl leading-relaxed font-normal">
            The Daily Grind Innovation Hub (TDGH) is Kraaifontein’s premier community technology centre. We pair rigorous 1-year software engineering fellowships and additive manufacturing labs with enterprise coworking and venture incubation.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/portal/applications/new"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-obsidian text-white font-bold text-base hover:bg-electric-cobalt transition-all shadow-tactile hover:shadow-tactile-hover active:translate-y-0.5"
            >
              Apply for 2026 Intake &rarr;
            </Link>
            <Link
              href="/coworking"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-obsidian text-obsidian font-bold text-base hover:bg-obsidian hover:text-white transition-all active:translate-y-0.5"
            >
              Explore Co-Working Floorplan
            </Link>
          </div>

          <div className="pt-6 border-t border-porcelain-border flex flex-wrap items-center gap-8 text-xs font-mono text-obsidian-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Registered Section 18A NPO</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>100% Load-Shedding Power Resilient</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>1 Gbps Fiber Backbone</span>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional & Ecosystem Partners Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-porcelain/60 rounded-2xl border border-porcelain-border p-6 text-center space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-obsidian-500 font-semibold block">
            Ecosystem Partners & Infrastructure Sponsors
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-85 grayscale hover:grayscale-0 transition-all duration-300">
            <Image
              src="/partners/rlabs-logo.png"
              alt="RLabs"
              width={120}
              height={36}
              className="h-7 w-auto object-contain"
            />
            <Image
              src="/partners/UK-Tech-logo.webp"
              alt="UK-South Africa Tech Hub"
              width={140}
              height={36}
              className="h-8 w-auto object-contain"
            />
            <Image
              src="/partners/Small-Business-Development-Logo.png"
              alt="Department of Small Business Development"
              width={180}
              height={40}
              className="h-9 w-auto object-contain"
            />
            <Image
              src="/partners/launch-league-logo.png"
              alt="Launch League"
              width={130}
              height={36}
              className="h-7 w-auto object-contain"
            />
            <Image
              src="/partners/Octotel-Blue-and-Orange-Logo.png"
              alt="Octotel"
              width={120}
              height={36}
              className="h-7 w-auto object-contain"
            />
            <Image
              src="/partners/rsaweeb-logo.png"
              alt="RSAWEB"
              width={120}
              height={36}
              className="h-6 w-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Live Animated Metric Counter Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-porcelain-border p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-porcelain-border">
            <div className="pt-4 md:pt-0 md:pr-6">
              <StatCounter
                value={48}
                suffix="+"
                label="Coders Trained"
                subtext="1-Year Fellowship Graduates"
              />
            </div>
            <div className="pt-4 md:pt-0 md:px-6">
              <StatCounter
                value={16}
                suffix="+"
                label="3D Makers Certified"
                subtext="CAD & Additive Prototyping"
              />
            </div>
            <div className="pt-4 md:pt-0 md:px-6">
              <StatCounter
                value={9}
                suffix=""
                label="Startups Incubated"
                subtext="Commercializing via BMS Canvas"
              />
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <StatCounter
                value={89}
                suffix="%"
                label="Placement & Launch"
                subtext="Employment or Registered Entity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Program Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="electric">Core Hub Engines</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-obsidian tracking-tight">
              Four Pathways to Economic Sovereignty
            </h2>
          </div>
          <p className="text-xs font-mono text-obsidian-500 max-w-sm">
            All programs run directly out of our flagship campus at 4 Midway, Scottsville.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Engine 1: Codetrepreneurs */}
          <div className="bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm flex flex-col justify-between hover:border-obsidian transition-colors group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-electric-cobalt flex items-center justify-center">
                  <Terminal className="w-6 h-6" />
                </div>
                <Badge variant="electric">1-Year Full-Time</Badge>
              </div>
              <h3 className="text-2xl font-bold text-obsidian tracking-tight group-hover:text-electric-cobalt transition-colors">
                Codetrepreneurs Fellowship
              </h3>
              <p className="text-sm text-obsidian-600 leading-relaxed">
                Full-stack web engineering immersion: TypeScript, Next.js 15, PostgreSQL, Git workflows, and Lean Startup commercialization. Includes automated live terminal shell and micro-sandboxes.
              </p>
              <ul className="space-y-2 text-xs font-mono text-obsidian-700 pt-2 border-t border-porcelain-border">
                <li>&bull; Interactive Git commit milestone timeline</li>
                <li>&bull; Capstone projects solving municipal & township challenges</li>
                <li>&bull; 100% sponsored tuition for Kraaifontein youth</li>
              </ul>
            </div>
            <Link
              href="/codetrepreneurs"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-obsidian group-hover:text-electric-cobalt transition-colors font-mono"
            >
              Explore Curriculum & Interactive Terminal &rarr;
            </Link>
          </div>

          {/* Engine 2: 3D Studio */}
          <div className="bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm flex flex-col justify-between hover:border-obsidian transition-colors group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Box className="w-6 h-6" />
                </div>
                <Badge variant="amber">6-Month Vocational</Badge>
              </div>
              <h3 className="text-2xl font-bold text-obsidian tracking-tight group-hover:text-amber-600 transition-colors">
                3D Additive Manufacturing & FabLab
              </h3>
              <p className="text-sm text-obsidian-600 leading-relaxed">
                Parametric CAD modeling, FDM & SLA 3D printing, toolpath slicing, and circular plastics recycling. Real-time Three.js gantry simulation and tactile filament UI.
              </p>
              <ul className="space-y-2 text-xs font-mono text-obsidian-700 pt-2 border-t border-porcelain-border">
                <li>&bull; Three.js 3D printer gantry scroll simulator</li>
                <li>&bull; Fabricating AgriPod sensor enclosures & prosthetic assists</li>
                <li>&bull; Closed-loop local plastic shredding and extrusion</li>
              </ul>
            </div>
            <Link
              href="/3d-printing"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-obsidian group-hover:text-amber-600 transition-colors font-mono"
            >
              Launch 3D WebGL Simulator &rarr;
            </Link>
          </div>

          {/* Engine 3: Co-Working */}
          <div className="bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm flex flex-col justify-between hover:border-obsidian transition-colors group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <Badge variant="emerald">Flexible Memberships</Badge>
              </div>
              <h3 className="text-2xl font-bold text-obsidian tracking-tight group-hover:text-emerald-600 transition-colors">
                Enterprise Co-Working Space
              </h3>
              <p className="text-sm text-obsidian-600 leading-relaxed">
                24 flex hot desks, 12 dedicated founder pods, acoustic call booths, 14-seat boardroom, and backup generator power. Features an interactive vector SVG floor plan.
              </p>
              <ul className="space-y-2 text-xs font-mono text-obsidian-700 pt-2 border-t border-porcelain-border">
                <li>&bull; Interactive vector SVG floor plan with real-time hover specs</li>
                <li>&bull; 1 Gbps symmetric fiber + solar lithium battery backup</li>
                <li>&bull; Transparent day passes from R180/day</li>
              </ul>
            </div>
            <Link
              href="/coworking"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-obsidian group-hover:text-emerald-600 transition-colors font-mono"
            >
              Inspect Interactive Floorplan &rarr;
            </Link>
          </div>

          {/* Engine 4: Pre-Incubation BMS */}
          <div className="bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm flex flex-col justify-between hover:border-obsidian transition-colors group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <Badge variant="purple">10-Week Pre-Incubator</Badge>
              </div>
              <h3 className="text-2xl font-bold text-obsidian tracking-tight group-hover:text-purple-600 transition-colors">
                Business Management System (BMS)
              </h3>
              <p className="text-sm text-obsidian-600 leading-relaxed">
                An interactive 9-box Business Model Canvas (BMC), milestone roadmap tracking, financial runway metrics, and compliance vault for accepted incubatee ventures.
              </p>
              <ul className="space-y-2 text-xs font-mono text-obsidian-700 pt-2 border-t border-porcelain-border">
                <li>&bull; Multi-tenant incubator portal for accepted startups</li>
                <li>&bull; CIPC, SARS Tax PIN, and B-BBEE document management</li>
                <li>&bull; Seed capital readiness and investor pitch prep</li>
              </ul>
            </div>
            <a
              href="http://localhost:3002/kasipay/canvas"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-obsidian group-hover:text-purple-600 transition-colors font-mono"
            >
              Open Incubatee BMS App &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Narrative & Origin Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-obsidian text-white rounded-3xl p-8 sm:p-14 space-y-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-blue font-semibold">
              The Scottsville Narrative
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              We Don't Build In Silicon Valley. We Build Where Solutions Matter Most.
            </h2>
            <p className="text-sm sm:text-base text-obsidian-300 leading-relaxed">
              Kraaifontein is home to extraordinary grit, resilience, and untapped technical intellect. The Daily Grind Hub was created to eradicate the digital divide by placing cutting-edge tooling, high-voltage mentors, and capital linkage right on 4 Midway Street.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-obsidian-800">
            <div>
              <div className="text-2xl font-black font-mono text-white">4 Midway</div>
              <div className="text-xs text-obsidian-400 font-mono mt-1">Scottsville, Kraaifontein</div>
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-electric-blue">100%</div>
              <div className="text-xs text-obsidian-400 font-mono mt-1">Tuition-Free Scholarships</div>
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-emerald-400">R2.4M+</div>
              <div className="text-xs text-obsidian-400 font-mono mt-1">Community Value Generated</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
