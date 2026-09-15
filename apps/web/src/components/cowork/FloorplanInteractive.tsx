'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CoworkZone } from '@tdgh/types';
import { Badge, Button, Drawer } from '@tdgh/ui';
import { ZoneModal } from './ZoneModal';
import { Users, Wifi, Zap, Maximize2, Check, ArrowRight } from 'lucide-react';

interface FloorplanInteractiveProps {
  zones: CoworkZone[];
}

export function FloorplanInteractive({ zones }: FloorplanInteractiveProps) {
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<CoworkZone | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTabZoneId, setActiveTabZoneId] = useState<string>(zones[0]?.id || '');

  const hoveredZone = zones.find((z) => z.id === hoveredZoneId) || null;
  const activeTabZone = zones.find((z) => z.id === activeTabZoneId) || zones[0];

  const handleZoneClick = (zone: CoworkZone) => {
    setSelectedZone(zone);
    // On mobile (<768px), open drawer; on desktop, open modal
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsDrawerOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handlePillSelect = (zone: CoworkZone) => {
    setActiveTabZoneId(zone.id);
    setSelectedZone(zone);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-porcelain-border shadow-sm p-4 sm:p-8 space-y-6">
      {/* Header controls & Mobile Synced Pill Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-porcelain-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-electric-cobalt animate-ping" />
            <h3 className="text-xl font-bold tracking-tight text-obsidian">
              Live Interactive Floorplan & Spatial Directory
            </h3>
          </div>
          <p className="text-xs text-obsidian-500 mt-1 font-mono">
            Click any colored zone on desktop, or select tabs on mobile to inspect specifications.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-obsidian-600">
            <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block" /> Hot Desks
          </span>
          <span className="flex items-center gap-1.5 text-obsidian-600">
            <span className="w-3 h-3 rounded-sm bg-cyan-500 inline-block" /> Dedicated
          </span>
          <span className="flex items-center gap-1.5 text-obsidian-600">
            <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" /> Boardroom
          </span>
          <span className="flex items-center gap-1.5 text-obsidian-600">
            <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Coding Lab
          </span>
          <span className="flex items-center gap-1.5 text-obsidian-600">
            <span className="w-3 h-3 rounded-sm bg-rose-500 inline-block" /> 3D FabLab
          </span>
        </div>
      </div>

      {/* Synced Horizontal Pill-Tabs (Prominent on Mobile, Accessible on All) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-porcelain-border md:border-none">
        {zones.map((zone) => {
          const isSelected = zone.id === (hoveredZoneId || activeTabZoneId);
          return (
            <button
              key={zone.id}
              onClick={() => handlePillSelect(zone)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-mono whitespace-nowrap transition-all select-none cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-obsidian text-white shadow-tactile'
                  : 'bg-porcelain text-obsidian-700 hover:bg-porcelain-muted border border-porcelain-border'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: zone.colorToken }}
              />
              {zone.name}
            </button>
          );
        })}
      </div>

      {/* Master SVG Canvas Wrapper */}
      <div className="relative w-full aspect-[800/440] rounded-xl overflow-hidden bg-obsidian-950 border border-obsidian-800 shadow-2xl">
        {/* Subtle grid pattern in background */}
        <div className="absolute inset-0 filament-noise opacity-30 pointer-events-none" />

        {/* Real-time Hover HUD (Desktop) */}
        {hoveredZone && (
          <div className="absolute top-4 left-4 z-20 hidden md:flex items-center gap-3 bg-obsidian/90 backdrop-blur-md border border-obsidian-700 text-white px-4 py-2.5 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
            <div
              className="w-3 h-8 rounded-full"
              style={{ backgroundColor: hoveredZone.colorToken }}
            />
            <div>
              <div className="text-sm font-bold tracking-tight">{hoveredZone.name}</div>
              <div className="text-xs text-obsidian-400 font-mono">
                {hoveredZone.capacity} Seats &bull; R{hoveredZone.dailyRateZar}/day &bull; Click to expand specs
              </div>
            </div>
          </div>
        )}

        {/* The Architectural Vector SVG */}
        <svg
          viewBox="0 0 800 440"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft glow filter for active zone */}
            <filter id="zone-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Exterior Structural Walls */}
          <rect
            x="20"
            y="20"
            width="760"
            height="390"
            rx="12"
            fill="#0D0F11"
            stroke="#2E343B"
            strokeWidth="3"
          />

          {/* Central Corridor & Hallway Guide */}
          <line x1="20" y1="190" x2="780" y2="190" stroke="#1F242B" strokeWidth="6" strokeDasharray="8,6" />
          <line x1="530" y1="20" x2="530" y2="410" stroke="#1F242B" strokeWidth="4" />
          <text x="540" y="42" fill="#525E6E" fontSize="10" fontFamily="monospace">
            MAIN CONCOURSE &bull; SCOTTSVILLE ENTRY
          </text>

          {/* Render Interactive Zones */}
          {zones.map((zone) => {
            const isHovered = hoveredZoneId === zone.id;
            const isSelectedTab = activeTabZoneId === zone.id;
            const highlight = isHovered || isSelectedTab;

            return (
              <g
                key={zone.id}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredZoneId(zone.id)}
                onMouseLeave={() => setHoveredZoneId(null)}
                onClick={() => handleZoneClick(zone)}
              >
                {/* SVG Zone Polygon */}
                <path
                  d={zone.svgCoordinates}
                  fill={zone.colorToken}
                  fillOpacity={highlight ? 0.45 : 0.18}
                  stroke={zone.colorToken}
                  strokeWidth={highlight ? 3 : 1.5}
                  filter={highlight ? 'url(#zone-glow)' : undefined}
                  className="transition-all duration-300"
                />

                {/* Spatial Anchor Pill in Center of Zone */}
                {/* Hot Desks */}
                {zone.id === 'zone-hotdesks' && (
                  <g transform="translate(60, 80)" pointerEvents="none">
                    <rect width="180" height="70" rx="8" fill="#181B1F" fillOpacity="0.85" stroke="#2E343B" />
                    <text x="12" y="24" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                      Hot Desks Commons
                    </text>
                    <text x="12" y="42" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                      24 Flex Workstations
                    </text>
                    <text x="12" y="58" fill="#38BDF8" fontSize="10" fontFamily="monospace">
                      R180 / Day Pass
                    </text>
                  </g>
                )}

                {/* Dedicated Desks */}
                {zone.id === 'zone-dedicated' && (
                  <g transform="translate(300, 80)" pointerEvents="none">
                    <rect width="190" height="70" rx="8" fill="#181B1F" fillOpacity="0.85" stroke="#2E343B" />
                    <text x="12" y="24" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                      Dedicated Founder Desks
                    </text>
                    <text x="12" y="42" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                      12 Dual-Monitor Stations
                    </text>
                    <text x="12" y="58" fill="#22D3EE" fontSize="10" fontFamily="monospace">
                      R3,200 / Month
                    </text>
                  </g>
                )}

                {/* Impact Boardroom */}
                {zone.id === 'zone-boardroom' && (
                  <g transform="translate(560, 80)" pointerEvents="none">
                    <rect width="180" height="85" rx="8" fill="#181B1F" fillOpacity="0.85" stroke="#2E343B" />
                    <text x="12" y="24" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                      Impact Boardroom
                    </text>
                    <text x="12" y="42" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                      14 Seats &bull; 4K Display
                    </text>
                    <text x="12" y="58" fill="#FBBF24" fontSize="10" fontFamily="monospace">
                      R350 / Hour
                    </text>
                    <text x="12" y="74" fill="#4ADE80" fontSize="9" fontFamily="monospace">
                      &bull; AVAILABLE NOW
                    </text>
                  </g>
                )}

                {/* Coding Lab */}
                {zone.id === 'zone-codinglab' && (
                  <g transform="translate(60, 240)" pointerEvents="none">
                    <rect width="240" height="80" rx="8" fill="#181B1F" fillOpacity="0.85" stroke="#2E343B" />
                    <text x="12" y="24" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                      Codetrepreneurs Arena
                    </text>
                    <text x="12" y="42" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                      20 Pair-Programming Desks
                    </text>
                    <text x="12" y="58" fill="#4ADE80" fontSize="10" fontFamily="monospace">
                      Linux Dual-Boot &bull; Subnet Router
                    </text>
                  </g>
                )}

                {/* Meeting Booths */}
                {zone.id === 'zone-booths' && (
                  <g transform="translate(375, 215)" pointerEvents="none">
                    <rect width="130" height="60" rx="6" fill="#181B1F" fillOpacity="0.85" stroke="#2E343B" />
                    <text x="8" y="22" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                      Acoustic Pods
                    </text>
                    <text x="8" y="38" fill="#C084FC" fontSize="9" fontFamily="monospace">
                      4 Soundproof Booths
                    </text>
                    <text x="8" y="52" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                      R90 / Hour
                    </text>
                  </g>
                )}

                {/* 3D FabLab */}
                {zone.id === 'zone-makerspace' && (
                  <g transform="translate(375, 320)" pointerEvents="none">
                    <rect width="130" height="50" rx="6" fill="#181B1F" fillOpacity="0.85" stroke="#2E343B" />
                    <text x="8" y="18" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                      3D FabLab Studio
                    </text>
                    <text x="8" y="32" fill="#F87171" fontSize="9" fontFamily="monospace">
                      Prusa + SLA Station
                    </text>
                    <text x="8" y="44" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                      10 Maker Benches
                    </text>
                  </g>
                )}

                {/* Community Cafe */}
                {zone.id === 'zone-cafe' && (
                  <g transform="translate(560, 260)" pointerEvents="none">
                    <rect width="180" height="75" rx="8" fill="#181B1F" fillOpacity="0.85" stroke="#2E343B" />
                    <text x="12" y="24" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                      Daily Grind Cafe & Kitchen
                    </text>
                    <text x="12" y="42" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                      30 Person Gathering Hall
                    </text>
                    <text x="12" y="58" fill="#CBD5E1" fontSize="10" fontFamily="monospace">
                      Fresh Espresso &bull; Microwave
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Mobile Tap Guide Overlay */}
        <div className="absolute bottom-3 right-3 md:hidden">
          <button
            onClick={() => handleZoneClick(activeTabZone)}
            className="flex items-center gap-1.5 bg-electric-cobalt text-white text-xs px-3 py-1.5 rounded-lg shadow-lg font-mono"
          >
            <Maximize2 className="w-3.5 h-3.5" /> View {activeTabZone.name}
          </button>
        </div>
      </div>

      {/* Selected Zone Quick Bar (Desktop below map) */}
      {activeTabZone && (
        <div className="hidden md:flex items-center justify-between p-4 bg-porcelain rounded-xl border border-porcelain-border">
          <div className="flex items-center gap-4">
            <div
              className="w-4 h-12 rounded-lg"
              style={{ backgroundColor: activeTabZone.colorToken }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-obsidian">{activeTabZone.name}</span>
                <Badge variant={activeTabZone.status === 'AVAILABLE' ? 'emerald' : 'amber'}>
                  {activeTabZone.status}
                </Badge>
              </div>
              <p className="text-xs text-obsidian-500 line-clamp-1 max-w-xl mt-0.5">
                {activeTabZone.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-obsidian-500 font-mono">Day Rate</div>
              <div className="text-lg font-black text-obsidian font-mono">
                R{activeTabZone.dailyRateZar} <span className="text-xs font-normal text-obsidian-500">ZAR</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setSelectedZone(activeTabZone);
                setIsModalOpen(true);
              }}
            >
              Inspect Specs & Photos &rarr;
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Modal View */}
      <ZoneModal
        zone={selectedZone}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Mobile Drawer View */}
      {selectedZone && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={selectedZone.name}
        >
          <div className="space-y-4">
            {selectedZone.photoGallery && selectedZone.photoGallery[0] && (
              <img
                src={selectedZone.photoGallery[0]}
                alt={selectedZone.name}
                className="w-full h-44 object-cover rounded-xl border border-porcelain-border"
              />
            )}
            <p className="text-sm text-obsidian-600">{selectedZone.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-porcelain rounded-lg">
                <span className="text-obsidian-400 font-mono">Capacity:</span>{' '}
                <strong>{selectedZone.capacity} Seats</strong>
              </div>
              <div className="p-2.5 bg-porcelain rounded-lg">
                <span className="text-obsidian-400 font-mono">Fiber:</span>{' '}
                <strong>1 Gbps Synced</strong>
              </div>
              <div className="p-2.5 bg-porcelain rounded-lg">
                <span className="text-obsidian-400 font-mono">Daily Rate:</span>{' '}
                <strong>R{selectedZone.dailyRateZar}</strong>
              </div>
              <div className="p-2.5 bg-porcelain rounded-lg">
                <span className="text-obsidian-400 font-mono">Monthly:</span>{' '}
                <strong>R{selectedZone.monthlyRateZar}</strong>
              </div>
            </div>

            <Link
              href={`/contact?zone=${encodeURIComponent(selectedZone.slug)}`}
              onClick={() => setIsDrawerOpen(false)}
              className="w-full py-3 bg-obsidian text-white rounded-lg font-semibold text-center block"
            >
              Inquire / Reserve Desk &rarr;
            </Link>
          </div>
        </Drawer>
      )}
    </div>
  );
}
