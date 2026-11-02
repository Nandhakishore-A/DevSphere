import { useState, useMemo } from 'react';
import { X, UserPlus, Shield, User, Trash2, LogOut, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function MemberModal({
  board,
  currentUserId,
  isOwner,
  onClose,
  onAddMember,
  onRemoveMember,
  onUpdateRole,
}) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = useMemo(() => emailRegex.test(email.trim()), [email]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      setError('Please provide a valid email address (e.g. name@company.com)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onAddMember(email.trim().toLowerCase(), role);
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Project Collaborators</h2>
              <p className="text-xs text-slate-400">Manage 3-tier RBAC access and permissions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-400">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Invite Form (Owner Only) */}
        {isOwner && (
          <form onSubmit={handleInvite} className="mt-5 border-b border-slate-800 pb-5">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Invite New Collaborator
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
              >
                <option value="member">Member (Can edit)</option>
                <option value="viewer">Viewer (Read-only)</option>
              </select>
              <button
                type="submit"
                disabled={loading || !isEmailValid}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                Invite
              </button>
            </div>
          </form>
        )}

        {/* Members List */}
        <div className="mt-4 max-h-72 overflow-y-auto space-y-2 pr-1">
          {/* Owner Entry */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                {board.owner?.avatar ? (
                  <img
                    src={board.owner.avatar}
                    alt={board.owner.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  board.owner?.name?.charAt(0).toUpperCase() || 'O'
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  {board.owner?.name}
                  {String(board.owner?._id || board.owner) === String(currentUserId) && (
                    <span className="text-[10px] text-slate-500 font-normal">(You)</span>
                  )}
                </p>
                <p className="text-[11px] text-slate-400">{board.owner?.email}</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
              Workspace Owner
            </span>
          </div>

          {/* Members Entries */}
          {board.members?.map((m) => {
            const u = m.user || {};
            const isMe = String(u._id || u) === String(currentUserId);

            return (
              <div
                key={u._id || m.addedAt}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 font-bold text-xs">
                    {u.avatar ? (
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      u.name?.charAt(0).toUpperCase() || 'M'
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white flex items-center gap-2">
                      {u.name}
                      {isMe && <span className="text-[10px] text-slate-500 font-normal">(You)</span>}
                    </p>
                    <p className="text-[11px] text-slate-400">{u.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isOwner ? (
                    <select
                      value={m.role}
                      onChange={(e) => onUpdateRole(u._id, e.target.value)}
                      className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 focus:outline-none"
                    >
                      <option value="member">Member</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  ) : (
                    <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-medium text-slate-400 capitalize">
                      {m.role}
                    </span>
                  )}

                  {(isOwner || isMe) && (
                    <button
                      onClick={() => onRemoveMember(u._id)}
                      title={isMe ? 'Leave Project' : 'Remove Collaborator'}
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                    >
                      {isMe ? <LogOut className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
