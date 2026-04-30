'use client';

import { BookOpen } from 'lucide-react';

export default function BookCard({ book, variant = 'cover' }) {
  if (variant === 'list') {
    return (
      <div className="group bg-white rounded-2xl shadow-card flex p-3 gap-3 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 ring-1 ring-transparent hover:ring-brand-200">
        <div
          className={`relative w-16 h-20 rounded-xl bg-gradient-to-br ${book.gradient} flex items-center justify-center text-3xl shadow-soft shrink-0 overflow-hidden`}
        >
          {/* Shine sweep on hover */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
          <span className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
            {book.emoji}
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 leading-tight line-clamp-2 group-hover:text-brand-700 transition-colors">
              {book.title}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">By {book.author}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <BookOpen size={11} className="group-hover:animate-wiggle" /> {book.pages} pages
            </span>
            <span className="text-base font-extrabold text-brand-800">৳{book.price}</span>
          </div>
        </div>
      </div>
    );
  }

  // cover style
  return (
    <div className="group w-36 shrink-0 cursor-pointer">
      <div
        className={`relative h-48 rounded-2xl bg-gradient-to-br ${book.gradient} shadow-card overflow-hidden flex flex-col justify-between p-3 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:rotate-1 active:scale-[0.97]`}
      >
        {/* Shine sweep on hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
        <div className="flex justify-between items-start text-white/90 relative z-10">
          <span className="text-[9px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
            iEdu Press
          </span>
          <BookOpen size={14} className="group-hover:animate-wiggle" />
        </div>
        <div className="text-center text-5xl drop-shadow-sm relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 animate-float-slow">
          {book.emoji}
        </div>
        <div className="relative z-10">
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{book.title}</h3>
          <p className="text-white/70 text-[10px] mt-0.5">{book.author}</p>
        </div>
        <div className="absolute top-0 left-0 w-1.5 h-full bg-black/20" />
      </div>
      <div className="flex items-center justify-between mt-2 px-1">
        <span className="text-[10px] text-slate-500">{book.pages}p</span>
        <span className="text-sm font-extrabold text-brand-800 group-hover:scale-110 transition-transform origin-right">
          ৳{book.price}
        </span>
      </div>
    </div>
  );
}
