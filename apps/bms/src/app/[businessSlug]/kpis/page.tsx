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
  ExternalLink,
  RefreshCw,
  Building,
  Receipt,
  FileSpreadsheet,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export default function BmsKpisPage() {
  const params = useParams();
  const businessSlug = (params?.businessSlug as string) || 'kasipay';

  const [kpis, setKpis] = useState<BmsKpis>(() => tdghDb.getBmsKpis(businessSlug));
  const [cashOnHand, setCashOnHand] = useState(kpis.cashOnHandZar);
  const [monthlyBurn, setMonthlyBurn] = useState(kpis.monthlyBurnZar);
  const [monthlyRevenue, setMonthlyRevenue] = useState(kpis.monthlyRecurringRevenueZar);
  const [isSyncing, setIsSyncing] = useState(false);
  const [bannerMsg, setBannerMsg] = useState<string | null>(null);

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
    triggerBanner('Venture unit economics updated and synced to TDGH investment advisory queue!');
  };

  const handleSyncAccounting = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const refreshed = tdghDb.syncBmsAccounting(businessSlug);
      setKpis({ ...refreshed });
      setCashOnHand(refreshed.cashOnHandZar);
      setIsSyncing(false);
      triggerBanner('Real-time ledger synced with Sage Business Cloud Accounting & FNB Corporate Feed!');
    }, 700);
  };

  const triggerBanner = (msg: string) => {
    setBannerMsg(msg);
    setTimeout(() => setBannerMsg(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* 1. DIRECT ACCOUNTING SYSTEM INTEGRATION HEADER BAR */}
      <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Accounting Connected: {kpis.accountingProvider || 'Sage Business Cloud'}
              </span>
              <span className="text-xs font-mono text-obsidian-400 uppercase">
                SARS VAT & CIPC Compliant General Ledger
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-obsidian tracking-tight mt-1">
              Financial Runway & Unit Economics
            </h1>
            <p className="text-xs font-mono text-obsidian-500 mt-0.5">
              Fed directly by verified bank feeds and accounting journals &bull; Last synchronized:{' '}
              {kpis.lastAccountingSync ? new Date(kpis.lastAccountingSync).toLocaleTimeString() : 'Just now'}
            </p>
          </div>

          {/* Primary Action: Direct Link to Accounting System */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={kpis.accountingPortalUrl || 'https://accounting.sageone.co.za'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-mono font-bold transition-all shadow-tactile group"
              title="Open Sage Cloud Accounting in new tab"
            >
              <span>Launch Cloud Accounting</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <Button
              onClick={handleSyncAccounting}
              disabled={isSyncing}
              variant="secondary"
              size="sm"
              className="font-mono text-xs font-semibold gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-purple-700 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Reconciling Feeds...' : 'Sync Bank Feeds'}</span>
            </Button>
          </div>
        </div>

        {/* Live Reconciled Bank & Working Capital Ledger Bar */}
        <div className="pt-4 border-t border-porcelain-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="space-y-0.5">
            <span className="text-obsidian-400 text-[10px] uppercase">Bank Account Feed</span>
            <div className="font-bold text-obsidian truncate">
              {kpis.bankAccountName || 'FNB Business Cheque'}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-obsidian-400 text-[10px] uppercase">Reconciled Cash Balance</span>
            <div className="font-bold text-purple-700 truncate">
              R{(kpis.reconciledLedgerBalanceZar || cashOnHand).toLocaleString()}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-obsidian-400 text-[10px] uppercase">Trade Receivables (Debtors)</span>
            <div className="font-bold text-emerald-700 truncate">
              R{(kpis.accountsReceivableZar || 12600).toLocaleString()}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-obsidian-400 text-[10px] uppercase">Trade Payables (Creditors)</span>
            <div className="font-bold text-rose-600 truncate">
              R{(kpis.accountsPayableZar || 8400).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {bannerMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{bannerMsg}</span>
        </div>
      )}

      {/* 2. CORE FINANCIAL TELEMETRY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-obsidian-500 font-semibold">
              Cash On Hand (Bank Feed)
            </span>
            <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
              Synced
            </span>
          </div>
          <div className="text-3xl font-black font-mono text-obsidian">
            R{cashOnHand.toLocaleString()}
          </div>
          <div className="text-[11px] font-mono text-obsidian-400">
            FNB Business Cheque &bull; Verified SARS Pin
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-600 font-semibold">
              Monthly Net Burn Rate
            </span>
            <span className="text-[10px] font-mono text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
              Sage Ledger
            </span>
          </div>
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
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold">
              Monthly Recurring Revenue (MRR)
            </span>
            <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
              26 Merchants
            </span>
          </div>
          <div className="text-3xl font-black font-mono text-emerald-600">
            R{monthlyRevenue.toLocaleString()}{' '}
            <span className="text-xs font-normal text-obsidian-500">/ mo</span>
          </div>
          <div className="text-[11px] font-mono text-obsidian-400">
            Invoiced automatically through Sage
          </div>
        </div>
      </div>

      {/* 3. DIRECT ACCOUNTING QUICK ACTIONS & COMPLIANCE PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-obsidian">
            <Receipt className="w-4 h-4 text-purple-700" />
            <h3 className="text-sm font-bold font-mono uppercase">SARS VAT & eFiling</h3>
          </div>
          <p className="text-xs text-obsidian-600 leading-relaxed">
            Reconciled tax reports for VAT201 and Provisional Tax (IRP6) are maintained continuously inside Sage Business Cloud.
          </p>
          <a
            href="https://sarsefiling.co.za"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-700 hover:text-purple-900 font-semibold"
          >
            <span>SARS eFiling Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-obsidian">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold font-mono uppercase">Audited Management Accounts</h3>
          </div>
          <p className="text-xs text-obsidian-600 leading-relaxed">
            Generate monthly income statements, balance sheets, and trial balances formatted for seed angel investors and banks.
          </p>
          <button
            onClick={() => alert('Generating 3-statement financial model export from Sage Ledger...')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
          >
            <span>Export Financial Model (XLSX/PDF) &rarr;</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-porcelain-border p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-obsidian">
            <Building className="w-4 h-4 text-electric-cobalt" />
            <h3 className="text-sm font-bold font-mono uppercase">TDGH Incubator Ledger</h3>
          </div>
          <p className="text-xs text-obsidian-600 leading-relaxed">
            Synchronizes with TDGH program finance for milestone stipend disbursements and FabLab 3D printing equipment subsidies.
          </p>
          <span className="inline-block text-[11px] font-mono text-electric-cobalt font-semibold">
            Status: Fully Reconciled & Approved
          </span>
        </div>
      </div>

      {/* 4. SCENARIO MODELING & ADJUSTMENT CONSOLE */}
      <div className="bg-white rounded-3xl border border-porcelain-border p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-obsidian tracking-tight">
            Adjust Financial Projections & Growth Scenario Modeling
          </h3>
          <p className="text-xs font-mono text-obsidian-500 mt-0.5">
            Test the runway impact of new merchant acquisitions or seed grant injections.
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
