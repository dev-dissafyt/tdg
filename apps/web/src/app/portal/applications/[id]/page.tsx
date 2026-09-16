'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { tdghDb } from '@tdgh/db';
import { Application, ProgramTrack } from '@tdgh/types';
import { Badge, Button, Input, Textarea } from '@tdgh/ui';
import { ArrowLeft, CheckCircle, Clock, Upload, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

function ApplicationWizardContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const appId = (params?.id as string) || 'new';

  const isNew = appId === 'new';
  const existing = !isNew ? tdghDb.getApplicationById(appId) : undefined;

  const getInitialTrack = (): ProgramTrack => {
    if (existing?.track) return existing.track;
    const queryTrack = searchParams?.get('track')?.toLowerCase();
    if (queryTrack === '3d-printing' || queryTrack === 'maker_3d' || queryTrack === '3d') return 'MAKER_3D';
    if (queryTrack === 'incubation' || queryTrack === 'bms') return 'INCUBATION';
    if (queryTrack === 'coworking' || queryTrack === 'desk') return 'COWORKING';
    return 'CODETREPRENEURS';
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [track, setTrack] = useState<ProgramTrack>(getInitialTrack());
  const [formData, setFormData] = useState({
    fullName: existing?.fullName || 'Kaylin Fortuin',
    email: existing?.email || 'kaylin.f@outlook.com',
    phone: existing?.phone || '+27 74 123 9988',
    suburb: existing?.suburb || 'Scottsville, Kraaifontein',
    educationLevel: existing?.payload?.educationLevel || 'Matric Certificate',
    priorExperience: existing?.payload?.priorExperience || 'Self-taught HTML/CSS and basic JavaScript.',
    githubOrPortfolioUrl: existing?.payload?.githubOrPortfolioUrl || 'https://github.com/kaylin-f',
    motivation: existing?.payload?.motivation || 'I want to build software products that empower township businesses.',
    pitchDeckUrl: existing?.payload?.pitchDeckUrl || '',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (isNew) {
        const created = tdghDb.createApplication({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          suburb: formData.suburb,
          track,
          stage: 'SUBMITTED',
          payload: {
            motivation: formData.motivation,
            educationLevel: formData.educationLevel,
            priorExperience: formData.priorExperience,
            githubOrPortfolioUrl: formData.githubOrPortfolioUrl,
            pitchDeckUrl: formData.pitchDeckUrl,
          },
        });
        setIsSubmitting(false);
        router.push(`/portal/applications/${created.id}`);
      } else {
        setSavedSuccess(true);
        setIsSubmitting(false);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        href="/portal/dashboard"
        className="inline-flex items-center gap-2 text-xs font-mono text-obsidian-500 hover:text-obsidian"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Portal Dashboard
      </Link>

      {/* Header & Status Indicator */}
      <div className="bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant={existing?.stage === 'ACCEPTED' ? 'emerald' : 'electric'}>
                {existing ? `Stage: ${existing.stage.replace('_', ' ')}` : 'New Application Wizard'}
              </Badge>
              <span className="text-xs font-mono text-obsidian-500 uppercase tracking-wider">
                Intake 2026
              </span>
            </div>
            <h1 className="text-3xl font-black text-obsidian tracking-tight mt-1">
              Multi-Track Fellowship & Incubation Wizard
            </h1>
          </div>

          <div className="text-xs font-mono text-obsidian-500 bg-porcelain px-3.5 py-1.5 rounded-xl border border-porcelain-border">
            Auto-Save State: <span className="text-emerald-600 font-bold">Synchronized</span>
          </div>
        </div>

        {/* Real-time Stage Funnel Progression */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-porcelain-border">
          {[
            { step: 1, label: 'Profile & Area' },
            { step: 2, label: 'Track Selection' },
            { step: 3, label: 'Motivation & Code' },
            { step: 4, label: 'Review & Submit' },
          ].map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            return (
              <div key={s.step} className="space-y-1 text-center sm:text-left">
                <div
                  className={`h-2 rounded-full transition-colors ${
                    isCompleted
                      ? 'bg-emerald-500'
                      : isCurrent
                      ? 'bg-electric-cobalt'
                      : 'bg-porcelain-border'
                  }`}
                />
                <span
                  className={`text-[11px] font-mono hidden sm:inline-block ${
                    isCurrent ? 'text-obsidian font-bold' : 'text-obsidian-400'
                  }`}
                >
                  {s.step}. {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Application state updated and saved to TDGH admissions database!</span>
        </div>
      )}

      {/* Multi-Step Wizard Body */}
      <div className="bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm">
        <form onSubmit={handleFinalSubmit} className="space-y-6">
          {/* STEP 1: Personal Profile & Location */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-xl font-bold text-obsidian tracking-tight">
                1. Candidate Profile & Kraaifontein Residency
              </h3>
              <p className="text-xs text-obsidian-500 font-mono">
                We prioritize youth residing in Scottsville, Bloekombos, Wallacedene, and surrounding suburbs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                    Full Legal Name *
                  </label>
                  <Input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                    WhatsApp Number *
                  </label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                    Residential Area / Suburb *
                  </label>
                  <Input
                    required
                    value={formData.suburb}
                    onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Track Selection & Educational Background */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-xl font-bold text-obsidian tracking-tight">
                2. Select Program Track & Background
              </h3>
              <p className="text-xs text-obsidian-500 font-mono">
                Choose the specialized learning or venture pathway you wish to enter.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setTrack('CODETREPRENEURS')}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    track === 'CODETREPRENEURS'
                      ? 'border-electric-cobalt bg-blue-50/50 shadow-sm'
                      : 'border-porcelain-border hover:border-obsidian'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-electric-cobalt">1-Year</span>
                    <h4 className="font-bold text-base text-obsidian">Codetrepreneurs</h4>
                    <p className="text-xs text-obsidian-600">
                      Full-stack web dev, TypeScript, PostgreSQL, and Lean Startup.
                    </p>
                  </div>
                  <Badge variant={track === 'CODETREPRENEURS' ? 'electric' : 'default'} className="mt-4">
                    {track === 'CODETREPRENEURS' ? 'Selected' : 'Select'}
                  </Badge>
                </button>

                <button
                  type="button"
                  onClick={() => setTrack('MAKER_3D')}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    track === 'MAKER_3D'
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                      : 'border-porcelain-border hover:border-obsidian'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-amber-600">6-Month</span>
                    <h4 className="font-bold text-base text-obsidian">3D Printing Studio</h4>
                    <p className="text-xs text-obsidian-600">
                      CAD design, FDM/SLA slicers, and circular plastics recycling.
                    </p>
                  </div>
                  <Badge variant={track === 'MAKER_3D' ? 'amber' : 'default'} className="mt-4">
                    {track === 'MAKER_3D' ? 'Selected' : 'Select'}
                  </Badge>
                </button>

                <button
                  type="button"
                  onClick={() => setTrack('INCUBATION')}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    track === 'INCUBATION'
                      ? 'border-purple-600 bg-purple-50/50 shadow-sm'
                      : 'border-porcelain-border hover:border-obsidian'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-purple-600">10-Week</span>
                    <h4 className="font-bold text-base text-obsidian">Pre-Incubation BMS</h4>
                    <p className="text-xs text-obsidian-600">
                      For registered founders with prototype needing governance & seed capital.
                    </p>
                  </div>
                  <Badge variant={track === 'INCUBATION' ? 'purple' : 'default'} className="mt-4">
                    {track === 'INCUBATION' ? 'Selected' : 'Select'}
                  </Badge>
                </button>

                <button
                  type="button"
                  onClick={() => setTrack('COWORKING')}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    track === 'COWORKING'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                      : 'border-porcelain-border hover:border-obsidian'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-600">Flexible</span>
                    <h4 className="font-bold text-base text-obsidian">Co-Working Desk</h4>
                    <p className="text-xs text-obsidian-600">
                      Hot desk or dedicated pod, 1Gbps unshaped fiber, and backup solar power.
                    </p>
                  </div>
                  <Badge variant={track === 'COWORKING' ? 'emerald' : 'default'} className="mt-4">
                    {track === 'COWORKING' ? 'Selected' : 'Select'}
                  </Badge>
                </button>
              </div>

              <div className="space-y-1.5 pt-4">
                <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                  Highest Level of Education Completed
                </label>
                <Input
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                  placeholder="e.g. Matric (Grade 12), TVET N4 Diploma, University degree"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Motivation, Prior Experience & Portfolio Links */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-xl font-bold text-obsidian tracking-tight">
                3. Personal Motivation & Digital Portfolio
              </h3>
              <p className="text-xs text-obsidian-500 font-mono">
                Tell our admissions board why you want to commit to this fellowship.
              </p>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                  Personal Statement of Motivation (150 - 300 words) *
                </label>
                <Textarea
                  rows={4}
                  required
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Explain your passion for technology, community problem solving, and long-term career ambition..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                  Prior Technology / Maker Experience
                </label>
                <Textarea
                  rows={3}
                  value={formData.priorExperience}
                  onChange={(e) => setFormData({ ...formData, priorExperience: e.target.value })}
                  placeholder="Any self-taught coding tutorials, school computer projects, mechanical tinkering, or community volunteer work..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-obsidian uppercase">
                  GitHub, Portfolio, or Project Link (Optional)
                </label>
                <Input
                  placeholder="https://github.com/your-handle or online portfolio"
                  value={formData.githubOrPortfolioUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, githubOrPortfolioUrl: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* STEP 4: Review, Pitch Deck Upload & Final Submission */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-xl font-bold text-obsidian tracking-tight">
                4. Dossier Review & Final Submission
              </h3>
              <p className="text-xs text-obsidian-500 font-mono">
                Please verify your details before submitting to the TDGH review committee.
              </p>

              <div className="p-4 bg-porcelain rounded-2xl border border-porcelain-border space-y-3 text-xs">
                <div className="flex justify-between border-b border-porcelain-border pb-2">
                  <span className="text-obsidian-500 font-mono">Candidate:</span>
                  <strong>{formData.fullName} ({formData.suburb})</strong>
                </div>
                <div className="flex justify-between border-b border-porcelain-border pb-2">
                  <span className="text-obsidian-500 font-mono">Selected Pathway:</span>
                  <Badge variant="electric">{track}</Badge>
                </div>
                <div className="flex justify-between border-b border-porcelain-border pb-2">
                  <span className="text-obsidian-500 font-mono">Contact:</span>
                  <span>{formData.email} &bull; {formData.phone}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-obsidian-500 font-mono">Motivation Excerpt:</span>
                  <p className="text-obsidian-700 italic">"{formData.motivation}"</p>
                </div>
              </div>

              {/* Pitch Deck Upload for Incubation */}
              {track === 'INCUBATION' && (
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
                  <div className="text-xs font-mono font-bold text-purple-900 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-purple-700" /> Pitch Deck or Concept Note Upload
                  </div>
                  <Input
                    placeholder="https://storage.tdgh.co.za/decks/your-concept.pdf"
                    value={formData.pitchDeckUrl}
                    onChange={(e) => setFormData({ ...formData, pitchDeckUrl: e.target.value })}
                  />
                </div>
              )}

              <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-blue-900 font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-electric-cobalt shrink-0" />
                <span>By submitting, you confirm you are available for full-time on-site attendance at 4 Midway, Scottsville.</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-porcelain-border">
            {currentStep > 1 ? (
              <Button type="button" variant="secondary" size="md" onClick={handlePrev}>
                &larr; Previous Step
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button type="button" variant="primary" size="md" onClick={handleNext}>
                Continue to Step {currentStep + 1} &rarr;
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                className="bg-electric-cobalt hover:bg-blue-700 shadow-glow-blue"
              >
                Submit Application to Admissions Committee &rarr;
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ApplicationWizardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-electric-cobalt border-t-transparent animate-spin" />
            <span className="text-sm font-mono text-obsidian-600">Loading admissions wizard...</span>
          </div>
        </div>
      }
    >
      <ApplicationWizardContent />
    </Suspense>
  );
}
