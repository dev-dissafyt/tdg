import React from 'react';
import Link from 'next/link';
import { Badge, StatCounter } from '@tdgh/ui';
import { ShieldCheck, Target, Users, MapPin, Heart, Sparkles, Check } from 'lucide-react';

export const metadata = {
  title: 'About Our Mission & Socio-Economic Narrative | The Daily Grind Hub',
  description:
    'The story of The Daily Grind Innovation Hub (TDGH) in Scottsville, Kraaifontein. Non-profit tech education, economic empowerment, and community resilience.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero */}
      <section className="bg-white border-b border-porcelain-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="electric">NPO Mission & Origins</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase tracking-wider">
              Scottsville, Kraaifontein
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-obsidian tracking-tight max-w-4xl">
            A Safe Harbor for Builders, Coders, and Community Changemakers.
          </h1>

          <p className="text-lg text-obsidian-600 max-w-3xl leading-relaxed">
            The Daily Grind Hub was born out of a simple, non-negotiable conviction: young people in Kraaifontein do not lack intellect, curiosity, or grit. They lack access to high-speed digital infrastructure, elite software mentorship, and patient early-stage capital.
          </p>
        </div>
      </section>

      {/* Origin Story Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cobalt font-semibold">
                Our Genesis
              </span>
              <h2 className="text-3xl font-black text-obsidian tracking-tight">
                From an Empty Garage on 4 Midway to an Enterprise Hub
              </h2>
            </div>

            <p className="text-sm text-obsidian-700 leading-relaxed">
              In 2023, local educator and social entrepreneur Kurt Minnaar recognized that existing youth programs offered generic computer literacy courses that prepared students only for entry-level call center work. Meanwhile, the global tech industry was starving for competent full-stack developers, cloud engineers, and hardware prototyping talent.
            </p>

            <p className="text-sm text-obsidian-700 leading-relaxed">
              We took a lease on 4 Midway Street, wired up a 1 Gbps redundant fiber connection, installed solar inverters to beat load-shedding, and launched the inaugural Codetrepreneurs fellowship. Within 12 months, our students were building real software for township spaza shops and civic infrastructure.
            </p>

            <div className="p-4 bg-porcelain rounded-xl border border-porcelain-border space-y-2">
              <div className="text-xs font-mono font-bold text-obsidian">Core Non-Profit Credo:</div>
              <p className="text-xs text-obsidian-600 italic">
                "We do not measure our success by the certificates we hand out. We measure success by the businesses registered, the salaries earned, and the community problems solved."
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-obsidian-900 border border-porcelain-border shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                alt="Codetrepreneurs learning at TDGH"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs font-mono text-obsidian-500 text-center">
              Codetrepreneurs pair-programming arena at 4 Midway, Scottsville
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Numbers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-obsidian text-white rounded-3xl p-8 sm:p-14 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="amber">Socio-Economic Impact</Badge>
            <h2 className="text-3xl font-black tracking-tight">
              Measurable Progress Across Kraaifontein
            </h2>
            <p className="text-xs text-obsidian-400">
              Verified outcomes independently audited for donor and partner transparency.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-4">
            <div className="space-y-1">
              <div className="text-4xl font-black font-mono text-electric-blue">48</div>
              <div className="text-xs font-mono uppercase tracking-wider text-obsidian-300">
                Youth Coders Graduated
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black font-mono text-emerald-400">89%</div>
              <div className="text-xs font-mono uppercase tracking-wider text-obsidian-300">
                Employment or Venture
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black font-mono text-amber-400">R2.4M</div>
              <div className="text-xs font-mono uppercase tracking-wider text-obsidian-300">
                Cumulative Salaries Earned
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black font-mono text-rose-400">6</div>
              <div className="text-xs font-mono uppercase tracking-wider text-obsidian-300">
                Commercial (Pty) Ltds Born
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NPO Governance & Compliance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge variant="emerald">Governance & Trust</Badge>
          <h2 className="text-3xl font-black text-obsidian tracking-tight">
            Donor & Partner Compliance
          </h2>
          <p className="text-sm text-obsidian-600">
            We adhere to rigorous corporate governance standards to give public, corporate, and philanthropic partners total confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-base text-obsidian">Section 18A Tax Certificates</h4>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              Donations from South African corporates and individuals qualify for full Section 18A tax deduction receipts issued annually.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-3">
            <Heart className="w-6 h-6 text-rose-600" />
            <h4 className="font-bold text-base text-obsidian">B-BBEE Level 1 Contributor</h4>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              100% black youth-empowering institution providing 135% procurement recognition and Skills Development scorecard points.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-3">
            <MapPin className="w-6 h-6 text-electric-cobalt" />
            <h4 className="font-bold text-base text-obsidian">Rooted on 4 Midway</h4>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              Open doors policy where parents, municipal councilors, and local business elders regularly visit and engage directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
