'use client';

import { ChevronRight } from 'lucide-react';

export default function SectionTitle({ title, subtitle, action, onAction }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div>
        <h2 className="text-base font-extrabold text-slate-900 title-accent">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 mt-2">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={onAction}
          className="group flex items-center gap-0.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors active:scale-95"
        >
          {action}
          <ChevronRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      )}
    </div>
  );
}
