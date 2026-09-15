'use client';

import React, { useState } from 'react';
import { tdghDb } from '@tdgh/db';
import { TeamMember, TicketDepartment } from '@tdgh/types';
import { Badge, Button, Input, Textarea, Modal } from '@tdgh/ui';
import { Users, Plus, ArrowUp, ArrowDown, Edit3, Trash2, Mail, ExternalLink } from 'lucide-react';

export default function AdminTeamCmsPage() {
  const [team, setTeam] = useState<TeamMember[]>(tdghDb.getTeamMembers());
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const newTeam = [...team];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newTeam.length) return;

    const temp = newTeam[index];
    newTeam[index] = newTeam[targetIdx];
    newTeam[targetIdx] = temp;

    newTeam.forEach((m, idx) => {
      m.order = idx + 1;
    });

    setTeam(newTeam);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    tdghDb.updateTeamMember(editingMember);
    setTeam(tdghDb.getTeamMembers());
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric">Headless CMS</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase">
              Staff & Mentorship Faculty
            </span>
          </div>
          <h1 className="text-3xl font-black text-obsidian tracking-tight mt-1">
            Team & Faculty CMS
          </h1>
        </div>
      </div>

      {/* Team Member List with Ordering */}
      <div className="bg-white rounded-3xl border border-porcelain-border overflow-hidden shadow-sm">
        <div className="p-4 bg-porcelain border-b border-porcelain-border font-mono text-xs text-obsidian-500 flex justify-between items-center">
          <span>Hierarchy Order determines public /team page display priority.</span>
          <span>{team.length} Active Profiles</span>
        </div>

        <div className="divide-y divide-porcelain-border">
          {team.map((member, idx) => (
            <div
              key={member.id}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-porcelain/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-porcelain-border shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-obsidian-400 font-bold">
                      #{member.order}
                    </span>
                    <h3 className="font-bold text-base text-obsidian">{member.name}</h3>
                    <Badge variant="default">{member.department}</Badge>
                  </div>
                  <p className="text-xs font-mono text-electric-cobalt font-semibold">
                    {member.role}
                  </p>
                  <p className="text-xs text-obsidian-600 line-clamp-1 max-w-xl">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => moveOrder(idx, 'up')}
                  disabled={idx === 0}
                  className="p-2 rounded-lg border border-porcelain-border hover:bg-porcelain text-obsidian disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveOrder(idx, 'down')}
                  disabled={idx === team.length - 1}
                  className="p-2 rounded-lg border border-porcelain-border hover:bg-porcelain text-obsidian disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setEditingMember({ ...member });
                    setIsEditModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-obsidian text-white text-xs font-mono font-semibold hover:bg-electric-cobalt transition-colors flex items-center gap-1.5"
                >
                  <Edit3 className="w-3 h-3" /> Edit Bio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Bio Modal */}
      {editingMember && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit Profile: ${editingMember.name}`}
          description="Update faculty role, bio, and department affiliation"
          maxWidth="lg"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Full Name</label>
              <Input
                required
                value={editingMember.name}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Official Title / Role</label>
              <Input
                required
                value={editingMember.role}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, role: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Department</label>
              <select
                className="w-full h-11 border rounded-lg px-3 text-sm"
                value={editingMember.department}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    department: e.target.value as TicketDepartment,
                  })
                }
              >
                <option value="INCUBATION">INCUBATION</option>
                <option value="CODETREPRENEURS">CODETREPRENEURS</option>
                <option value="MAKER_3D">MAKER_3D</option>
                <option value="COWORKING">COWORKING</option>
                <option value="GENERAL">GENERAL</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Biographical Summary</label>
              <Textarea
                rows={4}
                required
                value={editingMember.bio}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, bio: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Photo URL</label>
              <Input
                value={editingMember.avatarUrl}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, avatarUrl: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Save & Update Live Website &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
