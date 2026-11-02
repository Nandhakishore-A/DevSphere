import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Layers, LogOut, User, FolderKanban, Code2, FolderClosed, Settings } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-800/80 bg-[#0B131E]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-slate-950 font-mono font-extrabold text-base shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              &lt;D&gt;
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Dev<span className="text-emerald-400">Sphere</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-400">
            <Link
              to="/"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              Projects
            </Link>
            <Link
              to="/rooms"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              Rooms
            </Link>
            <Link
              to="/files"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              Files
            </Link>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <Link to="/settings" className="flex items-center gap-3 border-r border-slate-800 pr-4 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-bold text-sm">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors leading-none">
                  {user.name}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">{user.email}</p>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors cursor-pointer"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
