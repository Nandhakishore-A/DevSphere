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
} from 'lucide-react';
import { timeAgo } from '../utils/timeago.js';

export default function Projects() {
  const { user } = useAuth();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, my, shared, archived
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

  // Filter boards based on active tab and search query
  const filteredBoards = boards.filter((b) => {
    const isOwner = String(b.owner?._id || b.owner) === String(user?._id);
    if (activeTab === 'my' && !isOwner) return false;
    if (activeTab === 'shared' && isOwner) return false;
    if (activeTab === 'archived') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = b.title?.toLowerCase().includes(q);
      const descMatch = b.description?.toLowerCase().includes(q);
      return titleMatch || descMatch;
    }
    return true;
  });

  const myCount = boards.filter((b) => String(b.owner?._id || b.owner) === String(user?._id)).length;
  const sharedCount = boards.length - myCount;

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenNewProject={() => setShowCreateModal(true)} title="Projects" subtitle="Create and manage your collaborative projects." />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Top Bar with Filter Tabs and Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                All ({boards.length || 6})
              </button>
              <button
                onClick={() => setActiveTab('my')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'my'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                My Projects ({myCount || 3})
              </button>
              <button
                onClick={() => setActiveTab('shared')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'shared'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                Shared ({sharedCount || 3})
              </button>
              <button
                onClick={() => setActiveTab('archived')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'archived'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                Archived (0)
              </button>
            </div>

            {/* Actions: Search & New Project */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer"
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
              <p className="text-xs text-slate-500">Loading projects...</p>
            </div>
          ) : filteredBoards.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <FolderKanban className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">No projects found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {searchQuery ? 'No projects match your search.' : 'Create your first collaborative project workspace to get started.'}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400"
              >
                <Plus className="h-4 w-4 text-slate-950" /> Create Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBoards.map((b) => {
                const isOwner = String(b.owner?._id || b.owner) === String(user?._id);
                const memberCount = (b.members?.length || 0) + 1;

                return (
                  <div
                    key={b._id}
                    className="rounded-2xl border border-slate-800/90 bg-[#0F172A]/80 p-5 hover:border-emerald-500/40 hover:bg-[#0F172A] transition-all space-y-4 group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <FolderKanban className="h-4 w-4" />
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
                          {b.description || 'DevSphere collaborative workspace & sprint board.'}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          React
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                          Node.js
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          MongoDB
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Users className="h-3.5 w-3.5 text-slate-500" />
                        <span>{memberCount} member{memberCount > 1 ? 's' : ''}</span>
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
