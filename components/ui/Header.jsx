'use client';

import { Bell, Search, GraduationCap } from 'lucide-react';

export default function Header({ title, subtitle, showSearch = true, onNotificationClick }) {
  return (
    <div className="sticky top-0 z-20 bg-gradient-to-br from-brand-700 via-brand-900 to-brand-950 text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-500/15 rounded-full blur-2xl" />
      <div className="absolute -bottom-12 -left-6 w-32 h-32 bg-brand-400/20 rounded-full blur-2xl" />

      {/* Top row */}
      <div className="px-5 pt-10 pb-4 sm:pt-7 flex items-center justify-between relative">
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-accent-500 flex items-center justify-center shadow-soft ring-2 ring-accent-400/40 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:shadow-glow">
            <GraduationCap size={20} className="text-brand-900 group-hover:animate-wiggle" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="text-[11px] uppercase tracking-wider text-accent-300 font-semibold">
              {subtitle || 'Welcome back'}
            </p>
            <h1 className="text-lg font-extrabold">
              <span className="text-accent-400 inline-block group-hover:animate-tada">i</span>
              Education
            </h1>
          </div>
        </div>
        <button
          onClick={onNotificationClick}
          className="group relative w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Bell size={18} className="group-hover:animate-wiggle" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full ring-2 ring-brand-900 animate-pulse" />
        </button>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="px-5 pb-4 relative">
          <div className="group flex items-center gap-2 bg-white/95 rounded-2xl px-3.5 py-2.5 shadow-soft transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-accent-400/50 focus-within:scale-[1.01]">
            <Search size={18} className="text-brand-700 group-focus-within:animate-pulse-soft" />
            <input
              type="text"
              placeholder="Search courses, books, teachers..."
              className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm outline-none"
            />
            <span className="text-[10px] font-bold text-brand-900 bg-accent-400 px-2 py-0.5 rounded-md group-hover:scale-110 transition-transform">
              ⌘K
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
