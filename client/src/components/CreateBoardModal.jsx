import { useState } from 'react';
import { X, FolderPlus, Sparkles, AlertCircle } from 'lucide-react';

export default function CreateBoardModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isTitleValid = title.trim().length >= 3 && title.trim().length <= 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isTitleValid) {
      setError('Project title must be between 3 and 100 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onCreate({
        title: title.trim(),
        description: description.trim(),
        template,
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <FolderPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Create New Project</h2>
              <p className="text-xs text-slate-400">Set up a collaborative workspace & sprint board</p>
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

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300">
              Project Title <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., E-Commerce Platform"
              maxLength={100}
              className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300">
              Description <span className="text-slate-500 text-[10px]">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of project goals and deliverables..."
              maxLength={500}
              rows={3}
              className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
            />
          </div>

          {/* Template Starter Checkbox */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3.5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={template}
                onChange={(e) => setTemplate(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500/40"
              />
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Initialize with Default Workflow Columns</span>
                </div>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Automatically generates Backlog, To Do, In Progress, and In Review lists.
                </p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !isTitleValid}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
