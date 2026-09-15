'use client';

import React, { useState } from 'react';
import { tdghDb } from '@tdgh/db';
import { CoworkZone, ZoneStatus } from '@tdgh/types';
import { Badge, Button, Input, Textarea, Modal } from '@tdgh/ui';
import { Building2, Edit2, DollarSign, Users, Zap, Check } from 'lucide-react';

export default function AdminCoworkSpacesCmsPage() {
  const [zones, setZones] = useState<CoworkZone[]>(tdghDb.getCoworkZones());
  const [editingZone, setEditingZone] = useState<CoworkZone | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingZone) return;

    tdghDb.updateCoworkZone(editingZone);
    setZones([...tdghDb.getCoworkZones()]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Spatial CMS</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase">
              Interactive Floorplan & Capacity Editor
            </span>
          </div>
          <h1 className="text-3xl font-black text-obsidian tracking-tight mt-1">
            Co-Working Spaces & Pricing CMS
          </h1>
        </div>
      </div>

      {/* Zones Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {zones.map((zone) => (
          <div
            key={zone.id}
            className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-obsidian transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: zone.colorToken }}
                  />
                  <h3 className="font-bold text-lg text-obsidian">{zone.name}</h3>
                </div>
                <Badge variant={zone.status === 'AVAILABLE' ? 'emerald' : 'amber'}>
                  {zone.status}
                </Badge>
              </div>

              <p className="text-xs text-obsidian-600 leading-relaxed">
                {zone.description}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-porcelain-border text-xs font-mono">
                <div className="p-2 bg-porcelain rounded-lg">
                  <span className="text-obsidian-400">Capacity:</span>
                  <div className="font-bold text-obsidian">{zone.capacity} Seats</div>
                </div>
                <div className="p-2 bg-porcelain rounded-lg">
                  <span className="text-obsidian-400">Daily ZAR:</span>
                  <div className="font-bold text-obsidian">R{zone.dailyRateZar}</div>
                </div>
                <div className="p-2 bg-porcelain rounded-lg">
                  <span className="text-obsidian-400">Monthly ZAR:</span>
                  <div className="font-bold text-obsidian">R{zone.monthlyRateZar}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-porcelain-border flex items-center justify-between">
              <span className="text-[11px] font-mono text-obsidian-400">
                Floor: {zone.floor} &bull; Outlets: {zone.specs.powerOutlets}
              </span>
              <button
                onClick={() => {
                  setEditingZone({ ...zone });
                  setIsModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-obsidian text-white text-xs font-mono font-semibold hover:bg-electric-cobalt transition-colors"
              >
                Edit Pricing & Specs &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Zone Modal */}
      {editingZone && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Edit Spatial Zone: ${editingZone.name}`}
          description="Update desk capacity, status, and transparent rental pricing"
          maxWidth="lg"
        >
          <form onSubmit={handleSaveZone} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Zone Name</label>
              <Input
                required
                value={editingZone.name}
                onChange={(e) =>
                  setEditingZone({ ...editingZone, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase">Seat Capacity</label>
                <Input
                  type="number"
                  value={editingZone.capacity}
                  onChange={(e) =>
                    setEditingZone({ ...editingZone, capacity: Number(e.target.value) })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase">Status</label>
                <select
                  className="w-full h-11 border rounded-lg px-3 text-sm"
                  value={editingZone.status}
                  onChange={(e) =>
                    setEditingZone({ ...editingZone, status: e.target.value as ZoneStatus })
                  }
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="OCCUPIED">OCCUPIED</option>
                  <option value="MAINTENANCE">MAINTENANCE</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase">Daily Rate (ZAR)</label>
                <Input
                  type="number"
                  value={editingZone.dailyRateZar}
                  onChange={(e) =>
                    setEditingZone({ ...editingZone, dailyRateZar: Number(e.target.value) })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold uppercase">Monthly Rate (ZAR)</label>
                <Input
                  type="number"
                  value={editingZone.monthlyRateZar}
                  onChange={(e) =>
                    setEditingZone({ ...editingZone, monthlyRateZar: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Description</label>
              <Textarea
                rows={3}
                value={editingZone.description}
                onChange={(e) =>
                  setEditingZone({ ...editingZone, description: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Update Zone On Public Floorplan &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
