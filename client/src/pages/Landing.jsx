import { Link } from 'react-router-dom';
import {
  Code2,
  Users,
  ShieldCheck,
  FolderClosed,
  Play,
  ArrowRight,
  Radio,
  Sparkles,
  Layers,
  Terminal,
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#0B131E]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-slate-950 font-mono font-extrabold text-lg shadow-lg shadow-emerald-500/20">
              &lt;D&gt;
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Dev<span className="text-emerald-400">Sphere</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#solutions" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <a href="#docs" className="hover:text-emerald-400 transition-colors">Docs</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all hover:scale-102"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 lg:pb-32">
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Real-Time • Collaborative • Secure
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Code Together. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Build Better.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  DevSphere is a real-time collaborative project workspace where engineering teams can code, plan sprint boards, share files, and build amazing products together.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    to="/register"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-7 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition-all hover:scale-102"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href="#preview"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
                  >
                    <Play className="h-4 w-4 text-emerald-400 fill-emerald-400" />
                    Watch Demo
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Editor Preview Mockup */}
              <div className="lg:col-span-6 relative">
                <div className="rounded-2xl border border-emerald-500/30 bg-[#0F172A] p-2 shadow-2xl shadow-emerald-950/50 glow-emerald">
                  {/* Mock Window Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-950/60 rounded-t-xl">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-500/80"></span>
                      <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
                      <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
                      <span className="ml-2 font-mono text-[11px] text-slate-400">Home.tsx — DevSphere Workspace</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        <Radio className="h-3 w-3 animate-pulse" />
                        Live Collaboration
                      </span>
                    </div>
                  </div>

                  {/* Mock Editor Body */}
                  <div className="p-4 grid grid-cols-12 gap-3 font-mono text-[11px] leading-relaxed">
                    {/* Left Mini Explorer */}
                    <div className="col-span-4 border-r border-slate-800 pr-2 space-y-1.5 text-slate-400">
                      <div className="text-[10px] font-bold uppercase text-slate-500 pb-1">Files</div>
                      <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Terminal className="h-3 w-3" /> Home.tsx
                      </div>
                      <div className="hover:text-slate-200">Navbar.tsx</div>
                      <div className="hover:text-slate-200">Product.tsx</div>
                      <div className="hover:text-slate-200">Cart.tsx</div>
                      <div className="hover:text-slate-200">App.tsx</div>
                    </div>

                    {/* Center Mock Code */}
                    <div className="col-span-8 pl-1 text-slate-300">
                      <span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-emerald-300">'react'</span>;<br/>
                      <span className="text-purple-400">import</span> Navbar <span className="text-purple-400">from</span> <span className="text-emerald-300">'./Navbar'</span>;<br/><br/>
                      <span className="text-blue-400">const</span> Home = () =&gt; &#123;<br/>
                      &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-rose-400">div</span> <span className="text-amber-300">className</span>=<span className="text-emerald-300">"devsphere-grid"</span>&gt;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-rose-400">Navbar</span> /&gt;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-rose-400">h1</span>&gt;Real-Time Code Workspace&lt;/<span className="text-rose-400">h1</span>&gt;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-rose-400">div</span>&gt;<br/>
                      &nbsp;&nbsp;);<br/>
                      &#125;;<br/>
                      <span className="text-purple-400">export default</span> Home;
                    </div>
                  </div>

                  {/* Active Users Footer */}
                  <div className="border-t border-slate-800/80 px-4 py-2.5 bg-slate-950/40 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        <span className="h-6 w-6 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-300">N</span>
                        <span className="h-6 w-6 rounded-full bg-purple-500/30 border border-purple-400 flex items-center justify-center text-[10px] font-bold text-purple-300">P</span>
                        <span className="h-6 w-6 rounded-full bg-blue-500/30 border border-blue-400 flex items-center justify-center text-[10px] font-bold text-blue-300">A</span>
                        <span className="h-6 w-6 rounded-full bg-amber-500/30 border border-amber-400 flex items-center justify-center text-[10px] font-bold text-amber-300">K</span>
                      </div>
                      <span className="text-slate-400">4 active peers syncing</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[10px]">O(1) OCC Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Feature Cards */}
            <div id="features" className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 hover:border-emerald-500/40 hover:bg-slate-900/70 transition-all group">
                <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                  <Radio className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Real-Time Collaboration</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sub-50ms synchronized WebSocket workspaces with room-based broadcast and conflict resolution.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 hover:border-emerald-500/40 hover:bg-slate-900/70 transition-all group">
                <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Multiple Languages</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Full syntax support for JavaScript, TypeScript, Python, HTML/CSS, React, and Markdown.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 hover:border-emerald-500/40 hover:bg-slate-900/70 transition-all group">
                <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Secure &amp; Private</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  3-tier RBAC (Owner, Member, Viewer) with RFC-compliant JWT session security and password guards.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 hover:border-emerald-500/40 hover:bg-slate-900/70 transition-all group">
                <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                  <FolderClosed className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">File &amp; Project Management</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cloudinary CDN asset storage, drag-and-drop Kanban sprint tracking, and cursor activity audit trails.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-emerald-400 font-bold">&lt;D&gt;</span>
            <span className="text-slate-300 font-bold">DevSphere</span>
            <span>— Code Together. Collaborate Smarter. Build Better.</span>
          </div>
          <div>
            Built by <span className="text-slate-300 font-semibold">Nandhakishore A</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
