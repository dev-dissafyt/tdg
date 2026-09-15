import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tdghDb } from '@tdgh/db';
import { Badge } from '@tdgh/ui';
import { Terminal, Box, ExternalLink, Code2, ArrowLeft, CheckCircle } from 'lucide-react';

interface CohortPageProps {
  params: Promise<{
    year: string;
    track: string;
  }>;
}

export default async function CohortDetailPage({ params }: CohortPageProps) {
  const { year, track } = await params;
  const cohort = tdghDb.getCohort(year, track);

  if (!cohort) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header */}
      <section className="bg-white border-b border-porcelain-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Link
            href="/cohorts"
            className="inline-flex items-center gap-2 text-xs font-mono text-obsidian-500 hover:text-obsidian"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Cohorts
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="electric">{cohort.year} Intake</Badge>
            <Badge variant={cohort.track === 'CODETREPRENEURS' ? 'default' : 'amber'}>
              {cohort.track}
            </Badge>
            <Badge variant={cohort.status === 'ACTIVE' ? 'emerald' : 'default'}>
              {cohort.status}
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-obsidian tracking-tight max-w-4xl">
            {cohort.title}
          </h1>

          <p className="text-lg text-obsidian-600 max-w-3xl leading-relaxed">
            {cohort.summary}
          </p>

          <div className="flex flex-wrap items-center gap-8 text-xs font-mono text-obsidian-500 pt-4 border-t border-porcelain-border">
            <div>
              <span>Enrolled:</span> <strong>{cohort.membersCount} Fellows</strong>
            </div>
            <div>
              <span>Term:</span>{' '}
              <strong>
                {cohort.startDate} to {cohort.endDate}
              </strong>
            </div>
            <div>
              <span>Campus:</span> <strong>4 Midway, Scottsville</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Capstone Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <Badge variant="emerald">Graduation Showcase</Badge>
          <h2 className="text-3xl font-black text-obsidian tracking-tight">
            Capstone Products Built by This Cohort
          </h2>
          <p className="text-sm text-obsidian-600">
            Real commercial ventures, municipal civic tools, and hardware prototypes solving localized problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cohort.capstones.map((cap) => (
            <div
              key={cap.id}
              className="bg-white rounded-3xl border border-porcelain-border overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="aspect-video bg-obsidian-950 relative overflow-hidden">
                <img
                  src={cap.thumbnailUrl}
                  alt={cap.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="electric">Verified Capstone</Badge>
                </div>
              </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-obsidian tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-xs font-mono text-electric-cobalt font-semibold">
                    {cap.tagline}
                  </p>
                  <p className="text-xs text-obsidian-600 leading-relaxed pt-1">
                    {cap.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-porcelain-border">
                  <div className="flex items-center justify-between text-xs font-mono text-obsidian-500">
                    <span>Creators:</span>
                    <strong>{cap.creators.join(' & ')}</strong>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cap.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-porcelain text-obsidian-700 px-2.5 py-1 rounded text-[11px] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    {cap.demoUrl && (
                      <a
                        href={cap.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-obsidian text-white text-xs font-mono font-semibold hover:bg-electric-cobalt transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Launch Live Demo
                      </a>
                    )}
                    {cap.repoUrl && (
                      <a
                        href={cap.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-porcelain-border text-obsidian text-xs font-mono font-semibold hover:bg-porcelain-muted transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5" /> View Repository
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fellows Roster */}
      {cohort.members.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <Badge variant="electric">Fellows Directory</Badge>
            <h2 className="text-3xl font-black text-obsidian tracking-tight">
              Class Roster & Graduate Profiles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cohort.members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-porcelain-border p-6 shadow-sm flex flex-col justify-between space-y-4"
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
                    <span className="inline-block mt-1 text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-mono font-semibold">
                      {member.capstoneTitle}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-obsidian-600 leading-relaxed">{member.bio}</p>

                <div className="pt-3 border-t border-porcelain-border flex items-center justify-between text-xs font-mono text-obsidian-500">
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> Graduate
                  </span>
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-electric-blue hover:underline"
                    >
                      GitHub &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
