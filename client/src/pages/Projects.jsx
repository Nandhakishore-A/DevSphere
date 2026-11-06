import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import CreateBoardModal from '../components/CreateBoardModal.jsx';
import {
  FolderKanban,
  Code2,
  Users,
  Search,
  Plus,
  Clock,
  Lock,
  Globe,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Sparkles,
  Share2,
} from 'lucide-react';
import { timeAgo } from '../utils/timeago.js';

// Default team workspace projects for shared and completed visibility
const defaultWorkspaceProjects = [
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
    _id: 'shared_proj_2',
    title: 'Mobile React Native App',
    description: 'Cross-platform mobile workspace client with push notifications and offline caching.',
    category: 'shared',
    status: 'in-progress',
    progress: 60,
    tags: ['React Native', 'TypeScript', 'Tailwind'],
    members: [
      { name: 'Nandha', initial: 'N', color: 'bg-emerald-500' },
      { name: 'Karthik', initial: 'K', color: 'bg-amber-500' },
    ],
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
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

export default function Projects() {
  const { user } = useAuth();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, my, shared, completed
  const [searchQuery, setSearchQuery] = useState('');
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

  // Merge real database boards with workspace shared and completed projects
  const allWorkspaceProjects = [
    ...boards.map((b) => ({
      ...b,
      category: 'my',
      status: b.isCompleted ? 'completed' : 'in-progress',
      progress: b.isCompleted ? 100 : 70,
      tags: ['React', 'Node.js', 'MongoDB'],
      members: [
        { name: user?.name || 'Nandha', initial: (user?.name || 'N').charAt(0), color: 'bg-emerald-500' },
        { name: 'Team Member', initial: 'T', color: 'bg-purple-500' },
      ],
      isDbBoard: true,
    })),
    ...defaultWorkspaceProjects,
  ];

  // Filtering logic
  const filteredProjects = allWorkspaceProjects.filter((p) => {
    if (activeTab === 'my') {
      const isOwner = p.isDbBoard || p.category === 'my';
      if (!isOwner) return false;
    }
    if (activeTab === 'shared') {
      if (p.category !== 'shared') return false;
    }
    if (activeTab === 'completed') {
      if (p.status !== 'completed' && !p.isCompleted) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = p.title?.toLowerCase().includes(q);
      const descMatch = p.description?.toLowerCase().includes(q);
      return titleMatch || descMatch;
    }
    return true;
  });

  const totalCount = allWorkspaceProjects.length;
  const myCount = allWorkspaceProjects.filter((p) => p.isDbBoard || p.category === 'my').length;
  const sharedCount = allWorkspaceProjects.filter((p) => p.category === 'shared').length;
  const completedCount = allWorkspaceProjects.filter((p) => p.status === 'completed' || p.isCompleted).length;

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenNewProject={() => setShowCreateModal(true)}
          title="Projects"
          subtitle="Manage your personal boards, shared team workspaces, and completed sprints."
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Top Bar with Filter Tabs and Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                All Projects ({totalCount})
              </button>
              <button
                onClick={() => setActiveTab('my')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'my'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                My Projects ({myCount})
              </button>
              <button
                onClick={() => setActiveTab('shared')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'shared'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Share2 className="h-3 w-3" />
                Shared Projects ({sharedCount})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'completed'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <CheckCircle2 className="h-3 w-3" />
                Completed ({completedCount})
              </button>
            </div>

            {/* Actions: Search & New Project */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search projects by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="h-4 w-4 text-slate-950" />
                <span>New Project</span>
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
              <p className="text-xs text-slate-500">Loading collaborative projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <FolderKanban className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">No projects found in this category</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {searchQuery
                  ? 'No projects match your search.'
                  : 'Try switching tabs or creating a new project.'}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 cursor-pointer"
              >
                <Plus className="h-4 w-4 text-slate-950" /> Create Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((p) => {
                const isCompleted = p.status === 'completed';
                const memberCount = p.members?.length || 2;
                const targetLink = p.isDbBoard ? `/boards/${p._id}` : `/rooms`;

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
                      {/* Member Avatars */}
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
