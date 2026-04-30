'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Star,
  Users,
  Clock,
  PlayCircle,
  Check,
  Lock,
  Award,
  ChevronDown,
  ChevronUp,
  Globe,
  Smartphone,
  Infinity as InfinityIcon,
  ShieldCheck,
} from 'lucide-react';

import { teachers } from '../data';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'reviews', label: 'Reviews' },
];

const learnItems = [
  'Master all key concepts with structured live classes',
  'Solve 1000+ MCQs with detailed step-by-step solutions',
  'Get personal mentor support 24/7 in private groups',
  'Lifetime access to all recorded video lectures',
  'Live doubt-clearing sessions every week',
  'Weekly mock tests with national rank analysis',
];

const includes = [
  { icon: PlayCircle, label: 'On-demand video lectures' },
  { icon: InfinityIcon, label: 'Lifetime access & updates' },
  { icon: Smartphone, label: 'Access on mobile & TV' },
  { icon: Award, label: 'Certificate of completion' },
  { icon: Globe, label: 'Bangla & English support' },
  { icon: ShieldCheck, label: '7 days money-back guarantee' },
];

const curriculum = [
  {
    id: 1,
    title: 'Introduction & Foundation',
    lessons: 8,
    duration: '2h 30m',
    free: true,
    items: ['Welcome & roadmap', 'How to study smart', 'Setting up your routine'],
  },
  {
    id: 2,
    title: 'Core Concepts & Theory',
    lessons: 12,
    duration: '4h 10m',
    items: ['Fundamental laws', 'Worked-out problems', 'Quick revision notes'],
  },
  {
    id: 3,
    title: 'Problem Solving Mastery',
    lessons: 10,
    duration: '3h 45m',
    items: ['Pattern recognition', 'Speed techniques', 'Past board questions'],
  },
  {
    id: 4,
    title: 'Advanced Topics',
    lessons: 14,
    duration: '5h 20m',
    items: ['Higher-order MCQs', 'Engineering & Medical level', 'Trick questions'],
  },
  {
    id: 5,
    title: 'Mock Tests & Final Prep',
    lessons: 6,
    duration: '6h 00m',
    items: ['Full-length tests', 'Detailed analysis', 'Last-minute strategy'],
  },
];

const reviews = [
  {
    id: 1,
    name: 'Anika Tabassum',
    rating: 5,
    when: '2 weeks ago',
    comment:
      'Best decision of my life. Teaching is crystal clear and the practice questions are top notch. Already saw a huge improvement in my mocks.',
  },
  {
    id: 2,
    name: 'Rifat Hossain',
    rating: 5,
    when: '1 month ago',
    comment:
      'Increased my MCQ accuracy from 60% to 92% in just 3 months. The live doubt sessions are gold!',
  },
  {
    id: 3,
    name: 'Mahir Tajwar',
    rating: 4,
    when: '1 month ago',
    comment:
      'Quality content, regular live classes. Could use more solved board questions but overall fantastic.',
  },
];

export default function CourseDetailScreen({ course, onBack, onEnroll }) {
  const [tab, setTab] = useState('overview');
  const [bookmarked, setBookmarked] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState(1);

  const teacher = teachers.find((t) => t.name === course.instructor) || teachers[0];
  const discount = course.oldPrice
    ? Math.round(((course.oldPrice - course.price) / course.oldPrice) * 100)
    : 0;

  return (
    <div className="animate-fade-in pb-32">
      {/* Hero */}
      <div
        className={`relative bg-gradient-to-br ${course.gradient} bg-[length:200%_200%] animate-gradient-shift text-white pt-10 pb-8 px-5 overflow-hidden`}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-12 -right-10 w-48 h-48 bg-accent-500/20 rounded-full blur-2xl animate-breathe" />
        <div
          className="absolute -bottom-16 -left-10 w-44 h-44 bg-brand-400/20 rounded-full blur-2xl animate-breathe"
          style={{ animationDelay: '1.5s' }}
        />
        <div className="absolute top-6 left-12 w-1.5 h-1.5 bg-white/60 rounded-full animate-twinkle" />
        <div
          className="absolute top-16 right-20 w-1 h-1 bg-accent-300 rounded-full animate-twinkle"
          style={{ animationDelay: '0.6s' }}
        />
        <div
          className="absolute bottom-10 right-10 w-1.5 h-1.5 bg-accent-300 rounded-full animate-twinkle"
          style={{ animationDelay: '1.2s' }}
        />

        <div className="flex items-center justify-between relative animate-slide-in-down">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center hover:bg-white/25 hover:-translate-x-0.5 active:scale-90 transition-all duration-300"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="group w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center hover:bg-white/25 hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="Bookmark"
            >
              <Bookmark
                size={18}
                className={`transition-all duration-300 ${
                  bookmarked
                    ? 'fill-accent-400 text-accent-400 animate-bounce-in'
                    : 'group-hover:animate-wiggle'
                }`}
              />
            </button>
            <button
              className="group w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center hover:bg-white/25 hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="Share"
            >
              <Share2 size={18} className="group-hover:animate-wiggle" />
            </button>
          </div>
        </div>

        <div className="text-center mt-6 relative animate-bounce-in">
          <div className="text-7xl drop-shadow-lg animate-float-slow inline-block hover:animate-tada cursor-default">
            {course.emoji}
          </div>
          {course.badge && (
            <span className="inline-block mt-3 bg-accent-500 text-brand-900 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-soft animate-pulse-soft">
              ★ {course.badge}
            </span>
          )}
        </div>
      </div>

      {/* Title card */}
      <div className="px-5 -mt-4 relative z-10">
        <div className="bg-white rounded-3xl shadow-card p-4 animate-slide-in-up" style={{ animationDelay: '150ms' }}>
          <h1 className="text-lg font-extrabold text-slate-900 leading-tight">{course.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star size={13} className="text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-900">{course.rating}</span>
              <span>(2.1k reviews)</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Users size={12} /> {course.students.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <Stat icon={Clock} value={course.duration} label="Duration" delay="250ms" />
            <Stat icon={PlayCircle} value={course.lectures} label="Lectures" delay="320ms" />
            <Stat icon={Award} value="Certificate" label="On finish" delay="390ms" />
          </div>
        </div>
      </div>

      {/* Instructor */}
      <section className="px-5 mt-4">
        <div
          className="group bg-white rounded-2xl shadow-card p-3 flex items-center gap-3 hover:shadow-lg transition-all duration-300 animate-slide-in-up"
          style={{ animationDelay: '450ms' }}
        >
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${teacher.color} flex items-center justify-center text-2xl shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-glow`}
          >
            <span className="group-hover:animate-wiggle">{teacher.emoji}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
              Course Instructor
            </p>
            <h3 className="font-extrabold text-sm text-slate-900 truncate group-hover:text-brand-700 transition-colors">
              {course.instructor}
            </h3>
            <p className="text-[11px] text-slate-500 truncate">
              {teacher.subject} • {teacher.exp} experience
            </p>
          </div>
          <button className="text-[10px] font-extrabold text-brand-900 bg-accent-300 hover:bg-accent-400 hover:scale-110 active:scale-95 px-2.5 py-1.5 rounded-lg transition-all duration-200">
            Follow
          </button>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-5 mt-5">
        <div className="bg-white rounded-2xl shadow-card p-1 flex animate-slide-in-up" style={{ animationDelay: '550ms' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-95 ${
                tab === t.id
                  ? 'bg-gradient-to-r from-brand-700 to-brand-950 text-accent-400 shadow-soft scale-[1.02]'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div key={tab} className="mt-4 animate-fade-in">
          {tab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 title-accent">
                  About this course
                </h3>
                <p className="text-[12.5px] text-slate-600 leading-relaxed mt-3">
                  <strong>{course.title}</strong> is a complete learning program designed to help
                  you achieve top grades. Live + recorded lectures, MCQ banks, mock tests, and
                  one-on-one mentor support — everything you need under one roof.
                </p>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900 title-accent">
                  What you'll learn
                </h3>
                <ul className="mt-3 space-y-2">
                  {learnItems.map((it, i) => (
                    <li
                      key={i}
                      className="group flex items-start gap-2.5 bg-white rounded-xl shadow-card p-2.5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-slide-in-left"
                      style={{ animationDelay: `${i * 70}ms` }}
                    >
                      <span className="w-5 h-5 rounded-full bg-accent-500 text-brand-900 flex items-center justify-center mt-0.5 shrink-0 group-hover:animate-bounce-in group-hover:scale-110 transition-transform">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-[12px] text-slate-700 flex-1">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900 title-accent">
                  This course includes
                </h3>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {includes.map((it, i) => {
                    const Icon = it.icon;
                    return (
                      <div
                        key={i}
                        className="group bg-white rounded-xl shadow-card p-2.5 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-pop-in"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <span className="w-7 h-7 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-brand-100 group-hover:scale-110 group-hover:rotate-6">
                          <Icon size={14} className="group-hover:animate-wiggle" />
                        </span>
                        <span className="text-[11px] font-semibold text-slate-700 leading-tight group-hover:text-brand-700 transition-colors">
                          {it.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {tab === 'curriculum' && (
            <div>
              <p className="text-[11px] text-slate-500 mb-3">
                {curriculum.length} chapters •{' '}
                {curriculum.reduce((acc, c) => acc + c.lessons, 0)} lessons •{' '}
                {course.duration} total
              </p>
              <div className="space-y-2">
                {curriculum.map((ch, idx) => {
                  const isOpen = expandedChapter === ch.id;
                  return (
                    <div
                      key={ch.id}
                      className="bg-white rounded-2xl shadow-card overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedChapter(isOpen ? null : ch.id)}
                        className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 transition"
                      >
                        <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-extrabold text-sm shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-slate-900 truncate">{ch.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {ch.lessons} lessons • {ch.duration}
                          </p>
                        </div>
                        {ch.free ? (
                          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                            FREE
                          </span>
                        ) : (
                          <Lock size={14} className="text-slate-400" />
                        )}
                        {isOpen ? (
                          <ChevronUp size={16} className="text-slate-400" />
                        ) : (
                          <ChevronDown size={16} className="text-slate-400" />
                        )}
                      </button>
                      {isOpen && (
                        <ul className="px-3 pb-3 border-t border-slate-100 pt-2 space-y-2">
                          {ch.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-[12px] text-slate-600 py-1.5"
                            >
                              <PlayCircle size={14} className="text-brand-500 shrink-0" />
                              <span className="flex-1">{item}</span>
                              <span className="text-[10px] text-slate-400">12:30</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-brand-800">{course.rating}</p>
                  <div className="flex items-center justify-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < Math.round(course.rating)
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-slate-300'
                        }
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">2,150 reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const pct = stars === 5 ? 78 : stars === 4 ? 16 : stars === 3 ? 4 : stars === 2 ? 1 : 1;
                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-500 w-3">{stars}</span>
                        <Star size={10} className="text-amber-500 fill-amber-500" />
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 w-6 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl shadow-card p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-700 to-brand-950 text-accent-400 flex items-center justify-center font-bold text-xs">
                      {r.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-xs text-slate-900">{r.name}</p>
                      <div className="flex items-center gap-1">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              className={
                                i < r.rating
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-slate-300'
                              }
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">• {r.when}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom spacer for sticky bar */}
      <div className="h-2" />

      {/* Discount badge floating just before bottom bar */}
      {discount > 0 && (
        <div className="px-5 mt-2">
          <div className="bg-accent-100 border border-accent-300 rounded-xl p-2.5 flex items-center gap-2 animate-slide-in-up shadow-soft">
            <span className="text-base animate-tada">🎉</span>
            <p className="text-[12px] text-brand-900 font-semibold">
              You save{' '}
              <span className="font-extrabold animate-pulse-soft">৳{course.oldPrice - course.price}</span> ({discount}%
              off) — limited time only!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, value, label, delay = '0ms' }) {
  return (
    <div
      className="group bg-slate-50 rounded-xl p-2 text-center hover:bg-brand-50 hover:-translate-y-0.5 transition-all duration-300 animate-bounce-in cursor-default"
      style={{ animationDelay: delay }}
    >
      <Icon
        size={14}
        className="text-brand-700 mx-auto transition-transform duration-300 group-hover:scale-125 group-hover:animate-wiggle"
        strokeWidth={2.4}
      />
      <p className="text-xs font-extrabold text-slate-900 mt-1 truncate">{value}</p>
      <p className="text-[10px] text-slate-500">{label}</p>
    </div>
  );
}
