'use client';

import { Star, Users, Clock, PlayCircle } from 'lucide-react';

export default function CourseCard({ course, variant = 'horizontal', onClick }) {
  const handleEnroll = (e) => {
    e.stopPropagation();
    onClick?.(course);
  };

  if (variant === 'list') {
    return (
      <div
        onClick={() => onClick?.(course)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(course)}
        className="group bg-white rounded-2xl shadow-card overflow-hidden flex cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 ring-1 ring-transparent hover:ring-brand-200"
      >
        <div
          className={`relative w-28 shrink-0 bg-gradient-to-br ${course.gradient} flex items-center justify-center overflow-hidden`}
        >
          {/* Shine sweep on hover */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
          <span className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            {course.emoji}
          </span>
          {course.badge && (
            <span className="absolute top-2 left-2 bg-white/95 text-[9px] font-bold uppercase tracking-wider text-slate-700 px-1.5 py-0.5 rounded-full shadow-soft animate-pulse-soft">
              {course.badge}
            </span>
          )}
        </div>
        <div className="flex-1 p-3">
          <h3 className="font-bold text-sm text-slate-900 leading-tight line-clamp-2 group-hover:text-brand-700 transition-colors">
            {course.title}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">By {course.instructor}</p>
          <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-2">
            <span className="flex items-center gap-1">
              <Star size={11} className="text-amber-500 fill-amber-500 group-hover:animate-twinkle" />
              {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users size={11} />
              {course.students.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {course.duration}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-brand-800">৳{course.price}</span>
              {course.oldPrice && (
                <span className="text-[11px] text-slate-400 line-through">৳{course.oldPrice}</span>
              )}
            </div>
            <button
              onClick={handleEnroll}
              className="text-[10px] font-extrabold text-brand-900 bg-accent-500 hover:bg-accent-400 px-3 py-1.5 rounded-lg shadow-soft hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Enroll
            </button>
          </div>
        </div>
      </div>
    );
  }

  // horizontal scroll card (default)
  return (
    <div
      onClick={() => onClick?.(course)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(course)}
      className="group w-60 shrink-0 bg-white rounded-2xl shadow-card overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ring-1 ring-transparent hover:ring-brand-200"
    >
      <div
        className={`relative h-28 bg-gradient-to-br ${course.gradient} flex items-center justify-center overflow-hidden`}
      >
        {/* Shine sweep on hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
        <span className="text-5xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          {course.emoji}
        </span>
        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-[1px]">
          <PlayCircle className="text-white drop-shadow-md scale-75 group-hover:scale-100 transition-transform duration-300" size={36} />
        </button>
        {course.badge && (
          <span className="absolute top-2 left-2 bg-white/95 text-[10px] font-bold uppercase tracking-wider text-slate-700 px-2 py-0.5 rounded-full shadow-soft animate-pulse-soft z-10">
            {course.badge}
          </span>
        )}
        <span className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm text-[10px] font-semibold text-white px-2 py-0.5 rounded-full z-10">
          {course.lectures} lectures
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-slate-900 leading-tight line-clamp-2 min-h-[2.4rem] group-hover:text-brand-700 transition-colors">
          {course.title}
        </h3>
        <p className="text-[11px] text-slate-500 mt-1">By {course.instructor}</p>
        <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <Star size={11} className="text-amber-500 fill-amber-500 group-hover:animate-twinkle" />
            {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} />
            {course.students.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {course.duration}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-brand-800">৳{course.price}</span>
            {course.oldPrice && (
              <span className="text-[11px] text-slate-400 line-through">৳{course.oldPrice}</span>
            )}
          </div>
          <button
            onClick={handleEnroll}
            className="text-[10px] font-extrabold text-brand-900 bg-accent-500 hover:bg-accent-400 px-3 py-1.5 rounded-lg shadow-soft hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}
