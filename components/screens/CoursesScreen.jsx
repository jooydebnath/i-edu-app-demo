'use client';

import { useMemo, useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';

import Header from '../ui/Header';
import SectionTitle from '../ui/SectionTitle';
import CourseCard from '../ui/CourseCard';
import { courseFilters, courses, subjects } from '../data';

export default function CoursesScreen({ onSelectCourse, onOpenNotifications }) {
  const [filter, setFilter] = useState('all');
  const [subject, setSubject] = useState('all');

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const tagOK = filter === 'all' || c.tag === filter;
      return tagOK;
    });
  }, [filter, subject]);

  return (
    <div className="animate-fade-in">
      <Header title="Courses" subtitle="Find your perfect course" onNotificationClick={onOpenNotifications} />

      {/* Filter chips */}
      <section className="px-5 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal size={14} className="text-slate-500" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Quick Filters
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
          {courseFilters.map((f, idx) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 animate-pop-in ${
                  active
                    ? 'bg-gradient-to-r from-brand-700 to-brand-950 text-accent-400 shadow-soft ring-2 ring-accent-500/30 scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-brand-300 hover:shadow-md'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Subject filter */}
      <section className="px-5 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-slate-500" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            By Level
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
          {[{ id: 'all', label: 'All', emoji: '🌐' }, ...subjects].map((s, idx) => {
            const active = subject === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                className={`group shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 animate-pop-in ${
                  active
                    ? 'bg-brand-800 text-accent-400 shadow-soft scale-105 ring-2 ring-accent-400/40'
                    : 'bg-white text-slate-700 border border-slate-200 hover:shadow-md hover:border-brand-300'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span
                  className={`inline-block transition-transform duration-300 group-hover:scale-125 ${
                    active ? 'animate-tada' : ''
                  }`}
                >
                  {s.emoji}
                </span>
                {s.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Result count */}
      <section className="px-5 mt-4">
        <SectionTitle
          title={`${filteredCourses.length} courses available`}
          subtitle="Tap a course to view details"
        />

        <div className="space-y-3">
          {filteredCourses.map((c, idx) => (
            <div
              key={c.id}
              className="animate-slide-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <CourseCard course={c} variant="list" onClick={onSelectCourse} />
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 text-sm shadow-card animate-bounce-in">
              <div className="text-4xl mb-2 animate-float">🔍</div>
              <p>No courses match your filters yet. Try a different category.</p>
            </div>
          )}
        </div>
      </section>

      <div className="h-4" />
    </div>
  );
}
