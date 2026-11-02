import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, User, AlertCircle } from 'lucide-react';
import { priorityConfig, labelColors } from '../theme.js';

export default function SortableCard({ card, onClick, isViewer = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card._id,
    data: { type: 'card', card },
    disabled: isViewer,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priority = priorityConfig[card.priority] || priorityConfig.medium;
  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`group relative rounded-xl border border-slate-800 bg-[#0F172A] p-3.5 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md cursor-pointer ${
        isDragging ? 'opacity-40 ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-950' : ''
      }`}
    >
      {/* Priority & Version Indicator */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium border ${priority.bg} ${priority.text} ${priority.border}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
          {priority.label}
        </span>

        <span className="text-[10px] font-mono text-slate-500 opacity-60 group-hover:opacity-100 transition-opacity">
          v{card.version ?? 0}
        </span>
      </div>

      {/* Card Title */}
      <h4 className="text-sm font-semibold text-slate-100 leading-snug group-hover:text-emerald-400 transition-colors">
        {card.title}
      </h4>

      {/* Description Snippet */}
      {card.description && (
        <p className="mt-1.5 line-clamp-2 text-xs text-slate-400 leading-relaxed">
          {card.description}
        </p>
      )}

      {/* Labels */}
      {card.labels && card.labels.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {card.labels.map((lbl, idx) => {
            const colorClass = labelColors[lbl.color] || labelColors.emerald;
            return (
              <span
                key={idx}
                className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${colorClass}`}
              >
                {lbl.text}
              </span>
            );
          })}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          {card.dueDate && (
            <span
              className={`flex items-center gap-1 text-[11px] font-medium ${
                isOverdue ? 'text-rose-400 font-semibold' : 'text-slate-400'
              }`}
            >
              {isOverdue && <AlertCircle className="h-3 w-3" />}
              <Calendar className="h-3 w-3" />
              {new Date(card.dueDate).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
        </div>

        {card.assignee && (
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
              {card.assignee.avatar ? (
                <img
                  src={card.assignee.avatar}
                  alt={card.assignee.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                card.assignee.name?.charAt(0).toUpperCase()
              )}
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {card.assignee.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
