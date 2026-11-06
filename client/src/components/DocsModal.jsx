import { X, BookOpen, Terminal, Layers, ShieldCheck, Database, Radio } from 'lucide-react';

export default function DocsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden glow-subtle">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">DevSphere Documentation</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed bg-[#0B131E]">
          <div>
            <h3 className="text-sm font-bold text-emerald-400 mb-1 flex items-center gap-2">
              <Layers className="h-4 w-4" /> System Overview
            </h3>
            <p className="text-slate-400">
              DevSphere is an enterprise-grade real-time collaborative workspace engineered with a React 18 frontend, Express &amp; Socket.IO backend, and a multi-region MongoDB Atlas cluster.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
              <span className="font-bold text-white flex items-center gap-1.5 text-xs text-emerald-300">
                <Radio className="h-3.5 w-3.5 text-emerald-400" /> WebSockets &amp; Rooms
              </span>
              <p className="text-[11px] text-slate-400">
                Low-latency bi-directional event broadcast for concurrent code editing, cursor presence, and room chat.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
              <span className="font-bold text-white flex items-center gap-1.5 text-xs text-teal-300">
                <Terminal className="h-3.5 w-3.5 text-teal-400" /> O(1) Fractional Indexing
              </span>
              <p className="text-[11px] text-slate-400">
                Cards reorder in $O(1)$ constant time using fractional midpoints, eliminating database lockouts.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
              <span className="font-bold text-white flex items-center gap-1.5 text-xs text-purple-300">
                <ShieldCheck className="h-3.5 w-3.5 text-purple-400" /> OCC Conflict Recovery
              </span>
              <p className="text-[11px] text-slate-400">
                Optimistic Concurrency Control returns HTTP 409 and prompts users if two updates conflict.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
              <span className="font-bold text-white flex items-center gap-1.5 text-xs text-amber-300">
                <Database className="h-3.5 w-3.5 text-amber-400" /> Cloudinary Asset Storage
              </span>
              <p className="text-[11px] text-slate-400">
                Streamed uploads with automatic asset optimization, secure CDN delivery, and folder isolation.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
