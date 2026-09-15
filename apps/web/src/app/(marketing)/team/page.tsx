import React from 'react';
import Link from 'next/link';
import { tdghDb } from '@tdgh/db';
import { Badge } from '@tdgh/ui';
import { Mail, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Team, Leadership & Mentors | The Daily Grind Hub',
  description:
    'Meet the visionary educators, software engineers, 3D printing specialists, and venture mentors powering The Daily Grind Hub in Scottsville.',
};

export default function TeamPage() {
  const team = tdghDb.getTeamMembers();

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header */}
      <section className="bg-white border-b border-porcelain-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="electric">Hub Mentors & Leadership</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase tracking-wider">
              Scottsville Executive & Technical Faculty
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-obsidian tracking-tight max-w-4xl">
            Passionate Mentors Dedicated to Transforming Lives.
          </h1>

          <p className="text-lg text-obsidian-600 max-w-3xl leading-relaxed">
            Our team brings together decades of veteran software architecture, mechanical prototyping, venture incubation, and deep community roots in Kraaifontein.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl border border-porcelain-border overflow-hidden shadow-sm flex flex-col justify-between hover:border-obsidian transition-colors group"
            >
              <div className="aspect-[4/3] bg-obsidian-900 overflow-hidden relative">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="default">{member.department}</Badge>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-obsidian tracking-tight group-hover:text-electric-cobalt transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-electric-cobalt font-semibold">
                    {member.role}
                  </p>
                  <p className="text-xs text-obsidian-600 leading-relaxed pt-2">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-porcelain-border flex items-center justify-between text-xs font-mono">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-1.5 text-obsidian-500 hover:text-obsidian"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </a>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-electric-blue hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mentor Network Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-porcelain border border-porcelain-border text-center space-y-4">
          <Badge variant="amber">Join Our Mentor Faculty</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-obsidian tracking-tight">
            Are You a Senior Engineer, Product Designer, or Founder?
          </h2>
          <p className="text-xs sm:text-sm text-obsidian-600 max-w-xl mx-auto">
            Give back 2 hours a month to review student pull requests, conduct mock investor pitches, and guide young Kraaifontein coders into tech careers.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?intent=mentor"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-obsidian text-white font-semibold text-xs hover:bg-electric-cobalt transition-colors shadow-tactile"
            >
              Become a Volunteer Mentor &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
