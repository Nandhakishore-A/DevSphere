import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  FolderClosed,
  BarChart3,
  Settings,
  LogOut,
  Radio,
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Rooms', path: '/rooms', icon: Code2, badge: 'Live' },
    { name: 'Files', path: '/files', icon: FolderClosed },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800/80 bg-[#0B131E] flex flex-col justify-between hidden md:flex h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 pb-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <span className="font-mono font-extrabold text-lg text-slate-950">&lt;D&gt;</span>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white block leading-none">
                Dev<span className="text-emerald-400">Sphere</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase block mt-1">
                Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User profile footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between gap-3">
          <Link to="/settings" className="flex items-center gap-3 min-w-0 group">
            <div className="h-9 w-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm flex-shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name || 'User'}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                (user?.name || 'N').charAt(0).toUpperCase()
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-200 truncate group-hover:text-emerald-400 transition-colors">
                {user?.name || 'Nandha'}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {user?.email || 'nandha@example.com'}
              </p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
