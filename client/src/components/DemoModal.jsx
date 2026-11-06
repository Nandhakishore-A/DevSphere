import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Play,
  Pause,
  Code2,
  FolderKanban,
  FolderClosed,
  Users,
  Radio,
  Sparkles,
  ArrowRight,
  Terminal,
  CheckCircle2,
  FileCode,
  Shield,
  Layers,
} from 'lucide-react';

export default function DemoModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('studio');
  const [isPlaying, setIsPlaying] = useState(true);
  const [typedChars, setTypedChars] = useState(280);

  const demoCode = `import React, { useState } from 'react';
import { useCollaboration } from '@devsphere/sync';

export default function RealtimeWorkspace() {
  const { peers, activeChannel } = useCollaboration('devsphere-room-1');
  const [status, setStatus] = useState('Synchronized');

  return (
    <div className="devsphere-studio grid grid-cols-12">
      <header className="p-4 bg-emerald-950/40 border border-emerald-500/30">
        <h1 className="text-xl font-bold text-white">DevSphere Live Studio</h1>
        <p className="text-xs text-emerald-400">● 4 peers editing simultaneously</p>
      </header>
    </div>
  );
}`;

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setTypedChars((prev) => {
        if (prev >= demoCode.length) return 80;
        return prev + 12;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, demoCode.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden glow-subtle">
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
              <Play className="h-4 w-4 fill-slate-950" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                DevSphere Product Walkthrough
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Live Preview
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Explore real-time collaborative coding, agile sprint Kanban, and cloud file management.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Feature Tab Navigation */}
        <div className="px-5 py-2.5 bg-[#0B131E] border-b border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'studio'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              Live Coding Studio
            </button>

            <button
              onClick={() => setActiveTab('kanban')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'kanban'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              <FolderKanban className="h-3.5 w-3.5" />
              Sprint Kanban Board
            </button>

            <button
              onClick={() => setActiveTab('files')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'files'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              <FolderClosed className="h-3.5 w-3.5" />
              Cloud File Manager
            </button>
          </div>

          {activeTab === 'studio' && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlaying ? 'Pause Simulation' : 'Resume Simulation'}</span>
            </button>
          )}
        </div>

        {/* Demo Content Viewports */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#0B131E]">
          {/* TAB 1: Live Coding Studio */}
          {activeTab === 'studio' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-[#0F172A] overflow-hidden">
                {/* Editor Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    <span className="ml-2 font-mono text-xs text-slate-300">Workspace.tsx</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1.5">
                      <span className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-slate-950">N</span>
                      <span className="h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center text-[9px] font-bold text-white">P</span>
                      <span className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-[9px] font-bold text-white">A</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Radio className="h-3 w-3 animate-pulse" /> Live Sync Active
                    </span>
                  </div>
                </div>

                {/* Editor Code Simulation */}
                <div className="p-4 font-mono text-xs text-slate-300 leading-relaxed bg-[#0B131E] min-h-[200px] whitespace-pre-wrap">
                  {demoCode.slice(0, typedChars)}
                  <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse"></span>
                </div>

                {/* Integrated Terminal Stream */}
                <div className="border-t border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-slate-400">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                    <Terminal className="h-3.5 w-3.5" /> DevSphere Real-Time Console
                  </div>
                  <p className="text-slate-500">&gt; WebSocket channel: wss://devsphere-server/rooms/general</p>
                  <p className="text-emerald-400">&gt; [200 OK] Handshake established with 0ms drift</p>
                  <p className="text-teal-300">&gt; Broadcast: user "Nandha" updated cursor in Workspace.tsx:9</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Kanban Sprint Board */}
          {activeTab === 'kanban' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Backlog */}
                <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span>Backlog (2)</span>
                    <span className="h-2 w-2 rounded-full bg-slate-500"></span>
                  </div>
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-3 space-y-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      High Priority
                    </span>
                    <p className="text-xs font-bold text-white">OAuth 2.0 Integration</p>
                    <p className="text-[11px] text-slate-400">Support Google & GitHub login flows with JWT tokens</p>
                  </div>
                </div>

                {/* In Progress */}
                <div className="rounded-2xl border border-emerald-500/30 bg-[#0F172A] p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                    <span>In Progress (1)</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 space-y-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      O(1) Concurrency
                    </span>
                    <p className="text-xs font-bold text-white">Fractional Indexing Algorithm</p>
                    <p className="text-[11px] text-slate-400">Zero re-index latency for high-throughput card moves</p>
                  </div>
                </div>

                {/* Done */}
                <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span>Done (3)</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-3 space-y-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      Database
                    </span>
                    <p className="text-xs font-bold text-white">MongoDB Atlas Multi-Region Cluster</p>
                    <p className="text-[11px] text-slate-400">Connected with TLS encryption & 15s handshake timeout</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Cloud File Manager */}
          {activeTab === 'files' && (
            <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-4 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200">Cloudinary Asset Storage</span>
                <span className="text-[10px] font-mono text-emerald-400">Folder: mern_stack_project_storage/DevSphere</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 text-center">
                  <FileCode className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                  <p className="font-bold text-white">Home.tsx</p>
                  <p className="text-[10px] text-slate-500">6.1 KB</p>
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 text-center">
                  <FileCode className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <p className="font-bold text-white">Navbar.tsx</p>
                  <p className="text-[10px] text-slate-500">4.2 KB</p>
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 text-center">
                  <FileCode className="h-5 w-5 text-teal-400 mx-auto mb-1" />
                  <p className="font-bold text-white">Product.tsx</p>
                  <p className="text-[10px] text-slate-500">5.8 KB</p>
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 text-center">
                  <FileCode className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                  <p className="font-bold text-white">Cart.tsx</p>
                  <p className="text-[10px] text-slate-500">3.4 KB</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="px-5 py-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Ready to experience the real-time collaborative workspace?
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <Link
              to="/register"
              onClick={onClose}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer"
            >
              <span>Start Free Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
