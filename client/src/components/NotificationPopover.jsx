import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Code2,
  FolderKanban,
  FolderClosed,
  ShieldCheck,
  Check,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function NotificationPopover({ isOpen, onClose }) {
  const popoverRef = useRef(null);

  const initialNotifications = [
    {
      id: 1,
      title: 'Sprint Task Completed',
      message: 'Arun moved "Multi-Region Atlas Cluster" to Done',
      time: '5m ago',
      unread: true,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      link: '/projects',
    },
    {
      id: 2,
      title: 'Live Coding Room Active',
      message: 'Priya and 3 others started collaborating in #general',
      time: '18m ago',
      unread: true,
      icon: Code2,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20',
      link: '/rooms',
    },
    {
      id: 3,
      title: 'Team Project Shared',
      message: 'You were added as Collaborator to "Cloud Architecture & DevOps"',
      time: '1h ago',
      unread: true,
      icon: FolderKanban,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      link: '/projects',
    },
    {
      id: 4,
      title: 'Cloudinary CDN Asset Uploaded',
      message: 'New responsive asset "hero-banner.png" synced to CDN',
      time: '3h ago',
      unread: false,
      icon: FolderClosed,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      link: '/files',
    },
    {
      id: 5,
      title: 'OAuth Authentication Verified',
      message: 'Secure token session established with DevSphere cluster',
      time: '1d ago',
      unread: false,
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      link: '/settings',
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markSingleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 glow-subtle"
    >
      {/* Popover Header */}
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
            >
              Mark read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              title="Clear all"
              className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/80">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-slate-600" />
            <p>You're all caught up!</p>
            <p className="text-[11px] text-slate-600">No new notifications right now.</p>
          </div>
        ) : (
          notifications.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.link}
                onClick={() => {
                  markSingleRead(item.id);
                  onClose();
                }}
                className={`flex items-start gap-3 p-3.5 hover:bg-slate-900/80 transition-colors group cursor-pointer ${
                  item.unread ? 'bg-slate-900/40' : ''
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-xl border flex items-center justify-center flex-shrink-0 ${item.bg} ${item.color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      {item.title}
                    </p>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                    {item.message}
                  </p>
                </div>

                {item.unread && (
                  <span className="h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0 mt-1"></span>
                )}
              </Link>
            );
          })
        )}
      </div>

      {/* Popover Footer */}
      <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/60 text-center">
        <Link
          to="/settings"
          onClick={onClose}
          className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors font-semibold"
        >
          Manage notification preferences &rarr;
        </Link>
      </div>
    </div>
  );
}
