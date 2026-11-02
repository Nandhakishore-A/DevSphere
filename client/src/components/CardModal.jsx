import { useState } from 'react';
import { X, Calendar, User, Tag, Trash2, Clock, AlertTriangle } from 'lucide-react';
import { priorityConfig, labelColors } from '../theme.js';

export default function CardModal({
  card,
  boardMembers = [],
  onClose,
  onSave,
  onDelete,
  isViewer = false,
}) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [priority, setPriority] = useState(card.priority || 'medium');
  const [assignee, setAssignee] = useState(card.assignee?._id || card.assignee || '');
  const [dueDate, setDueDate] = useState(
    card.dueDate ? new Date(card.dueDate).toISOString().split('T')[0] : ''
  );
  const [labels, setLabels] = useState(card.labels || []);
  const [newTagText, setNewTagText] = useState('');
  const [newTagColor, setNewTagColor] = useState('emerald');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isTitleValid = title.trim().length >= 2 && title.trim().length <= 280;

  const handleAddLabel = () => {
    if (!newTagText.trim()) return;
    if (labels.some((l) => l.text.toLowerCase() === newTagText.trim().toLowerCase())) return;
    setLabels([...labels, { text: newTagText.trim(), color: newTagColor }]);
    setNewTagText('');
  };

  const handleRemoveLabel = (idx) => {
    setLabels(labels.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isTitleValid) {
      setError('Card title must be between 2 and 280 characters');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await onSave({
        _id: card._id,
        title: title.trim(),
        description: description.trim(),
        priority,
        assignee: assignee || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        labels,
        version: card.version, // Send OCC version
      });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 font-mono text-[11px] text-slate-400">
              OCC v{card.version ?? 0}
            </span>
            <span className="text-xs text-slate-500">Edit Task Card</span>
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
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Title <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              disabled={isViewer}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-sm font-semibold text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              disabled={isViewer}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, acceptance criteria, or links..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Priority</label>
              <select
                disabled={isViewer}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Assignee</label>
              <select
                disabled={isViewer}
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="">Unassigned</option>
                {boardMembers.map((m) => {
                  const u = m.user || m;
                  return (
                    <option key={u._id} value={u._id}>
                      {u.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Due Date</label>
              <input
                type="date"
                disabled={isViewer}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Labels */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tags & Labels</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {labels.map((lbl, idx) => {
                const colorClass = labelColors[lbl.color] || labelColors.emerald;
                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium ${colorClass}`}
                  >
                    {lbl.text}
                    {!isViewer && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLabel(idx)}
                        className="text-slate-400 hover:text-white"
                      >
                        &times;
                      </button>
                    )}
                  </span>
                );
              })}
            </div>

            {!isViewer && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="New tag..."
                  value={newTagText}
                  onChange={(e) => setNewTagText(e.target.value)}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
                <select
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-300"
                >
                  <option value="emerald">Emerald</option>
                  <option value="teal">Teal</option>
                  <option value="cyan">Cyan</option>
                  <option value="blue">Blue</option>
                  <option value="amber">Amber</option>
                  <option value="rose">Rose</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddLabel}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700"
                >
                  Add Tag
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            {!isViewer ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete card "${card.title}"?`)) {
                    onDelete(card._id);
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Delete Card
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                {isViewer ? 'Close' : 'Cancel'}
              </button>
              {!isViewer && (
                <button
                  type="submit"
                  disabled={saving || !isTitleValid}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
