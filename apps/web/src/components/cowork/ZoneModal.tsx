'use client';

import React from 'react';
import Link from 'next/link';
import { CoworkZone } from '@tdgh/types';
import { Modal, Badge, Button } from '@tdgh/ui';
import { Users, Wifi, Monitor, Zap, Sun, ShieldCheck } from 'lucide-react';

interface ZoneModalProps {
  zone: CoworkZone | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ZoneModal({ zone, isOpen, onClose }: ZoneModalProps) {
  if (!zone) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={zone.name}
      description={`Floor ${zone.floor} • Capacity: ${zone.capacity} Persons`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Photo Preview / Gallery */}
        {zone.photoGallery && zone.photoGallery.length > 0 && (
          <div className="relative rounded-xl overflow-hidden aspect-video bg-obsidian-900 border border-porcelain-border shadow-inner group">
            <img
              src={zone.photoGallery[0]}
              alt={zone.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3">
              <Badge variant={zone.status === 'AVAILABLE' ? 'emerald' : 'amber'}>
                {zone.status === 'AVAILABLE' ? 'Instant Access' : zone.status}
              </Badge>
            </div>
            <div className="absolute bottom-3 left-3 bg-obsidian/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-mono">
              360&deg; Spatial Preview &bull; Scottsville Concourse
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-obsidian-600 leading-relaxed">
          {zone.description}
        </p>

        {/* Technical Specs & Amenities Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-porcelain rounded-lg border border-porcelain-border flex flex-col items-start">
            <Users className="w-4 h-4 text-electric-cobalt mb-1.5" />
            <span className="text-[11px] text-obsidian-500 uppercase font-mono">Capacity</span>
            <span className="text-sm font-bold text-obsidian">{zone.capacity} Desks</span>
          </div>

          <div className="p-3 bg-porcelain rounded-lg border border-porcelain-border flex flex-col items-start">
            <Wifi className="w-4 h-4 text-electric-cobalt mb-1.5" />
            <span className="text-[11px] text-obsidian-500 uppercase font-mono">Fiber Speed</span>
            <span className="text-sm font-bold text-obsidian">1 Gbps Synced</span>
          </div>

          <div className="p-3 bg-porcelain rounded-lg border border-porcelain-border flex flex-col items-start">
            <Zap className="w-4 h-4 text-amber-500 mb-1.5" />
            <span className="text-[11px] text-obsidian-500 uppercase font-mono">Outlets</span>
            <span className="text-sm font-bold text-obsidian">{zone.specs.powerOutlets} Dedicated</span>
          </div>

          <div className="p-3 bg-porcelain rounded-lg border border-porcelain-border flex flex-col items-start">
            <Monitor className="w-4 h-4 text-purple-600 mb-1.5" />
            <span className="text-[11px] text-obsidian-500 uppercase font-mono">AV Display</span>
            <span className="text-sm font-bold text-obsidian">
              {zone.specs.hasAvDisplay ? '4K UltraHD' : 'BYOD Setup'}
            </span>
          </div>
        </div>

        {/* Amenities Checklist */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-obsidian font-semibold mb-2">
            Included Zone Amenities
          </h4>
          <div className="flex flex-wrap gap-2">
            {zone.amenities.map((amenity, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-xs bg-white px-2.5 py-1 rounded-md border border-porcelain-border text-obsidian-700 font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Rates & Booking Action */}
        <div className="p-4 bg-porcelain-muted rounded-xl border border-porcelain-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-obsidian-500 font-mono uppercase">Transparent Pricing</div>
            <div className="text-2xl font-black text-obsidian font-mono">
              R{zone.dailyRateZar}{' '}
              <span className="text-xs font-normal text-obsidian-500">/ day</span>
              <span className="mx-2 text-obsidian-300">|</span>
              <span className="text-lg">R{zone.monthlyRateZar}</span>{' '}
              <span className="text-xs font-normal text-obsidian-500">/ month</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="secondary" size="md" onClick={onClose} className="flex-1 sm:flex-initial">
              Dismiss
            </Button>
            <Link
              href={`/contact?zone=${encodeURIComponent(zone.slug)}`}
              onClick={onClose}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-obsidian text-white text-sm font-semibold hover:bg-electric-cobalt transition-colors shadow-tactile"
            >
              Book This Zone &rarr;
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
