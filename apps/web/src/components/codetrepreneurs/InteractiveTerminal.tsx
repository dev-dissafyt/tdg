'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check } from 'lucide-react';

interface TerminalLine {
  type: 'cmd' | 'output' | 'info' | 'success';
  text: string;
}

const SCRIPTED_LOOP = [
  { cmd: 'tdgh init --fellowship "Codetrepreneurs 2026"', delay: 1200 },
  { out: '✓ Initializing Kraaifontein software engineering runtime environment...', delay: 600 },
  { out: '✓ Installed: TypeScript, Next.js 15, PostgreSQL, Docker, Tailwind CSS', delay: 800 },
  { cmd: 'git checkout -b feature/community-empowerment', delay: 1400 },
  { out: 'Switched to a new branch "feature/community-empowerment"', delay: 600 },
  { cmd: 'tdgh build --future --impact="Scottsville"', delay: 1600 },
  { out: 'Compiling 12-month syllabus: Design Thinking → APIs → Lean Startup...', delay: 800 },
  { out: 'Bundling capstones: KasiPay POS, CivicAlert SA, AgriPod Sensors', delay: 900 },
  { cmd: 'git commit -m "launched MVP: transformed job seeker into job creator"', delay: 1500 },
  { out: '[feature/community-empowerment 8f92a1c] launched MVP: transformed job seeker into job creator', delay: 700 },
  { out: ' 12 files changed, 480 insertions(+), 0 deletions(-)', delay: 500 },
  { out: '🚀 Deployment successful: live at https://kasipay.dailygrindhub.co.za', delay: 2000 },
];

export function InteractiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'info', text: 'The Daily Grind Hub [Version 2.6.0-scottsville]' },
    { type: 'info', text: 'Type a command or watch automated live compile cycle below.\n' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-typing animation loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let step = 0;

    const runStep = () => {
      if (step >= SCRIPTED_LOOP.length) {
        timeoutId = setTimeout(() => {
          setLines((prev) => [
            ...prev,
            { type: 'info', text: '\n--- Cycle complete. Restarting automated dev terminal ---' },
          ]);
          step = 0;
          runStep();
        }, 4000);
        return;
      }

      const current = SCRIPTED_LOOP[step];
      if ('cmd' in current && current.cmd) {
        setLines((prev) => [...prev, { type: 'cmd', text: current.cmd! }]);
      } else if ('out' in current && current.out) {
        const isSuccess = current.out.includes('✓') || current.out.includes('🚀');
        setLines((prev) => [
          ...prev,
          { type: isSuccess ? 'success' : 'output', text: current.out! },
        ]);
      }

      step++;
      timeoutId = setTimeout(runStep, current.delay || 1000);
    };

    timeoutId = setTimeout(runStep, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleManualCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const trimmed = inputVal.trim();
    setLines((prev) => [...prev, { type: 'cmd', text: trimmed }]);

    if (trimmed === 'help') {
      setLines((prev) => [
        ...prev,
        { type: 'output', text: 'Available commands: help, syllabus, stats, apply, clear' },
      ]);
    } else if (trimmed === 'syllabus') {
      setLines((prev) => [
        ...prev,
        { type: 'output', text: 'Syllabus: M1: UI/UX & Web Foundations | M2: React & Next.js | M3: Cloud & Databases | M4: Venture Pitch' },
      ]);
    } else if (trimmed === 'stats') {
      setLines((prev) => [
        ...prev,
        { type: 'output', text: 'Impact: 40+ Coders Trained | 89% Placement Rate | 6 Registered Startups in Kraaifontein' },
      ]);
    } else if (trimmed === 'apply') {
      setLines((prev) => [
        ...prev,
        { type: 'success', text: 'Navigating to application portal... or visit /portal/applications/new' },
      ]);
    } else if (trimmed === 'clear') {
      setLines([{ type: 'info', text: 'Terminal cleared.' }]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: 'output', text: `zsh: command not found: ${trimmed}. Type "help" for valid options.` },
      ]);
    }

    setInputVal('');
  };

  const copyLog = () => {
    const raw = lines.map((l) => (l.type === 'cmd' ? `$ ${l.text}` : l.text)).join('\n');
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-obsidian-950 border border-obsidian-800 shadow-2xl font-mono text-xs text-obsidian-100 flex flex-col">
      {/* Terminal Titlebar */}
      <div className="bg-obsidian-900 px-4 py-3 border-b border-obsidian-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-obsidian-400 text-[11px] font-medium tracking-wide">
            tdgh-fellowship@scottsville: ~/codetrepreneurs-2026
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyLog}
            className="flex items-center gap-1 text-[11px] text-obsidian-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <span className="text-[10px] bg-electric-cobalt/20 text-electric-blue border border-electric-cobalt/40 px-2 py-0.5 rounded">
            LIVE PSEUDO-SHELL
          </span>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="p-4 sm:p-6 space-y-2.5 h-[340px] overflow-y-auto font-mono text-[12px] leading-relaxed select-text">
        {lines.map((line, idx) => {
          if (line.type === 'cmd') {
            return (
              <div key={idx} className="flex items-center gap-2 text-white">
                <span className="text-electric-blue font-bold">tdgh@kraai:~$</span>
                <span className="text-white font-semibold">{line.text}</span>
              </div>
            );
          }
          if (line.type === 'success') {
            return (
              <div key={idx} className="text-emerald-400 pl-4 border-l border-emerald-500/30">
                {line.text}
              </div>
            );
          }
          if (line.type === 'info') {
            return (
              <div key={idx} className="text-obsidian-400">
                {line.text}
              </div>
            );
          }
          return (
            <div key={idx} className="text-obsidian-300 pl-4">
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Command Input Form */}
      <form
        onSubmit={handleManualCommand}
        className="p-3 bg-obsidian-900 border-t border-obsidian-800 flex items-center gap-2"
      >
        <span className="text-electric-blue font-bold text-xs">tdgh@kraai:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Try typing 'help', 'syllabus', or 'stats'..."
          className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-obsidian-500"
        />
        <button
          type="submit"
          className="px-2.5 py-1 rounded bg-obsidian-800 hover:bg-electric-cobalt text-white text-[11px] font-mono transition-colors"
        >
          Send &crarr;
        </button>
      </form>
    </div>
  );
}
