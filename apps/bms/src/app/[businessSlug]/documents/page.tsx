'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { tdghDb } from '@tdgh/db';
import { BmsDocument, ComplianceDocType } from '@tdgh/types';
import { Badge, Button, Input, Modal } from '@tdgh/ui';
import {
  FileCheck,
  Upload,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Shield,
  Plus,
} from 'lucide-react';

export default function BmsDocumentsPage() {
  const params = useParams();
  const businessSlug = (params?.businessSlug as string) || 'kasipay';

  const [docs, setDocs] = useState<BmsDocument[]>(tdghDb.getBmsDocs(businessSlug));
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState<ComplianceDocType>('CIPC_REGISTRATION');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: BmsDocument = {
      id: `doc-${Date.now()}`,
      title: newDocTitle,
      type: newDocType,
      status: 'PENDING_REVIEW',
      filename: `${newDocTitle.replace(/\s+/g, '_')}.pdf`,
      fileSize: '1.2 MB',
      uploadedAt: new Date().toISOString().split('T')[0],
    };

    docs.unshift(newDoc);
    setDocs([...docs]);
    setIsUploadModalOpen(false);
    setNewDocTitle('');
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="purple">Venture Governance Vault</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase">
              Corporate Formalization & Investor Readiness
            </span>
          </div>
          <h1 className="text-2xl font-black text-obsidian tracking-tight mt-1">
            Compliance & Pitch Document Repository
          </h1>
          <p className="text-xs text-obsidian-500 font-mono">
            Mandatory compliance artifacts required for graduation and TDGH seed capital release.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsUploadModalOpen(true)}
          className="shadow-tactile"
        >
          <Upload className="w-4 h-4 mr-1.5" /> Upload Official Document
        </Button>
      </div>

      {/* Compliance Status Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-porcelain-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-obsidian-500 font-bold">
              CIPC & SARS Standing
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-obsidian">Tax Compliant (Good Standing)</div>
          <p className="text-xs text-obsidian-600">SARS Tax PIN valid through August 2026.</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-porcelain-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-obsidian-500 font-bold">
              B-BBEE Status
            </span>
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-xl font-bold text-obsidian">Level 1 Contributor (135%)</div>
          <p className="text-xs text-obsidian-600">100% Black Youth Owned EME Affidavit verified.</p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-porcelain-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-obsidian-500 font-bold">
              Investor Deck Review
            </span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-obsidian">Version 4 (Under Review)</div>
          <p className="text-xs text-obsidian-600">Tariq Johnson reviewing slide 8 unit economics.</p>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-3xl border border-porcelain-border overflow-hidden shadow-sm">
        <div className="p-4 bg-porcelain border-b border-porcelain-border text-xs font-mono text-obsidian-500 flex justify-between">
          <span>Document Title & File Classification</span>
          <span>Verification Status</span>
        </div>

        <div className="divide-y divide-porcelain-border">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-porcelain/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-obsidian">{doc.title}</h4>
                    <Badge variant={doc.status === 'VERIFIED' ? 'emerald' : 'amber'}>
                      {doc.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-mono text-obsidian-500">
                    {doc.filename} &bull; {doc.fileSize} &bull; Uploaded: {doc.uploadedAt}
                  </p>
                  {doc.expiryDate && (
                    <p className="text-[11px] font-mono text-obsidian-400">
                      Valid Expiry: {doc.expiryDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <button
                  onClick={() => alert(`Downloading verified artifact: ${doc.filename}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-porcelain-border hover:bg-porcelain text-xs font-mono font-semibold text-obsidian"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsUploadModalOpen(false)}
          title="Upload Compliance Artifact"
          description="Upload signed PDF or official government registry document"
          maxWidth="md"
        >
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Document Title</label>
              <Input
                required
                placeholder="e.g. CIPC Annual Return Confirmation 2025"
                value={newDocTitle}
                onChange={(e) => setNewDocTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-semibold uppercase">Document Type</label>
              <select
                className="w-full h-11 border rounded-lg px-3 text-sm"
                value={newDocType}
                onChange={(e) => setNewDocType(e.target.value as ComplianceDocType)}
              >
                <option value="CIPC_REGISTRATION">CIPC Registration Certificate</option>
                <option value="BBBEE_AFFIDAVIT">B-BBEE Sworn Affidavit</option>
                <option value="TAX_PIN_SARS">SARS Tax Clearance PIN</option>
                <option value="BANK_CONFIRMATION">Bank Account Confirmation Letter</option>
                <option value="FOUNDER_AGREEMENT">Founders Shareholder Agreement</option>
                <option value="INVESTOR_PITCH_DECK">Investor Pitch Deck (PDF)</option>
              </select>
            </div>

            <div className="p-6 border-2 border-dashed border-porcelain-border rounded-xl text-center space-y-2">
              <Upload className="w-8 h-8 text-obsidian-400 mx-auto" />
              <div className="text-xs font-mono text-obsidian-600">
                Drag and drop your PDF here, or browse local files
              </div>
              <div className="text-[10px] font-mono text-obsidian-400">
                Maximum file size: 25MB (PDF only)
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Confirm Upload &rarr;
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
