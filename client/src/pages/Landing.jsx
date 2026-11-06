import { useState } from 'react';
import { Link } from 'react-router-dom';
import DemoModal from '../components/DemoModal.jsx';
import DocsModal from '../components/DocsModal.jsx';
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
  Check,
  Zap,
  Globe,
  Database,
} from 'lucide-react';

export default function Landing() {
  const [showDemo, setShowDemo] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [activePreviewFile, setActivePreviewFile] = useState('Home.tsx');

  const previewSnippets = {
    'Home.tsx': `import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="devsphere-grid">
      <Navbar />
      <h1>Real-Time Code Workspace</h1>
    </div>
  );
};
export default Home;`,
    'Navbar.tsx': `import React from 'react';

export const Navbar = () => {
  return (
    <nav className="devsphere-nav flex items-center justify-between">
      <div className="font-bold text-emerald-400">DevSphere</div>
      <div className="peers">4 active editors</div>
    </nav>
  );
};`,
    'Product.tsx': `export interface Product {
  id: string;
  title: string;
  rating: number;
}
export const getActiveProducts = async (): Promise<Product[]> => {
  return api.get('/products');
};`,
    'Cart.tsx': `export const calculateCartTotal = (items: CartItem[]) => {
  return items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
};`,
  };

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white scroll-smooth">
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
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <button
              onClick={() => setShowDocs(true)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Docs
            </button>
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
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 lg:pb-28">
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
                  DevSphere is an enterprise real-time collaborative workspace where engineering teams code in live multi-peer rooms, manage agile Kanban boards with OCC resilience, and store assets in Cloudinary.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    to="/register"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-7 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition-all hover:scale-102 cursor-pointer"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={() => setShowDemo(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer group"
                  >
                    <Play className="h-4 w-4 text-emerald-400 fill-emerald-400 group-hover:scale-110 transition-transform" />
                    Watch Interactive Demo
                  </button>
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
                      <span className="ml-2 font-mono text-[11px] text-slate-400">{activePreviewFile} — DevSphere Workspace</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowDemo(true)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                      >
                        <Radio className="h-3 w-3 animate-pulse" />
                        Live Demo
                      </button>
                    </div>
                  </div>

                  {/* Mock Editor Body */}
                  <div className="p-4 grid grid-cols-12 gap-3 font-mono text-[11px] leading-relaxed">
                    {/* Left Mini Explorer */}
                    <div className="col-span-4 border-r border-slate-800 pr-2 space-y-1.5 text-slate-400">
                      <div className="text-[10px] font-bold uppercase text-slate-500 pb-1">Files</div>
                      {Object.keys(previewSnippets).map((file) => (
                        <button
                          key={file}
                          onClick={() => setActivePreviewFile(file)}
                          className={`w-full text-left truncate px-2 py-1 rounded transition-colors cursor-pointer ${
                            activePreviewFile === file
                              ? 'text-emerald-400 font-bold bg-emerald-500/10'
                              : 'hover:text-slate-200'
                          }`}
                        >
                          {file}
                        </button>
                      ))}
                    </div>

                    {/* Center Code Display */}
                    <div className="col-span-8 pl-1 text-slate-300 font-mono text-[11px] whitespace-pre-wrap overflow-x-auto">
                      {previewSnippets[activePreviewFile]}
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

            {/* Features Grid */}
            <div id="features" className="mt-28 pt-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <h2 className="text-3xl font-extrabold text-white">Engineered for High-Velocity Teams</h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-400">Everything you need to ship world-class software without context-switching.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Pricing Section */}
            <div id="pricing" className="mt-28 pt-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Simple, Transparent Pricing</span>
                <h2 className="text-3xl font-extrabold text-white mt-1">Start Free, Upgrade When Needed</h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-400">Zero credit card required to get started.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Free Tier */}
                <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Developer Community</h3>
                    <p className="text-xs text-slate-400 mt-1">Perfect for individuals and side-projects.</p>
                    <div className="mt-4 mb-6">
                      <span className="text-3xl font-extrabold text-white">$0</span>
                      <span className="text-xs text-slate-500"> / forever</span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Unlimited Live Coding Rooms</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Up to 5 Sprint Boards</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Cloudinary Asset Integration</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Community Discord Support</li>
                    </ul>
                  </div>

                  <Link
                    to="/register"
                    className="mt-8 block text-center py-2.5 rounded-xl border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Get Started Free
                  </Link>
                </div>

                {/* Team Pro Tier */}
                <div className="rounded-2xl border-2 border-emerald-500 bg-[#0F172A] p-6 flex flex-col justify-between relative shadow-xl shadow-emerald-500/10">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full">
                    Most Popular
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Team Pro</h3>
                    <p className="text-xs text-slate-400 mt-1">For growing teams and fast-paced startups.</p>
                    <div className="mt-4 mb-6">
                      <span className="text-3xl font-extrabold text-white">$19</span>
                      <span className="text-xs text-slate-500"> / month</span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Unlimited Collaborative Boards</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> High-Bandwidth Audio/Video Toolbar</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> OCC Conflict Recovery &amp; Audit Logs</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 50 GB Cloud Storage</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Priority Support</li>
                    </ul>
                  </div>

                  <Link
                    to="/register"
                    className="mt-8 block text-center py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold hover:from-emerald-400 hover:to-teal-300 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    Start Free 14-Day Trial
                  </Link>
                </div>

                {/* Enterprise Tier */}
                <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Enterprise</h3>
                    <p className="text-xs text-slate-400 mt-1">For large engineering organizations.</p>
                    <div className="mt-4 mb-6">
                      <span className="text-3xl font-extrabold text-white">Custom</span>
                      <span className="text-xs text-slate-500"> / annual</span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Dedicated WebSocket Cluster</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Single Sign-On (SSO / SAML)</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Custom Domain &amp; Whitelabel</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 99.99% Guaranteed SLA</li>
                    </ul>
                  </div>

                  <a
                    href="mailto:nandhakishore252@gmail.com?subject=DevSphere Enterprise Inquiry"
                    className="mt-8 block text-center py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div id="about" className="mt-28 pt-8">
              <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-[#0F172A] to-slate-900 p-8 sm:p-12">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                    <Sparkles className="h-3.5 w-3.5" /> Built for Modern Developers
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">About DevSphere</h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    DevSphere was designed and crafted by <strong className="text-white">Nandhakishore A</strong> to eliminate friction in collaborative software engineering. By unifying multi-file coding studios, real-time audio/video peer controls, drag-and-drop Kanban boards, and cloud file management into one dark-themed emerald workspace, DevSphere enables developers worldwide to code together and build better products.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
                    <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-mono">React 18</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-teal-400 font-mono">Node.js Express</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 font-mono">Socket.IO</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 font-mono">MongoDB Atlas</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-blue-400 font-mono">Cloudinary CDN</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-purple-400 font-mono">Tailwind CSS</span>
                  </div>
                </div>
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

      {/* Interactive Modals */}
      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
      <DocsModal isOpen={showDocs} onClose={() => setShowDocs(false)} />
    </div>
  );
}
