import React from 'react';
import Link from 'next/link';
import { tdghDb } from '@tdgh/db';
import { FloorplanInteractive } from '@/components/cowork/FloorplanInteractive';
import { Badge, Card, CardHeader, CardTitle, CardContent } from '@tdgh/ui';
import { Wifi, ShieldCheck, BatteryCharging, Coffee, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Co-Working Space & Interactive Floorplan | The Daily Grind Hub',
  description:
    'High-speed fiber, backup generator power, flexible hot desks, dedicated workstations, and an executive boardroom at 4 Midway, Scottsville, Kraaifontein.',
};

export default function CoworkingPage() {
  const zones = tdghDb.getCoworkZones();

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header */}
      <section className="bg-white border-b border-porcelain-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="electric">Scottsville Enterprise Facility</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase tracking-wider">
              1Gbps Backbone &bull; Solar Backup
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-obsidian tracking-tight max-w-4xl">
            Where Township Grit Meets World-Class Workspace Infrastructure.
          </h1>

          <p className="text-lg text-obsidian-600 max-w-3xl leading-relaxed">
            Located at 4 Midway in Scottsville, Kraaifontein, The Daily Grind Hub offers uninterrupted high-speed internet, dedicated power resilience through load-shedding, and an inspiring collaborative environment designed for freelancers, remote tech workers, and growing ventures.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-obsidian-600 border-t border-porcelain-border">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-electric-cobalt" />
              <span>Monday–Friday: 08:00 – 18:00</span>
            </div>
            <div className="flex items-center gap-2">
              <BatteryCharging className="w-4 h-4 text-emerald-600" />
              <span>Uninterrupted Power Supply (Solar + Inverter)</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-blue-600" />
              <span>1 Gbps Symmetric Fiber Backbone</span>
            </div>
          </div>
        </div>
      </section>

      {/* Master Interactive Floorplan Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FloorplanInteractive zones={zones} />
      </section>

      {/* Transparent Membership & Day-Pass Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="amber">Transparent Membership</Badge>
          <h2 className="text-3xl font-black text-obsidian tracking-tight">
            Flexible Plans for Every Stage of Venture
          </h2>
          <p className="text-sm text-obsidian-600">
            No long-term lease lock-ins. Subsidized rates for verified Kraaifontein student entrepreneurs and non-profit initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Day Pass */}
          <div className="bg-white rounded-2xl border border-porcelain-border p-6 shadow-sm flex flex-col justify-between hover:border-obsidian transition-colors">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-obsidian-500">Casual Access</div>
              <h3 className="text-xl font-bold text-obsidian">Flex Day Pass</h3>
              <div className="text-3xl font-black text-obsidian font-mono">
                R180 <span className="text-xs font-normal text-obsidian-500">/ day</span>
              </div>
              <p className="text-xs text-obsidian-600 leading-relaxed">
                Full-day access to the Commons hot desks. Perfect for remote coders needing reliable power and fast fiber.
              </p>
              <ul className="space-y-2 text-xs text-obsidian-700 pt-2 border-t border-porcelain-border">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 1 Gbps Fiber Wi-Fi</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Barista Filtered Coffee</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Load-shedding protected</li>
              </ul>
            </div>
            <Link
              href="/contact?plan=day-pass"
              className="mt-6 w-full py-2.5 rounded-lg border-2 border-obsidian text-obsidian font-semibold text-center text-xs hover:bg-obsidian hover:text-white transition-colors"
            >
              Get Day Pass
            </Link>
          </div>

          {/* Monthly Flex Hot Desk */}
          <div className="bg-white rounded-2xl border border-porcelain-border p-6 shadow-sm flex flex-col justify-between hover:border-obsidian transition-colors">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-electric-cobalt font-semibold">Popular for Freelancers</div>
              <h3 className="text-xl font-bold text-obsidian">Monthly Flex</h3>
              <div className="text-3xl font-black text-obsidian font-mono">
                R1,850 <span className="text-xs font-normal text-obsidian-500">/ month</span>
              </div>
              <p className="text-xs text-obsidian-600 leading-relaxed">
                Unlimited weekday access to any flex workstation in the Commons. Includes monthly meeting room credits.
              </p>
              <ul className="space-y-2 text-xs text-obsidian-700 pt-2 border-t border-porcelain-border">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Unlimited Hub Hours</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 4 Hours Boardroom credits</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Locker Storage Included</li>
              </ul>
            </div>
            <Link
              href="/contact?plan=monthly-flex"
              className="mt-6 w-full py-2.5 rounded-lg bg-obsidian text-white font-semibold text-center text-xs hover:bg-electric-cobalt transition-colors shadow-tactile"
            >
              Join Monthly Flex
            </Link>
          </div>

          {/* Dedicated Desk */}
          <div className="bg-white rounded-2xl border-2 border-electric-cobalt p-6 shadow-lg flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-electric-cobalt text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold">
              Founder Workstation
            </div>
            <div className="space-y-4 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-obsidian-500">Permanent Setup</div>
              <h3 className="text-xl font-bold text-obsidian">Dedicated Desk</h3>
              <div className="text-3xl font-black text-obsidian font-mono">
                R3,200 <span className="text-xs font-normal text-obsidian-500">/ month</span>
              </div>
              <p className="text-xs text-obsidian-600 leading-relaxed">
                Your own permanent desk with dual monitor arms and locking filing cabinet in the Founder Pod.
              </p>
              <ul className="space-y-2 text-xs text-obsidian-700 pt-2 border-t border-porcelain-border">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 24/7 Biometric Access</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Dual 27" Display Mount</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 10 Hours Boardroom credits</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Business Mailing Address</li>
              </ul>
            </div>
            <Link
              href="/contact?plan=dedicated-desk"
              className="mt-6 w-full py-2.5 rounded-lg bg-electric-cobalt text-white font-semibold text-center text-xs hover:bg-blue-700 transition-colors shadow-glow-blue"
            >
              Reserve Dedicated Desk
            </Link>
          </div>

          {/* Executive Boardroom */}
          <div className="bg-white rounded-2xl border border-porcelain-border p-6 shadow-sm flex flex-col justify-between hover:border-obsidian transition-colors">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-600 font-semibold">Corporate & Pitch</div>
              <h3 className="text-xl font-bold text-obsidian">Boardroom Rental</h3>
              <div className="text-3xl font-black text-obsidian font-mono">
                R350 <span className="text-xs font-normal text-obsidian-500">/ hour</span>
              </div>
              <p className="text-xs text-obsidian-600 leading-relaxed">
                14-seat executive boardroom with 75" 4K display, 360 conference microphone, and glass whiteboards.
              </p>
              <ul className="space-y-2 text-xs text-obsidian-700 pt-2 border-t border-porcelain-border">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Seats 14 Participants</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> UltraHD Hybrid Video Bar</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Tea & Coffee Service</li>
              </ul>
            </div>
            <Link
              href="/contact?plan=boardroom"
              className="mt-6 w-full py-2.5 rounded-lg border-2 border-obsidian text-obsidian font-semibold text-center text-xs hover:bg-obsidian hover:text-white transition-colors"
            >
              Book Boardroom
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities & Facility Specifications Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-obsidian text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-electric-blue font-semibold">
              Enterprise Grade Standards
            </span>
            <h2 className="text-3xl font-black tracking-tight">
              Facility Specifications at 4 Midway
            </h2>
            <p className="text-sm text-obsidian-300">
              Engineered to ensure local tech creators never face digital downtime or infrastructure bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-xl bg-obsidian-900 border border-obsidian-800 space-y-2">
              <Wifi className="w-6 h-6 text-electric-cobalt" />
              <h4 className="font-bold text-base">Uncapped 1Gbps Fiber</h4>
              <p className="text-xs text-obsidian-400">
                Redundant dual-supplier fiber backbone with zero data caps and ultra-low latency for cloud deployments.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-obsidian-900 border border-obsidian-800 space-y-2">
              <BatteryCharging className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-base">100% Load-Shedding Immunity</h4>
              <p className="text-xs text-obsidian-400">
                Automatic rooftop solar array with 15kVA lithium battery inverter and automatic silent diesel generator failover.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-obsidian-900 border border-obsidian-800 space-y-2">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <h4 className="font-bold text-base">24/7 Guarded Security</h4>
              <p className="text-xs text-obsidian-400">
                Biometric access control, 16-channel HD CCTV coverage, secure on-site gated parking, and night patrol.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-obsidian-900 border border-obsidian-800 space-y-2">
              <Coffee className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-base">Artisan Espresso Bar & Kitchen</h4>
              <p className="text-xs text-obsidian-400">
                Freshly roasted beans, filtered water coolers, microwave stations, and community dining tables.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-obsidian-900 border border-obsidian-800 space-y-2">
              <Users className="w-6 h-6 text-purple-400" />
              <h4 className="font-bold text-base">Mentorship & Peer Collisions</h4>
              <p className="text-xs text-obsidian-400">
                Work alongside accepted incubation founders, senior software mentors, and 3D industrial prototyping designers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-obsidian-900 border border-obsidian-800 space-y-2">
              <Sparkles className="w-6 h-6 text-rose-400" />
              <h4 className="font-bold text-base">3D FabLab & Hardware Lab</h4>
              <p className="text-xs text-obsidian-400">
                Direct on-site access to FDM 3D printers, SLA resin stations, digital calipers, and electronics soldering benches.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
