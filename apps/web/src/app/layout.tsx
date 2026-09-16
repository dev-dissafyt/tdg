import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { generateHubLocalBusinessSchema } from '@/lib/seo/ai-search-schemas';

import { HeaderNav } from '@/components/layout/HeaderNav';

export const metadata: Metadata = {
  title: 'The Daily Grind Hub | Scottsville, Kraaifontein Tech Innovation Ecosystem',
  description:
    'Empowering Kraaifontein youth from job seekers into job creators. Home of Codetrepreneurs, 3D Additive Studio, Pre-Incubator, and High-Speed Enterprise Co-Working.',
  keywords: [
    'Kraaifontein tech hub',
    'Scottsville coworking',
    'Codetrepreneurs',
    '3D printing Cape Town',
    'Township tech incubator',
    'Youth software engineering South Africa',
  ],
  openGraph: {
    title: 'The Daily Grind Hub (TDGH)',
    description: 'Empowering youth from job seekers into job creators in Scottsville, Kraaifontein.',
    url: 'https://dailygrindhub.co.za',
    siteName: 'The Daily Grind Innovation Hub',
    locale: 'en_ZA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = generateHubLocalBusinessSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-screen bg-porcelain text-obsidian flex flex-col font-sans selection:bg-electric-cobalt selection:text-white">
        {/* Hub Operations Ticker */}
        <div className="bg-obsidian text-white text-xs py-2 px-4 border-b border-obsidian-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono uppercase tracking-wider text-[11px] text-obsidian-300">
                Facility Status: Normal Operations
              </span>
              <span className="hidden sm:inline text-obsidian-500">|</span>
              <span className="hidden sm:inline text-obsidian-300">
                1Gbps Fiber + Inverter Power Active
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono text-obsidian-300">
              <span>4 Midway, Scottsville, Kraaifontein</span>
              <span className="hidden md:inline">08:00 – 18:00</span>
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noreferrer"
                className="text-electric-blue hover:underline"
              >
                Admin Control Room &rarr;
              </a>
              <a
                href="http://localhost:3002/kasipay/canvas"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline"
              >
                Incubatee BMS &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Master Navigation Header with 'Who are we' & 'What we do' Hover Menus and Reason-Targeted Apply */}
        <HeaderNav />

        {/* Main Viewport Content */}
        <main className="flex-1">{children}</main>

        {/* Editorial Non-Profit Footer */}
        <footer className="bg-obsidian text-white border-t border-obsidian-800 pt-16 pb-12 mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-obsidian-800">
              <div className="md:col-span-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-electric-cobalt text-white flex items-center justify-center font-mono font-black text-lg">
                    TDG
                  </div>
                  <span className="font-bold text-lg tracking-tight">The Daily Grind Hub</span>
                </div>
                <p className="text-sm text-obsidian-400 leading-relaxed">
                  Transforming job seekers into job creators in Scottsville, Kraaifontein through full-stack software fellowships, additive manufacturing, and venture incubation.
                </p>
                <div className="text-xs font-mono text-obsidian-400">
                  Registered NPO &bull; PBO Certified &bull; Section 18A Tax Compliant
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-obsidian-300 font-semibold mb-4">
                  Programs & Spaces
                </h4>
                <ul className="space-y-2.5 text-sm text-obsidian-400">
                  <li><Link href="/incubation" className="hover:text-white transition-colors">Business Incubation</Link></li>
                  <li><Link href="/coworking" className="hover:text-white transition-colors">Co-Working Space</Link></li>
                  <li><Link href="/codetrepreneurs" className="hover:text-white transition-colors">Codetrepreneurs (1-Year)</Link></li>
                  <li><Link href="/3d-printing" className="hover:text-white transition-colors">3D Printing Studio</Link></li>
                  <li><Link href="/cohorts" className="hover:text-white transition-colors">Cohort Capstone Showcase</Link></li>
                  <li><Link href="/portal/applications/new" className="text-electric-blue hover:underline">Apply for 2026 Intake</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-obsidian-300 font-semibold mb-4">
                  Community & Operations
                </h4>
                <ul className="space-y-2.5 text-sm text-obsidian-400">
                  <li><Link href="/about" className="hover:text-white transition-colors">History & Socio-Economic Narrative</Link></li>
                  <li><Link href="/team" className="hover:text-white transition-colors">Leadership & Mentors</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Physical Map & Intake Form</Link></li>
                  <li><Link href="/portal/tickets" className="hover:text-white transition-colors">Support Ticketing Portal</Link></li>
                  <li><a href="http://localhost:3001" className="text-electric-blue hover:underline">Staff Admin Control Room</a></li>
                  <li><a href="http://localhost:3002/kasipay/canvas" className="text-amber-400 hover:underline">Incubatee BMS Portal</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-obsidian-300 font-semibold mb-4">
                  Location & Contact
                </h4>
                <div className="space-y-3 text-sm text-obsidian-400">
                  <p>
                    <strong className="text-white">The Daily Grind Hub</strong><br />
                    4 Midway Street, Scottsville<br />
                    Kraaifontein, Cape Town, 7570
                  </p>
                  <p>
                    <span className="text-obsidian-400">Hours:</span> Mon–Fri: 08:00 – 18:00<br />
                    Sat: 09:00 – 14:00
                  </p>
                  <p>
                    <span className="text-obsidian-400">Email:</span> info@dailygrindhub.co.za<br />
                    <span className="text-obsidian-400">Tel:</span> +27 21 987 1000
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-obsidian-400 gap-4">
              <p>&copy; {new Date().getFullYear()} The Daily Grind Innovation Hub. All rights reserved.</p>
              <div className="flex items-center space-x-6">
                <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/about" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Whistleblower Line</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
