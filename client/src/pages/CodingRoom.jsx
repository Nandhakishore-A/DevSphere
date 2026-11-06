import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import {
  Code2,
  FileCode,
  FolderTree,
  Send,
  Users,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff,
  Radio,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Play,
  Save,
  CheckCircle,
  Copy,
  Terminal,
  Share2,
} from 'lucide-react';

const initialFiles = {
  'Home.tsx': `import React from 'react';
import Navbar from './Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B131E] text-white">
      <Navbar />
      <section className="hero p-8 text-center">
        <h1 className="text-4xl font-extrabold text-emerald-400">
          DevSphere Collaborative Workspace
        </h1>
        <p className="mt-2 text-slate-400">
          Real-time collaborative project workspace for modern teams.
        </p>
      </section>
    </div>
  );
};

export default Home;`,
  'Navbar.tsx': `import React from 'react';

export const Navbar = () => {
  return (
    <nav className="border-b border-slate-800 p-4 flex justify-between items-center">
      <span className="font-bold text-emerald-400">DevSphere</span>
      <div className="flex gap-4 text-xs text-slate-300">
        <span>Workspace</span>
        <span>Projects</span>
      </div>
    </nav>
  );
};`,
  'Product.tsx': `import React from 'react';

export interface ProductProps {
  id: string;
  name: string;
  price: number;
}

export const Product: React.FC<ProductProps> = ({ name, price }) => {
  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900">
      <h3 className="font-bold">{name}</h3>
      <p className="text-emerald-400 font-mono">\${price}</p>
    </div>
  );
};`,
  'App.tsx': `import React from 'react';
import Home from './Home';

export default function App() {
  return <Home />;
}`,
};

export default function CodingRoom() {
  const { id } = useParams();
  const { user } = useAuth();

  const [activeFile, setActiveFile] = useState('Home.tsx');
  const [code, setCode] = useState(initialFiles['Home.tsx']);
  const [isSaved, setIsSaved] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Audio / Video states
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Chat messages
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Nandha (You)', text: 'Hey everyone! 👋 Welcome to DevSphere room.', time: '10:30 AM', color: 'emerald' },
    { id: 2, sender: 'Priya', text: "Looks great! Let's start working on the layout.", time: '10:31 AM', color: 'purple' },
    { id: 3, sender: 'Arun', text: "Sure, I'll set up the navigation components.", time: '10:32 AM', color: 'blue' },
    { id: 4, sender: 'Karthik', text: "I'll work on the responsive styling.", time: '10:34 AM', color: 'amber' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSelectFile = (fileName) => {
    setActiveFile(fileName);
    setCode(initialFiles[fileName] || '// File empty');
    setIsSaved(true);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setShowConsole(true);
    setConsoleOutput([
      `> [DevSphere Runner] Compiling ${activeFile}...`,
      `> TypeScript checks: PASSED (0 errors)`,
      `> Bundling with Vite HMR...`,
      `> [Output]: Rendered <${activeFile.replace('.tsx', '')} /> successfully in 42ms.`,
      `> Server session: Synced with 4 collaborators.`,
    ]);
    setTimeout(() => {
      setIsRunning(false);
      showToast('Code executed cleanly with 0 errors!');
    }, 700);
  };

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Room invite link copied to clipboard!');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: user?.name || 'Nandha (You)',
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        color: 'emerald',
      },
    ]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Room Header */}
        <header className="border-b border-slate-800 bg-[#0F172A] px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Code2 className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Collaborative Room #general</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  main
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  <Radio className="h-3 w-3 animate-pulse" />
                  Live Sync
                </span>
              </div>
            </div>
          </div>

          {/* Active Collaborators & Call Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <span className="h-7 w-7 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-300" title="Nandha (You)">N</span>
                <span className="h-7 w-7 rounded-full bg-purple-500/30 border-2 border-purple-400 flex items-center justify-center text-[10px] font-bold text-purple-300" title="Priya">P</span>
                <span className="h-7 w-7 rounded-full bg-blue-500/30 border-2 border-blue-400 flex items-center justify-center text-[10px] font-bold text-blue-300" title="Arun">A</span>
                <span className="h-7 w-7 rounded-full bg-amber-500/30 border-2 border-amber-400 flex items-center justify-center text-[10px] font-bold text-amber-300" title="Karthik">K</span>
              </div>
              <span className="text-xs text-emerald-400 font-semibold hidden sm:inline">4 online</span>
            </div>

            {/* Invite Button */}
            <button
              onClick={handleCopyInvite}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Invite</span>
            </button>

            {/* Quick AV toolbar */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  showToast(!isMuted ? 'Microphone muted' : 'Microphone unmuted');
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isMuted ? 'bg-rose-500/20 text-rose-400' : 'text-slate-400 hover:text-white'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
              </button>

              <button
                onClick={() => {
                  setIsVideoOn(!isVideoOn);
                  showToast(!isVideoOn ? 'Camera enabled' : 'Camera disabled');
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isVideoOn ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'
                }`}
                title={isVideoOn ? 'Stop Video' : 'Start Video'}
              >
                {isVideoOn ? <Video className="h-3.5 w-3.5" /> : <VideoOff className="h-3.5 w-3.5" />}
              </button>

              <button
                onClick={() => {
                  setIsScreenSharing(!isScreenSharing);
                  showToast(!isScreenSharing ? 'Screen sharing active' : 'Screen sharing stopped');
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isScreenSharing ? 'bg-teal-500/20 text-teal-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Share Screen"
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>
            </div>

            <Link
              to="/"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600/30 text-xs font-bold transition-all cursor-pointer"
            >
              <PhoneOff className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Leave Room</span>
            </Link>
          </div>
        </header>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-16 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-xl backdrop-blur-md animate-in fade-in">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 3-Column Studio Workspace */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden">
          {/* Column 1: File Explorer Tree */}
          <div className="col-span-12 sm:col-span-3 lg:col-span-2 border-r border-slate-800 bg-[#0B131E] p-3 overflow-y-auto space-y-3 hidden sm:block">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <FolderTree className="h-3.5 w-3.5 text-emerald-400" /> Explorer
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <div className="text-slate-500 font-semibold px-2 py-1 flex items-center gap-1">
                <ChevronDown className="h-3 w-3" /> src/components
              </div>

              {Object.keys(initialFiles).map((file) => (
                <button
                  key={file}
                  onClick={() => handleSelectFile(file)}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                    activeFile === file
                      ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <FileCode className={`h-3.5 w-3.5 ${activeFile === file ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span className="truncate">{file}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Code Editor */}
          <div className="col-span-12 sm:col-span-9 lg:col-span-7 flex flex-col bg-[#0F172A] border-r border-slate-800 overflow-hidden">
            {/* Editor Tab Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-t-lg bg-[#0F172A] border-t-2 border-emerald-500 text-xs font-mono font-bold text-white">
                  <FileCode className="h-3.5 w-3.5 text-emerald-400" />
                  {activeFile}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
                >
                  <Play className="h-3 w-3 fill-slate-950" />
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsSaved(true);
                    showToast('File saved to workspace!');
                  }}
                  className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:bg-slate-700 cursor-pointer"
                >
                  <Save className="h-3 w-3" />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Code Textarea with Line Numbers */}
            <div className="flex-1 flex overflow-hidden font-mono text-xs leading-relaxed p-4 bg-[#0B131E]">
              <div className="pr-4 select-none text-slate-600 text-right space-y-1">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              <textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setIsSaved(false);
                }}
                className="flex-1 w-full bg-transparent text-emerald-300 resize-none focus:outline-none font-mono text-xs leading-relaxed selection:bg-emerald-500/30"
                spellCheck={false}
              />
            </div>

            {/* Expandable Live Execution Console */}
            {showConsole && (
              <div className="border-t border-slate-800 bg-slate-950 p-3 font-mono text-[11px] space-y-1 max-h-36 overflow-y-auto">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[10px] text-slate-500 uppercase font-bold">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Terminal className="h-3 w-3" /> Execution Console
                  </span>
                  <button onClick={() => setShowConsole(false)} className="hover:text-white">✕</button>
                </div>
                {consoleOutput.map((line, idx) => (
                  <p key={idx} className={line.includes('PASSED') || line.includes('successfully') ? 'text-emerald-400' : 'text-slate-400'}>
                    {line}
                  </p>
                ))}
              </div>
            )}

            {/* Editor Status Bar */}
            <div className="border-t border-slate-800 bg-slate-950 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> UTF-8
                </span>
                <span>TypeScript React</span>
              </div>
              <button
                onClick={() => setShowConsole(!showConsole)}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Console: {showConsole ? 'Open' : 'Minimized'}
              </button>
            </div>
          </div>

          {/* Column 3: Live Users & Workspace Chat */}
          <div className="col-span-12 lg:col-span-3 flex flex-col bg-[#0F172A] hidden lg:flex overflow-hidden">
            {/* Live Users Header */}
            <div className="p-3 border-b border-slate-800 bg-slate-950/60">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-emerald-400" /> Active Peers (4)
              </span>
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-white font-semibold">Nandha (You)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">Host</span>
                </div>
                <div className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-900/60 text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                    <span>Priya</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Frontend</span>
                </div>
                <div className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-900/60 text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    <span>Arun</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Backend</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Room Chat
              </span>

              {messages.map((m) => (
                <div key={m.id} className="space-y-0.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-emerald-400">{m.sender}</span>
                    <span className="text-slate-500">{m.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-900/70 p-2 rounded-xl border border-slate-800">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950/70">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Send a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-3 pr-10 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-emerald-400 hover:text-emerald-300 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
