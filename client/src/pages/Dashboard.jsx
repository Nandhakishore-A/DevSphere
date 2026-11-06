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
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { timeAgo } from '../utils/timeago.js';

const workspaceSharedAndCompleted = [
  {
    _id: 'shared_proj_1',
    title: 'Cloud Architecture & Microservices',
    description: 'Kubernetes orchestration, Redis caching layers, and high-throughput ingress controllers.',
    category: 'shared',
    status: 'in-progress',
    progress: 85,
    tags: ['Docker', 'K8s', 'Node.js', 'Redis'],
    members: [
      { name: 'Nandha', initial: 'N', color: 'bg-emerald-500' },
      { name: 'Priya', initial: 'P', color: 'bg-purple-500' },
      { name: 'Arun', initial: 'A', color: 'bg-blue-500' },
    ],
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    isMock: true,
  },
  {
    _id: 'completed_proj_1',
    title: 'Authentication & Security Audit',
    description: 'Completed RFC-compliant JWT session implementation, rate limiting, and 3-tier RBAC.',
    category: 'completed',
    status: 'completed',
    progress: 100,
    tags: ['Security', 'OAuth', 'JWT', 'MongoAtlas'],
    members: [
      { name: 'Nandha', initial: 'N', color: 'bg-emerald-500' },
      { name: 'Priya', initial: 'P', color: 'bg-purple-500' },
    ],
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    isMock: true,
  },
  {
    _id: 'completed_proj_2',
    title: 'Multi-Region MongoDB Cluster Migration',
    description: 'Database connection failover handling with 15s server selection and TLS encryption.',
    category: 'completed',
    status: 'completed',
    progress: 100,
    tags: ['MongoDB', 'Mongoose', 'Database'],
    members: [
      { name: 'Nandha', initial: 'N', color: 'bg-emerald-500' },
      { name: 'Arun', initial: 'A', color: 'bg-blue-500' },
    ],
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    isMock: true,
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectFilter, setProjectFilter] = useState('all'); // all, shared, completed

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

  // Combine database boards with team workspace projects
  const allProjects = [
    ...boards.map((b) => ({
      ...b,
      category: 'my',
      status: 'in-progress',
      progress: 70,
      tags: ['React', 'Node.js', 'MongoDB'],
      members: [
        { name: user?.name || 'Nandha', initial: (user?.name || 'N').charAt(0), color: 'bg-emerald-500' },
        { name: 'Team Member', initial: 'T', color: 'bg-purple-500' },
      ],
      isDbBoard: true,
    })),
    ...workspaceSharedAndCompleted,
  ];

  const filteredProjects = allProjects.filter((p) => {
    if (projectFilter === 'shared') return p.category === 'shared';
    if (projectFilter === 'completed') return p.status === 'completed';
    return true;
  });

  const totalCount = allProjects.length;
  const sharedCount = allProjects.filter((p) => p.category === 'shared').length;
  const completedCount = allProjects.filter((p) => p.status === 'completed').length;

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
                Here's what's happening across your personal, shared, and completed projects today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/rooms"
                className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer"
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

          {/* 4 KPI Metric Cards */}
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
                <p className="text-2xl sm:text-3xl font-extrabold text-white">{totalCount}</p>
                <p className="text-[11px] text-emerald-400 mt-1 font-semibold">{completedCount} completed sprints</p>
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
                <p className="text-2xl sm:text-3xl font-extrabold text-white">4</p>
                <p className="text-[11px] text-teal-400 mt-1 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  4 peers syncing live
                </p>
              </div>
            </div>

            {/* Total Members */}
            <div className="rounded-2xl border border-slate-800/80 bg-[#0F172A]/70 p-5 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Shared Projects</span>
                <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Share2 className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">{sharedCount}</p>
                <p className="text-[11px] text-cyan-400 mt-1 font-semibold">Active team boards</p>
              </div>
            </div>

            {/* Files Uploaded */}
            <div className="rounded-2xl border border-slate-800/80 bg-[#0F172A]/70 p-5 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">CDN Storage Assets</span>
                <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <FolderClosed className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">8</p>
                <p className="text-[11px] text-indigo-400 mt-1 font-semibold">Cloudinary connected</p>
              </div>
            </div>
          </div>

          {/* Recent Projects Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Recent Projects</h2>
                <p className="text-xs text-slate-400">Collaborative workspaces, team shared boards, and completed sprints</p>
              </div>

              {/* Filter Tabs in Dashboard */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-xl p-1">
                  <button
                    onClick={() => setProjectFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      projectFilter === 'all'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({totalCount})
                  </button>
                  <button
                    onClick={() => setProjectFilter('shared')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      projectFilter === 'shared'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Share2 className="h-3 w-3" /> Shared ({sharedCount})
                  </button>
                  <button
                    onClick={() => setProjectFilter('completed')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      projectFilter === 'completed'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="h-3 w-3" /> Completed ({completedCount})
                  </button>
                </div>

                <Link
                  to="/projects"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors px-2 py-1"
                >
                  View all &rarr;
                </Link>
              </div>
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((p) => {
                  const isCompleted = p.status === 'completed';
                  const targetLink = p.isDbBoard ? `/boards/${p._id}` : `/rooms`;
                  const memberCount = p.members?.length || 2;

                  return (
                    <div
                      key={p._id}
                      className="rounded-2xl border border-slate-800/90 bg-[#0F172A]/80 p-5 hover:border-emerald-500/40 hover:bg-[#0F172A] transition-all space-y-4 group flex flex-col justify-between glow-subtle"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <FolderKanban className="h-4 w-4" />
                          </div>

                          <div className="flex items-center gap-2">
                            {isCompleted ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Completed
                              </span>
                            ) : p.category === 'shared' ? (
                              <span className="px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-400 text-[10px] font-bold border border-teal-500/30 flex items-center gap-1">
                                <Share2 className="h-3 w-3" /> Shared
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Active
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <Link to={targetLink}>
                            <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                              {p.title}
                            </h3>
                          </Link>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {p.description || 'DevSphere collaborative workspace & sprint board.'}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span>Sprint Progress</span>
                            <span className={isCompleted ? 'text-emerald-400 font-bold' : 'text-slate-300 font-mono'}>
                              {p.progress || 70}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isCompleted
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                  : 'bg-emerald-500/80'
                              }`}
                              style={{ width: `${p.progress || 70}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(p.tags || ['React', 'Node.js', 'MongoDB']).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1.5">
                            {(p.members || []).map((m, mIdx) => (
                              <span
                                key={mIdx}
                                className={`h-6 w-6 rounded-full border border-slate-900 flex items-center justify-center text-[10px] font-bold text-white ${m.color || 'bg-emerald-600'}`}
                                title={m.name}
                              >
                                {m.initial}
                              </span>
                            ))}
                          </div>
                          <span className="text-[11px] text-slate-500">
                            {memberCount} member{memberCount > 1 ? 's' : ''}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to="/rooms"
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                          >
                            Code
                          </Link>
                          <Link
                            to={targetLink}
                            className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors flex items-center gap-1 cursor-pointer"
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

      {showCreateModal && (
        <CreateBoardModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateBoard}
        />
      )}
    </div>
  );
}
