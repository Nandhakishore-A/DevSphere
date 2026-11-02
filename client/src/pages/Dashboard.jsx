import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import CreateBoardModal from '../components/CreateBoardModal.jsx';
import {
  FolderKanban,
  Code2,
  Users,
  FolderClosed,
  ArrowUpRight,
  Plus,
  Clock,
  Sparkles,
  Lock,
  Globe,
} from 'lucide-react';
import { timeAgo } from '../utils/timeago.js';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/boards');
      setBoards(data.boards || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (newBoardData) => {
    const { data } = await api.post('/boards', newBoardData);
    setBoards([data.board, ...boards]);
    setShowCreateModal(false);
  };

  // Pre-configured starter tags for dynamic display matching the design board
  const sampleTags = ['React', 'Node.js', 'MongoDB', 'Tailwind', 'Python', 'Flask', 'Next.js'];

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenNewProject={() => setShowCreateModal(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-[#0F172A] to-slate-900/90 border border-slate-800/80 rounded-2xl p-6 glow-subtle">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                DevSphere Workspace v1.0
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Welcome back, {user?.name || 'Developer'}! 👋
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Here's what's happening with your collaborative workspace today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/rooms"
                className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 transition-all"
              >
                <Code2 className="h-4 w-4" />
                Live Coding Room
              </Link>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4 text-slate-950" />
                Create Project
              </button>
            </div>
          </div>

          {/* 4 KPI Metric Cards (Matching design board) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Total Projects */}
            <div className="rounded-2xl border border-slate-800/80 bg-[#0F172A]/70 p-5 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Total Projects</span>
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FolderKanban className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">
                  {boards.length > 0 ? boards.length : '12'}
                </p>
                <p className="text-[11px] text-emerald-400 mt-1 font-semibold">+2 this week</p>
              </div>
            </div>

            {/* Active Rooms */}
            <div className="rounded-2xl border border-slate-800/80 bg-[#0F172A]/70 p-5 hover:border-teal-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Active Rooms</span>
                <div className="h-9 w-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Code2 className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">5</p>
                <p className="text-[11px] text-teal-400 mt-1 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  1 online
                </p>
              </div>
            </div>

            {/* Total Members */}
            <div className="rounded-2xl border border-slate-800/80 bg-[#0F172A]/70 p-5 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Total Members</span>
                <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">18</p>
                <p className="text-[11px] text-cyan-400 mt-1 font-semibold">+4 this month</p>
              </div>
            </div>

            {/* Files Uploaded */}
            <div className="rounded-2xl border border-slate-800/80 bg-[#0F172A]/70 p-5 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Files Uploaded</span>
                <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <FolderClosed className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">42</p>
                <p className="text-[11px] text-indigo-400 mt-1 font-semibold">+12 this week</p>
              </div>
            </div>
          </div>

          {/* Recent Projects Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Recent Projects</h2>
                <p className="text-xs text-slate-400">Collaborative workspaces and sprint boards</p>
              </div>
              <Link
                to="/projects"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
              >
                View all &rarr;
              </Link>
            </div>

            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-400">
                {error}
              </div>
            )}

            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                <p className="text-xs text-slate-500">Loading collaborative projects...</p>
              </div>
            ) : boards.length === 0 ? (
              /* Starter / Empty State Cards */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Seed Template 1: E-Commerce Platform */}
                <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/80 p-5 hover:border-emerald-500/40 transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <FolderKanban className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Lock className="h-3 w-3 text-slate-500" /> Private
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">Updated 2h ago</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">E-Commerce Platform</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      High-concurrency online storefront with real-time cart synchronization and checkout.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">React</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">Node.js</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">MongoDB</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex -space-x-1.5">
                      <span className="h-6 w-6 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-300">N</span>
                      <span className="h-6 w-6 rounded-full bg-purple-500/30 border border-purple-400 flex items-center justify-center text-[10px] font-bold text-purple-300">P</span>
                      <span className="h-6 w-6 rounded-full bg-blue-500/30 border border-blue-400 flex items-center justify-center text-[10px] font-bold text-blue-300">A</span>
                      <span className="h-6 w-6 rounded-full bg-amber-500/30 border border-amber-400 flex items-center justify-center text-[10px] font-bold text-amber-300">K</span>
                    </div>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                    >
                      Initialize Board <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Seed Template 2: AI Chat Application */}
                <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/80 p-5 hover:border-teal-500/40 transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
                        <Code2 className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Globe className="h-3 w-3 text-slate-500" /> Public
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">Updated 5h ago</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">AI Chat Application</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      Real-time generative AI conversational assistant with streaming responses and vector search.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Python</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Flask</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">OpenAI</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex -space-x-1.5">
                      <span className="h-6 w-6 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-300">N</span>
                      <span className="h-6 w-6 rounded-full bg-blue-500/30 border border-blue-400 flex items-center justify-center text-[10px] font-bold text-blue-300">A</span>
                    </div>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
                    >
                      Initialize Board <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Seed Template 3: Portfolio Website */}
                <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/80 p-5 hover:border-cyan-500/40 transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <FolderClosed className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Lock className="h-3 w-3 text-slate-500" /> Private
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">Updated 1d ago</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">Portfolio Website</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      Interactive 3D developer showcase with high performance, animations, and Vercel edge deployment.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Next.js</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Tailwind</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Vercel</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex -space-x-1.5">
                      <span className="h-6 w-6 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-300">N</span>
                    </div>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      Initialize Board <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Actual User Projects Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {boards.map((b, idx) => {
                  const isOwner = String(b.owner?._id || b.owner) === String(user?._id);
                  const memberCount = (b.members?.length || 0) + 1;
                  const tags = [
                    sampleTags[idx % sampleTags.length],
                    sampleTags[(idx + 1) % sampleTags.length],
                    sampleTags[(idx + 2) % sampleTags.length],
                  ];

                  return (
                    <div
                      key={b._id}
                      className="rounded-2xl border border-slate-800/90 bg-[#0F172A]/80 p-5 hover:border-emerald-500/40 hover:bg-[#0F172A] transition-all space-y-4 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                            <FolderKanban className="h-4 w-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                            {isOwner ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]">
                                Owner
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                                Member
                              </span>
                            )}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {timeAgo(b.updatedAt)}
                        </span>
                      </div>

                      <div>
                        <Link to={`/boards/${b._id}`}>
                          <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                            {b.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {b.description || 'Sprint backlog, development board, and team collaboration.'}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800/90 text-slate-300 border border-slate-700/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Users className="h-3.5 w-3.5 text-slate-500" />
                          <span>{memberCount} collaborator{memberCount > 1 ? 's' : ''}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to={`/rooms/${b._id}`}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          >
                            Code
                          </Link>
                          <Link
                            to={`/boards/${b._id}`}
                            className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors flex items-center gap-1"
                          >
                            Board <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create Board Modal */}
      {showCreateModal && (
        <CreateBoardModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateBoard}
        />
      )}
    </div>
  );
}
