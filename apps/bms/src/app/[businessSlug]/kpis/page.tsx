'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { tdghDb } from '@tdgh/db';
import { BmsKpis } from '@tdgh/types';
import { Badge, Button, Input } from '@tdgh/ui';
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Users,
  PieChart,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export default function BmsKpisPage() {
  const params = useParams();
  const businessSlug = (params?.businessSlug as string) || 'kasipay';

  const [kpis, setKpis] = useState<BmsKpis>(tdghDb.getBmsKpis(businessSlug));
  const [cashOnHand, setCashOnHand] = useState(kpis.cashOnHandZar);
  const [monthlyBurn, setMonthlyBurn] = useState(kpis.monthlyBurnZar);
  const [monthlyRevenue, setMonthlyRevenue] = useState(kpis.monthlyRecurringRevenueZar);

  // Dynamic calculation
  const calculatedRunway =
    monthlyBurn > monthlyRevenue
      ? (cashOnHand / (monthlyBurn - monthlyRevenue)).toFixed(1)
      : 'Infinite / Cash Flow Positive';

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = tdghDb.updateBmsKpis(businessSlug, {
      cashOnHandZar: cashOnHand,
      monthlyBurnZar: monthlyBurn,
      monthlyRecurringRevenueZar: monthlyRevenue,
      runwayMonths: Number(calculatedRunway) || 12,
    });
    setKpis({ ...updated });
    alert('Venture unit economics updated and synced to TDGH investment advisory queue!');
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="purple">Venture Telemetry & Financial Runway</Badge>
            <span className="text-xs font-mono text-obsidian-500 uppercase">
              Unit Economics & Cash Flow Modeling
            </span>
          </div>
          <h1 className="text-2xl font-black text-obsidian tracking-tight mt-1">
            Financial Runway & Growth KPIs
          </h1>
        </div>
      </div>

      {/* 4 Core Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-obsidian-500 font-semibold">
            Cash On Hand (Bank Balance)
          </span>
          <div className="text-3xl font-black font-mono text-obsidian">
            R{cashOnHand.toLocaleString()}
          </div>
          <div className="text-[11px] font-mono text-obsidian-400">
            FNB Business Cheque &bull; Verified SARS Pin
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-rose-600 font-semibold">
            Monthly Net Burn Rate
          </span>
          <div className="text-3xl font-black font-mono text-rose-600">
            R{monthlyBurn.toLocaleString()}{' '}
            <span className="text-xs font-normal text-obsidian-500">/ mo</span>
          </div>
          <div className="text-[11px] font-mono text-obsidian-400">
            Hardware fab, SIM data, stipends
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-purple-600 p-6 shadow-md space-y-2 relative">
          <div className="absolute -top-2.5 right-4 bg-purple-600 text-white text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold">
            Critical Metric
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-obsidian-500 font-semibold">
            Estimated Runway
          </span>
          <div className="text-3xl font-black font-mono text-purple-700">
            {calculatedRunway}{' '}
            {calculatedRunway !== 'Infinite / Cash Flow Positive' && (
              <span className="text-xs font-normal text-obsidian-500">Months</span>
            )}
          </div>
          <div className="text-[11px] font-mono text-purple-600 font-semibold">
            Target: Extend past 9 months before Demo Day
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold">
            Monthly Recurring Revenue (MRR)
          </span>
          <div className="text-3xl font-black font-mono text-emerald-600">
            R{monthlyRevenue.toLocaleString()}{' '}
            <span className="text-xs font-normal text-obsidian-500">/ mo</span>
          </div>
          <div className="text-[11px] font-mono text-obsidian-400">
            Across 26 Active Spaza Terminals
          </div>
        </div>
      </div>

      {/* Interactive Simulation & Adjustment Console */}
      <div className="bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-obsidian tracking-tight">
            Adjust Financial Projections & Scenario Modeling
          </h3>
          <p className="text-xs font-mono text-obsidian-500 mt-0.5">
            Test impact of new merchant acquisitions or seed grant injections.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold uppercase text-obsidian">
              Cash on Hand (ZAR)
            </label>
            <Input
              type="number"
              value={cashOnHand}
              onChange={(e) => setCashOnHand(Number(e.target.value))}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold uppercase text-obsidian">
              Monthly Operational Burn (ZAR)
            </label>
            <Input
              type="number"
              value={monthlyBurn}
              onChange={(e) => setMonthlyBurn(Number(e.target.value))}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold uppercase text-obsidian">
              Monthly Recurring Revenue (ZAR)
            </label>
            <Input
              type="number"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
            />
          </div>

          <div className="sm:col-span-3 flex justify-end">
            <Button type="submit" variant="primary" size="md">
              Save & Recalculate Runway &rarr;
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
