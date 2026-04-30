'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Users,
  Radio,
  TrendingUp,
  PlayCircle,
  Sparkles,
  FileText,
  Video,
  Trophy,
  Flame,
} from 'lucide-react';

import Header from '../ui/Header';
import SectionTitle from '../ui/SectionTitle';
import CourseCard from '../ui/CourseCard';
import BookCard from '../ui/BookCard';
import TeacherCard from '../ui/TeacherCard';

import {
  offers,
  stats,
  subjects,
  courseFilters,
  courses,
  books,
  teachers,
  freeResources,
} from '../data';

const STAT_ICONS = { Users, Radio, TrendingUp, PlayCircle };
const FREE_ICONS = { FileText, Video, Trophy };

export default function HomeScreen({ onNavigate, onSelectCourse, onOpenNotifications }) {
  const [slide, setSlide] = useState(0);
  const [subject, setSubject] = useState('hsc');
  const [filter, setFilter] = useState('all');

  // Auto-rotate carousel
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % offers.length), 4500);
    return () => clearInterval(id);
  }, []);

  const filteredCourses = useMemo(() => {
    if (filter === 'all') return courses;
    return courses.filter((c) => c.tag === filter);
  }, [filter]);

  return (
    <div className="animate-fade-in">
      <Header title="iEducation" subtitle="Welcome back, Joy 👋" onNotificationClick={onOpenNotifications} />

      {/* Encouragement banner — student-friendly */}
      <section className="px-5 mt-4 -mb-1 animate-slide-in-down" style={{ animationDelay: '50ms' }}>
        <div className="text-[11px] inline-flex items-center gap-1.5 text-slate-500 font-semibold">
          <span className="inline-block animate-wiggle">📚</span>
          <span>
            Today's a great day to learn something new! <span className="animate-pulse-soft">✨</span>
          </span>
        </div>
      </section>

      {/* Offers carousel */}
      <section className="px-5 mt-4">
        <div className="relative rounded-3xl overflow-hidden shadow-card ring-1 ring-brand-900/10">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {offers.map((o) => (
              <div
                key={o.id}
                className={`min-w-full bg-gradient-to-br ${o.gradient} p-5 text-white relative overflow-hidden`}
              >
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-25 pointer-events-none">
                  <div className="absolute top-4 left-8 w-1.5 h-1.5 bg-white rounded-full" />
                  <div className="absolute top-10 left-16 w-1 h-1 bg-white rounded-full" />
                  <div className="absolute top-6 right-20 w-1 h-1 bg-accent-300 rounded-full" />
                  <div className="absolute bottom-6 right-12 w-1.5 h-1.5 bg-accent-300 rounded-full" />
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-500/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-12 -left-8 w-36 h-36 bg-brand-400/20 rounded-full blur-2xl" />
                </div>

                <div className="relative flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-accent-500 text-brand-900 px-2 py-0.5 rounded-full shadow-soft">
                      <Sparkles size={11} /> {o.badge}
                    </span>
                    <p className="mt-2 text-xs font-bold tracking-wider text-white/90">
                      {o.title}
                    </p>
                    <h3 className="text-2xl font-black leading-none mt-1 text-accent-400 uppercase tracking-tight drop-shadow">
                      {o.highlight || o.title}
                    </h3>
                    <p className="text-[11px] text-white/80 mt-2 max-w-[200px] leading-snug">
                      {o.subtitle}
                    </p>
                    <button className="group/cta mt-3 inline-flex items-center gap-1 bg-accent-500 hover:bg-accent-400 text-brand-900 text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-soft hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-200">
                      {o.cta}
                      <span className="transition-transform group-hover/cta:translate-x-1">→</span>
                    </button>
                  </div>
                  <div className="text-6xl drop-shadow-md self-center animate-float-slow hover:animate-tada cursor-default">
                    {o.emoji}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {offers.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === slide
                    ? 'w-6 bg-accent-400 shadow-[0_0_8px_rgba(255,193,7,0.7)]'
                    : 'w-1.5 bg-white/40 hover:bg-white/70 hover:w-3'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="px-5 mt-5">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, idx) => {
            const Icon = STAT_ICONS[s.icon];
            return (
              <div
                key={s.id}
                className="group bg-white rounded-2xl p-3 shadow-card flex items-center gap-3 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 animate-bounce-in"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <Icon size={20} className="group-hover:animate-wiggle" />
                </div>
                <div>
                  <p className="text-base font-extrabold text-slate-900 leading-tight group-hover:text-brand-700 transition-colors">
                    {s.value}
                  </p>
                  <p className="text-[10px] text-slate-500">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Subjects */}
      <section className="px-5 mt-6">
        <SectionTitle
          title="Choose Your Level"
          subtitle="Pick your class to see tailored courses & books"
        />
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
          {subjects.map((s, idx) => {
            const active = subject === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                className={`group shrink-0 w-24 rounded-2xl p-3 text-left border transition-all duration-300 hover:-translate-y-1 active:scale-95 animate-pop-in ${
                  active
                    ? 'bg-gradient-to-br from-brand-700 to-brand-950 text-white border-transparent shadow-soft scale-105 ring-2 ring-accent-400/40'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-brand-300 hover:shadow-md'
                }`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <span
                  className={`text-2xl inline-block transition-transform duration-300 group-hover:scale-125 ${
                    active ? 'animate-tada' : ''
                  }`}
                >
                  {s.emoji}
                </span>
                <p className={`mt-1.5 font-bold text-xs ${active ? '' : 'text-slate-900'}`}>
                  {s.label}
                </p>
                <p className={`text-[10px] ${active ? 'text-white/75' : 'text-slate-500'}`}>
                  {s.sub}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Course filter tabs + popular courses */}
      <section className="px-5 mt-6">
        <SectionTitle
          title="Popular Courses"
          subtitle="Hand-picked best sellers"
          action="See all"
          onAction={() => onNavigate?.('courses')}
        />
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
          {courseFilters.map((f, idx) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 animate-pop-in ${
                  active
                    ? 'bg-brand-800 text-accent-400 shadow-soft ring-2 ring-accent-500/40 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-300 hover:shadow-md'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pt-3 pb-1">
          {filteredCourses.map((c) => (
            <CourseCard key={c.id} course={c} onClick={onSelectCourse} />
          ))}
          {filteredCourses.length === 0 && (
            <div className="w-full text-center py-8 text-slate-500 text-sm">
              No courses found in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Our Published Books */}
      <section className="px-5 mt-6">
        <SectionTitle
          title="Our Published Books"
          subtitle="Beautifully crafted study companions"
          action="View all"
          onAction={() => onNavigate?.('books')}
        />
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </section>

      {/* Chance to Learn Free */}
      <section className="px-5 mt-6">
        <SectionTitle
          title="Chance to Learn Free"
          subtitle="Free lecture sheet, video class & weekly quiz"
        />
        <div className="space-y-3">
          {freeResources.map((r, idx) => {
            const Icon = FREE_ICONS[r.icon];
            return (
              <div
                key={r.id}
                className="group w-full bg-white rounded-2xl shadow-card p-3 flex items-center gap-3 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 text-left cursor-pointer ring-1 ring-transparent hover:ring-brand-200 animate-slide-in-left"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-glow`}
                >
                  <Icon size={22} className="group-hover:animate-wiggle" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-700 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-[11px] text-slate-500">{r.subtitle}</p>
                </div>
                <span className="text-[10px] font-bold text-brand-900 bg-accent-300 px-2 py-1 rounded-lg group-hover:bg-accent-400 group-hover:scale-110 transition-all">
                  {r.count}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Best Teachers */}
      <section className="px-5 mt-6 mb-2">
        <SectionTitle
          title="Learn With The Best"
          subtitle="Get familiar with our experienced teachers"
        />
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
          {teachers.map((t) => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>
      </section>

      {/* Streak banner */}
      <section className="px-5 mt-4 mb-6">
        <div className="group bg-gradient-to-br from-brand-700 via-brand-900 to-brand-950 bg-[length:200%_200%] animate-gradient-shift rounded-3xl p-4 text-white relative overflow-hidden shadow-card ring-1 ring-brand-900/20 hover:shadow-xl transition-shadow">
          <div className="absolute -right-6 -top-6 w-28 h-28 bg-accent-500/20 rounded-full blur-xl animate-breathe" />
          <div
            className="absolute -right-2 -bottom-6 w-16 h-16 bg-accent-400/15 rounded-full blur-lg animate-breathe"
            style={{ animationDelay: '1.2s' }}
          />
          <div className="flex items-center gap-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-accent-500 text-brand-900 flex items-center justify-center shadow-soft animate-glow">
              <Flame size={22} strokeWidth={2.5} className="animate-wiggle" />
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-base">
                <span className="text-accent-400 inline-block animate-pulse-soft">18 day</span>{' '}
                learning streak!
              </h3>
              <p className="text-[12px] text-white/85">
                Keep it up. Take a quick quiz today to maintain your streak.
              </p>
            </div>
            <button className="bg-accent-500 hover:bg-accent-400 text-brand-900 text-xs font-extrabold px-3 py-2 rounded-xl shadow-soft hover:shadow-glow hover:scale-110 active:scale-95 transition-all duration-200">
              Quiz
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
