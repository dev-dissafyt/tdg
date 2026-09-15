'use client';

import React, { useState } from 'react';
import { Sliders, Play, Code2, Smartphone, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '@tdgh/ui';

export function CodePreviewSandbox() {
  const [dailyTxCount, setDailyTxCount] = useState(180);
  const [avgBasketZar, setAvgBasketZar] = useState(85);
  const [discountRate, setDiscountRate] = useState(0.8);
  const [isLoadShedding, setIsLoadShedding] = useState(false);

  // Calculations
  const dailyTurnoverZar = dailyTxCount * avgBasketZar;
  const standardBankFeeZar = dailyTurnoverZar * 0.035;
  const kasiPayFeeZar = dailyTurnoverZar * (discountRate / 100);
  const merchantMonthlySavingsZar = (standardBankFeeZar - kasiPayFeeZar) * 26;

  return (
    <div className="w-full bg-white rounded-2xl border border-porcelain-border shadow-sm overflow-hidden space-y-0">
      {/* Header */}
      <div className="p-6 border-b border-porcelain-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-electric-cobalt" />
            <h3 className="text-xl font-bold tracking-tight text-obsidian">
              Live Student Capstone Sandbox: KasiPay Engine
            </h3>
          </div>
          <p className="text-xs text-obsidian-500 font-mono mt-1">
            Real TypeScript code written by Sipho Ndlovu (Cohort 2025). Tweak live runtime variables below.
          </p>
        </div>

        <Badge variant="emerald">Live Hot-Reloading Preview</Badge>
      </div>

      {/* Split-Pane: Left Code Editor, Right Live Runtime Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-porcelain-border">
        {/* Left: Code Editor Pane */}
        <div className="p-6 bg-obsidian-950 font-mono text-xs text-obsidian-100 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-obsidian-400 border-b border-obsidian-800 pb-2">
              <span>src/modules/kasipay/pos-engine.ts</span>
              <span className="text-emerald-400">TypeScript 5.7 &bull; Offline-First</span>
            </div>

            <pre className="text-[11px] leading-relaxed text-obsidian-300 overflow-x-auto select-all">
              <code>{`// Student Capstone: KasiPay Spaza Settlement Engine
import { createHmac } from 'crypto';
import { openIndexedDbQueue } from '@/lib/offline-sync';

export interface SpazaTransaction {
  dailyTxCount: number;      // Current: ${dailyTxCount}
  avgBasketZar: number;      // Current: R${avgBasketZar}
  feeRate: number;           // Current: ${discountRate}%
  offlineBuffer: boolean;    // Load-shedding: ${isLoadShedding ? 'ACTIVE' : 'IDLE'}
}

export async function processSpazaBatch(tx: SpazaTransaction) {
  const grossTurnover = tx.dailyTxCount * tx.avgBasketZar;
  const merchantDiscount = grossTurnover * (tx.feeRate / 100);
  const netSettlement = grossTurnover - merchantDiscount;

  if (tx.offlineBuffer) {
    // Encrypt and buffer to local thermal storage
    await openIndexedDbQueue.enqueue({
      netSettlement,
      status: 'SYNC_PENDING_GRID_RECOVERY'
    });
  }

  return { grossTurnover, merchantDiscount, netSettlement };
}`}</code>
            </pre>
          </div>

          <div className="pt-4 border-t border-obsidian-800 text-[11px] text-obsidian-400 flex items-center justify-between">
            <span>Built by Kraaifontein Codetrepreneurs</span>
            <span className="text-electric-blue">Next.js 15 App Router</span>
          </div>
        </div>

        {/* Right: Interactive Runtime Simulation & Sliders */}
        <div className="p-6 bg-porcelain space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-obsidian-500 font-semibold flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-electric-cobalt" /> Runtime Parameters
              </span>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Simulating Scottsville Spaza
              </span>
            </div>

            {/* Slider 1: Daily Transactions */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-obsidian-600">Daily Customer Transactions:</span>
                <span className="font-bold text-obsidian">{dailyTxCount} swipes/day</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={dailyTxCount}
                onChange={(e) => setDailyTxCount(Number(e.target.value))}
                className="w-full accent-electric-cobalt cursor-pointer"
              />
            </div>

            {/* Slider 2: Average Basket Size */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-obsidian-600">Average Basket Purchase:</span>
                <span className="font-bold text-obsidian">R{avgBasketZar} ZAR</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={avgBasketZar}
                onChange={(e) => setAvgBasketZar(Number(e.target.value))}
                className="w-full accent-electric-cobalt cursor-pointer"
              />
            </div>

            {/* Slider 3: Fee Rate */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-obsidian-600">KasiPay Fee Rate:</span>
                <span className="font-bold text-electric-cobalt">{discountRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={discountRate}
                onChange={(e) => setDiscountRate(Number(e.target.value))}
                className="w-full accent-electric-cobalt cursor-pointer"
              />
            </div>

            {/* Toggle: Load-Shedding Simulation */}
            <div className="pt-2 flex items-center justify-between p-3 bg-white rounded-xl border border-porcelain-border">
              <div className="text-xs">
                <div className="font-semibold text-obsidian">Simulate Municipal Power Outage</div>
                <div className="text-obsidian-500 text-[11px]">Triggers offline IndexedDB queue buffering</div>
              </div>
              <button
                onClick={() => setIsLoadShedding(!isLoadShedding)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  isLoadShedding
                    ? 'bg-rose-600 text-white'
                    : 'bg-porcelain text-obsidian-600 border border-porcelain-border'
                }`}
              >
                {isLoadShedding ? 'OUTAGE ACTIVE' : 'GRID ONLINE'}
              </button>
            </div>
          </div>

          {/* Real-time Reactive Metric Box */}
          <div className="p-4 rounded-xl bg-white border-2 border-electric-cobalt shadow-sm space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-obsidian-500">
              Simulated Spaza Financial Impact
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-[11px] text-obsidian-500 font-mono">Daily Turnover</div>
                <div className="text-lg font-black text-obsidian font-mono">
                  R{dailyTurnoverZar.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-emerald-600 font-mono font-bold">Monthly Spaza Savings</div>
                <div className="text-lg font-black text-emerald-600 font-mono">
                  +R{Math.round(merchantMonthlySavingsZar).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-obsidian-600 pt-2 border-t border-porcelain-border flex items-center justify-between">
              <span>Standard Bank Fee: R{Math.round(standardBankFeeZar)}</span>
              <span className="font-bold text-electric-cobalt">KasiPay Fee: R{Math.round(kasiPayFeeZar)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
