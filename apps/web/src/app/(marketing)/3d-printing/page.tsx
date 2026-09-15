import React from 'react';
import Link from 'next/link';
import { tdghDb } from '@tdgh/db';
import { PrintBedCanvas } from '@/components/three/PrintBedCanvas';
import { FilamentHeading, FilamentButton } from '@/components/three/FilamentTypography';
import { CtaMeshCluster } from '@/components/three/CtaMeshCluster';
import { Badge, Card, CardContent } from '@tdgh/ui';
import { Box, Layers, Cpu, Recycle, ArrowRight, CheckCircle2, Sparkles, Compass } from 'lucide-react';

export const metadata = {
  title: '3D Printing & Additive Manufacturing Lab | The Daily Grind Hub',
  description:
    'Hands-on vocational diploma in CAD design, rapid prototyping, FDM/SLA printing, and circular plastics extrusion in Scottsville, Kraaifontein.',
};

export default function ThreeDPrintingPage() {
  const cohort = tdghDb.getCohort('2025', '3d-printing');

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header */}
      <section className="bg-white border-b border-porcelain-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="amber">Additive Manufacturing Studio</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase tracking-wider">
              CAD Design &bull; Rapid Prototyping &bull; Circular Plastics
            </span>
          </div>

          <FilamentHeading as="h1" className="text-4xl sm:text-5xl lg:text-6xl text-obsidian max-w-4xl">
            From Digital Pixels to Tangible Physical Products in Kraaifontein.
          </FilamentHeading>

          <p className="text-lg text-obsidian-600 max-w-3xl leading-relaxed">
            Our 6-month hands-on Additive Manufacturing fellowship trains local youth to design, slice, calibrate, and mass-manufacture functional hardware components using state-of-the-art FDM and SLA resin 3D printers.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/portal/applications/new?track=MAKER_3D"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-obsidian text-white font-semibold hover:bg-electric-cobalt transition-colors shadow-tactile hover:shadow-tactile-hover"
            >
              Apply for 3D Maker Fellowship &rarr;
            </Link>
            <Link
              href="#syllabus"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg border-2 border-obsidian text-obsidian font-semibold hover:bg-obsidian hover:text-white transition-colors"
            >
              Explore 6-Month Syllabus
            </Link>
          </div>
        </div>
      </section>

      {/* Feature: Live Three.js Additive Manufacturing PrintBed Simulation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <Badge variant="electric">WebGL 3D Viewport</Badge>
            <h2 className="text-2xl font-bold text-obsidian tracking-tight mt-1">
              Interactive Gantry Toolpath Simulation
            </h2>
          </div>
          <p className="text-xs text-obsidian-500 font-mono">
            Scroll down the page to trigger layer-by-layer extrusion deposition.
          </p>
        </div>

        <PrintBedCanvas />
      </section>

      {/* 4 Core Pillars of the Additive Curriculum */}
      <section id="syllabus" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="amber">Vocational Syllabus</Badge>
          <h2 className="text-3xl font-black text-obsidian tracking-tight">
            Curriculum Breakdown & Tooling Stack
          </h2>
          <p className="text-sm text-obsidian-600">
            Learn professional CAD parametric modeling, tolerance engineering, and circular manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-electric-cobalt flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-obsidian">Parametric CAD Design</h3>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              Autodesk Fusion 360 & OnShape. Designing for assembly (DFA), snap-fit joints, thread inserts, and mechanical tolerances.
            </p>
            <div className="text-xs font-mono text-electric-cobalt font-semibold pt-2 border-t border-porcelain-border">
              Software: Fusion 360 & FreeCAD
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-obsidian">Slicing & Toolpath Optimization</h3>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              PrusaSlicer, Bambu Studio & Cura. G-code tuning, infill density matrices, support generation, and bridge overhang tuning.
            </p>
            <div className="text-xs font-mono text-emerald-700 font-semibold pt-2 border-t border-porcelain-border">
              Tool: Prusa MK4 & Bambu P1S
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <Recycle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-obsidian">Circular Plastic Extrusion</h3>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              Shredding discarded polyethylene & PET bottles from Kraaifontein streets, extruding customized filament spools, and closed-loop testing.
            </p>
            <div className="text-xs font-mono text-rose-700 font-semibold pt-2 border-t border-porcelain-border">
              Material: Recycled PETG / PLA
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-porcelain-border space-y-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-obsidian">IoT Hardware & Enclosures</h3>
            <p className="text-xs text-obsidian-600 leading-relaxed">
              Housing microcontrollers (ESP32, Raspberry Pi), weatherproofing with silicone gaskets, and deploying agricultural soil sensors.
            </p>
            <div className="text-xs font-mono text-purple-700 font-semibold pt-2 border-t border-porcelain-border">
              Certification: IPC Soldering & CAD
            </div>
          </div>
        </div>
      </section>

      {/* Prototype Showcase */}
      {cohort && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Badge variant="electric">Hardware Capstones</Badge>
              <h2 className="text-2xl font-bold text-obsidian tracking-tight mt-1">
                Prototypes Fabricated in the TDGH FabLab
              </h2>
            </div>
            <Link
              href="/cohorts/2025/3d-printing"
              className="text-xs font-mono font-bold text-electric-cobalt hover:underline"
            >
              View Full Maker Portfolio &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cohort.capstones.map((cap) => (
              <div
                key={cap.id}
                className="bg-white rounded-2xl border border-porcelain-border overflow-hidden shadow-sm flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 aspect-square md:aspect-auto bg-obsidian relative">
                  <img
                    src={cap.thumbnailUrl}
                    alt={cap.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="amber">3D Printed in PETG</Badge>
                  </div>
                </div>

                <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-xl text-obsidian">{cap.title}</h4>
                    <p className="text-xs text-obsidian-600 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-porcelain-border">
                    <div className="text-[11px] font-mono text-obsidian-500">
                      Fabricated by: <strong>{cap.creators.join(', ')}</strong>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-porcelain text-obsidian-700 text-[10px] font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive CTA with Low-Poly 3D Mesh Cluster */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-obsidian text-white p-10 sm:p-16 text-center overflow-hidden border border-obsidian-800 shadow-2xl">
          {/* Three.js magnetic low-poly cluster */}
          <CtaMeshCluster />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Badge variant="electric">Kraaifontein Maker Lab</Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Prototype the Physical Products of Tomorrow?
            </h2>
            <p className="text-sm text-obsidian-300 leading-relaxed">
              Fully sponsored 6-month hands-on fellowship. Master CAD design, precision slicing, and additive hardware assembly in Scottsville.
            </p>

            <div className="pt-2">
              <Link href="/portal/applications/new?track=MAKER_3D">
                <FilamentButton>
                  Submit 3D Fellowship Application &rarr;
                </FilamentButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
