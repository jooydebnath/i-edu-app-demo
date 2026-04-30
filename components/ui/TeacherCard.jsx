'use client';

import { Award } from 'lucide-react';

export default function TeacherCard({ teacher, variant = 'card' }) {
  if (variant === 'row') {
    return (
      <div className="group bg-white rounded-2xl shadow-card p-3 flex items-center gap-3 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 ring-1 ring-transparent hover:ring-brand-200">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${teacher.color} flex items-center justify-center text-2xl shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
        >
          <span className="group-hover:animate-wiggle">{teacher.emoji}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-700 transition-colors">{teacher.name}</h3>
          <p className="text-[11px] text-slate-500">{teacher.subject} Teacher</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Exp.</p>
          <p className="text-xs font-bold text-brand-600">{teacher.exp}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group w-32 shrink-0 bg-white rounded-2xl shadow-card p-3 text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 active:scale-[0.97] transition-all duration-300 ring-1 ring-transparent hover:ring-brand-200">
      <div
        className={`relative w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${teacher.color} flex items-center justify-center text-3xl shadow-soft transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow`}
      >
        {/* Shine sweep on the avatar */}
        <span className="absolute inset-0 rounded-full overflow-hidden">
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
        </span>
        <span className="relative group-hover:animate-wiggle">{teacher.emoji}</span>
      </div>
      <h3 className="font-bold text-xs text-slate-900 mt-2 leading-tight group-hover:text-brand-700 transition-colors">
        {teacher.name}
      </h3>
      <p className="text-[10px] text-slate-500">{teacher.subject}</p>
      <div className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full group-hover:bg-amber-100 transition-colors">
        <Award size={10} className="group-hover:animate-twinkle" /> {teacher.exp}
      </div>
    </div>
  );
}
