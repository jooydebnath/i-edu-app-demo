'use client';

import { useEffect, useState } from 'react';
import {
  GraduationCap,
  BookOpenCheck,
  Trophy,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Star,
  Users,
  Flame,
  Award,
  PlayCircle,
  Zap,
} from 'lucide-react';

const LANG_KEY = 'iedu.lang.v1';

/* ──────────────────────────────────────────────────────────
   i18n strings
   ────────────────────────────────────────────────────── */

const STRINGS = {
  en: {
    skip: 'Skip',
    continue: 'Continue',
    getStarted: 'Get Started',
    legal: 'By continuing you agree to our Terms & Privacy',
    chips: {
      rating: '4.9',
      users: '50K+',
      smart: 'Smart',
      hscBatch: 'HSC 26',
      courseTitle: 'Chemistry Master',
      coursePrice: '৳1,499',
      teacherName: 'Mahbub Sir',
      teacherTag: 'Top Rated',
      live: 'LIVE',
      streakLabel: 'Streak',
      streakValue: '12 days',
      certLabel: 'Earned',
      certValue: '7 Certs',
      quizLabel: 'Quiz',
      quizValue: '94% avg',
    },
    slides: [
      {
        id: 'welcome',
        eyebrow: 'Welcome to iEducation',
        titleLead: "Bangladesh's ",
        titleAccent: 'smartest',
        titleTrail: ' learning app',
        desc: "Learn from the best teachers across HSC, Admission, SSC and more — all in one app.",
      },
      {
        id: 'courses',
        eyebrow: 'Top Courses & Teachers',
        titleLead: 'Learn from the very ',
        titleAccent: 'best',
        titleTrail: '',
        desc: "Live classes, recorded lectures and premium books from Bangladesh's top instructors — all in one place.",
      },
      {
        id: 'progress',
        eyebrow: 'Track Your Journey',
        titleLead: 'Build streaks, earn ',
        titleAccent: 'certificates',
        titleTrail: '',
        desc: 'Solve quizzes, climb the leaderboard, and watch your progress turn into real achievements.',
      },
    ],
  },
  bn: {
    skip: 'এড়িয়ে যান',
    continue: 'এগিয়ে চলুন',
    getStarted: 'শুরু করুন',
    legal: 'এগিয়ে গেলে আপনি আমাদের শর্তাবলী ও গোপনীয়তা নীতি মেনে নিচ্ছেন',
    chips: {
      rating: '৪.৯',
      users: '৫০হা+',
      smart: 'স্মার্ট',
      hscBatch: 'এইচএসসি ২৬',
      courseTitle: 'রসায়ন মাস্টার',
      coursePrice: '৳১,৪৯৯',
      teacherName: 'মাহবুব স্যার',
      teacherTag: 'সেরা রেটেড',
      live: 'লাইভ',
      streakLabel: 'স্ট্রিক',
      streakValue: '১২ দিন',
      certLabel: 'অর্জিত',
      certValue: '৭ সার্টিফিকেট',
      quizLabel: 'কুইজ',
      quizValue: '৯৪% গড়',
    },
    slides: [
      {
        id: 'welcome',
        eyebrow: 'iEducation-এ স্বাগতম',
        titleLead: 'বাংলাদেশের সবচেয়ে ',
        titleAccent: 'স্মার্ট',
        titleTrail: ' লার্নিং অ্যাপ',
        desc: 'এইচএসসি, অ্যাডমিশন, এসএসসি সহ সব পর্যায়ের সেরা শিক্ষকদের কাছ থেকে শিখুন — এক অ্যাপেই।',
      },
      {
        id: 'courses',
        eyebrow: 'সেরা কোর্স ও শিক্ষক',
        titleLead: 'সেরাদের কাছ থেকে ',
        titleAccent: 'শিখুন',
        titleTrail: '',
        desc: 'বাংলাদেশের সেরা শিক্ষকদের লাইভ ক্লাস, রেকর্ডেড লেকচার ও প্রিমিয়াম বই — সব এক জায়গায়।',
      },
      {
        id: 'progress',
        eyebrow: 'নিজের অগ্রগতি দেখুন',
        titleLead: 'স্ট্রিক বাড়ান, ',
        titleAccent: 'সার্টিফিকেট',
        titleTrail: ' জিতুন',
        desc: 'কুইজ সলভ করুন, লিডারবোর্ডে এগিয়ে যান, আর নিজের অগ্রগতিকে অর্জনে রূপ দিন।',
      },
    ],
  },
};

const SLIDE_ACCENTS = [
  'from-brand-700 via-brand-900 to-brand-950',
  'from-fuchsia-700 via-brand-800 to-brand-950',
  'from-brand-700 via-purple-900 to-brand-950',
];

const VISUALS = [WelcomeVisual, CoursesVisual, ProgressVisual];

/* Background floating particles config */
const PARTICLES = [
  { top: '8%', left: '12%', size: 2, color: 'bg-accent-300/80', anim: 'animate-float-slow', delay: '0s' },
  { top: '14%', left: '78%', size: 3, color: 'bg-white/60', anim: 'animate-float', delay: '0.4s' },
  { top: '22%', left: '88%', size: 2, color: 'bg-accent-400/80', anim: 'animate-float-reverse', delay: '0.8s' },
  { top: '32%', left: '6%', size: 4, color: 'bg-white/40', anim: 'animate-float-fast', delay: '0.2s' },
  { top: '45%', left: '92%', size: 2, color: 'bg-accent-300/70', anim: 'animate-float-slow', delay: '1s' },
  { top: '58%', left: '4%', size: 3, color: 'bg-white/50', anim: 'animate-float-reverse', delay: '0.6s' },
  { top: '68%', left: '85%', size: 2, color: 'bg-accent-400/60', anim: 'animate-float', delay: '1.2s' },
  { top: '78%', left: '14%', size: 3, color: 'bg-white/60', anim: 'animate-float-slow', delay: '0.3s' },
  { top: '40%', left: '46%', size: 1, color: 'bg-accent-300', anim: 'animate-twinkle', delay: '0.5s' },
  { top: '60%', left: '52%', size: 1, color: 'bg-white', anim: 'animate-twinkle', delay: '1.4s' },
  { top: '20%', left: '40%', size: 1, color: 'bg-accent-400', anim: 'animate-twinkle', delay: '0.9s' },
];

/* ──────────────────────────────────────────────────────────
   Onboarding component
   ────────────────────────────────────────────────────── */

export default function OnboardingScreen({ onDone }) {
  const [lang, setLang] = useState('en');
  const [step, setStep] = useState(0);

  // Load saved language preference on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved === 'bn' || saved === 'en') setLang(saved);
    } catch {}
  }, []);

  const t = STRINGS[lang];
  const slide = t.slides[step];
  const Visual = VISUALS[step];
  const isLast = step === t.slides.length - 1;
  const slideKey = `${slide.id}-${lang}`;

  const setLanguage = (l) => {
    setLang(l);
    try {
      window.localStorage.setItem(LANG_KEY, l);
    } catch {}
  };

  const next = () => {
    if (isLast) onDone?.();
    else setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));
  const skip = () => onDone?.();

  return (
    <div
      className={`absolute inset-0 z-40 text-white flex flex-col bg-gradient-to-br ${SLIDE_ACCENTS[step]} bg-[length:220%_220%] animate-gradient-shift transition-colors duration-700 overflow-hidden`}
    >
      {/* Decorative blobs (animated) */}
      <div className="absolute -top-20 -right-16 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl pointer-events-none animate-breathe" />
      <div
        className="absolute -bottom-24 -left-16 w-80 h-80 bg-brand-400/25 rounded-full blur-3xl pointer-events-none animate-breathe"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="absolute top-1/3 -left-10 w-40 h-40 bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none animate-float-slow"
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute ${p.color} ${p.anim} rounded-full pointer-events-none`}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size * 2}px`,
            height: `${p.size * 2}px`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-5 pt-10 sm:pt-7 animate-slide-in-down">
        <button
          onClick={back}
          disabled={step === 0}
          className={`w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center transition active:scale-90 ${
            step === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/20 hover:-translate-x-0.5'
          }`}
          aria-label="Back"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div className="flex items-center bg-white/10 backdrop-blur-md ring-1 ring-white/20 rounded-full p-0.5 text-[11px] font-extrabold relative overflow-hidden">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-full transition-all duration-300 active:scale-95 ${
                lang === 'en'
                  ? 'bg-accent-400 text-brand-900 shadow-soft scale-105'
                  : 'text-white/80 hover:text-white'
              }`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-3 py-1.5 rounded-full transition-all duration-300 active:scale-95 ${
                lang === 'bn'
                  ? 'bg-accent-400 text-brand-900 shadow-soft scale-105'
                  : 'text-white/80 hover:text-white'
              }`}
              aria-pressed={lang === 'bn'}
            >
              বাংলা
            </button>
          </div>

          <button
            onClick={skip}
            className="text-xs font-bold text-white/80 hover:text-white transition px-3 py-1.5 rounded-full hover:bg-white/10 active:scale-95"
          >
            {t.skip}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center pb-2">
        {/* Visual (key forces remount → re-runs entrance animations) */}
        <div key={slideKey} className="mb-8 animate-bounce-in">
          <Visual chips={t.chips} />
        </div>

        <p
          key={`${slideKey}-eye`}
          className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent-300 inline-flex items-center gap-1.5 animate-slide-in-down"
          style={{ animationDelay: '0.15s' }}
        >
          <Sparkles size={12} className="text-accent-400 animate-twinkle" /> {slide.eyebrow}
        </p>

        <h1
          key={`${slideKey}-title`}
          className="relative text-2xl sm:text-3xl font-extrabold leading-tight mt-3 max-w-[320px] animate-slide-in-up"
          style={{ animationDelay: '0.25s' }}
        >
          {slide.titleLead}
          <span className="relative inline-block text-accent-400">
            {slide.titleAccent}
            {/* Shine sweep over the accent word */}
            <span
              className="absolute inset-0 overflow-hidden rounded pointer-events-none"
              aria-hidden="true"
            >
              <span className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shine" />
            </span>
          </span>
          {slide.titleTrail}
        </h1>

        <p
          key={`${slideKey}-desc`}
          className="text-sm text-white/85 mt-3 max-w-[300px] leading-relaxed animate-slide-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          {slide.desc}
        </p>
      </div>

      {/* Footer */}
      <div className="relative px-6 pb-10 sm:pb-8 pt-4 animate-slide-in-up" style={{ animationDelay: '0.55s' }}>
        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {t.slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all duration-500 active:scale-90 ${
                i === step
                  ? 'w-8 bg-accent-400 shadow-[0_0_12px_rgba(255,193,7,0.7)]'
                  : 'w-2 bg-white/30 hover:bg-white/50 hover:w-3'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={next}
          className="group relative w-full bg-accent-500 hover:bg-accent-400 text-brand-900 font-extrabold text-sm py-4 rounded-2xl shadow-soft transition-all duration-300 active:scale-[0.97] hover:scale-[1.02] inline-flex items-center justify-center gap-2 overflow-hidden animate-glow"
        >
          {/* Shine sweep on CTA */}
          <span className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <span className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine" />
          </span>
          <span className="relative">{isLast ? t.getStarted : t.continue}</span>
          <ArrowRight
            size={16}
            strokeWidth={3}
            className="relative transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        {isLast && (
          <p className="text-center text-[11px] text-white/60 mt-3 animate-fade-in">
            {t.legal}
          </p>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Visuals — playful animated illustrations
   ────────────────────────────────────────────────────── */

function WelcomeVisual({ chips }) {
  return (
    <div className="relative w-56 h-56">
      {/* Outer rotating rings */}
      <div className="absolute inset-0 rounded-full bg-white/5 ring-1 ring-white/10 animate-spin-slow">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent-400 rounded-full" />
        <span className="absolute bottom-2 right-4 w-1 h-1 bg-white/70 rounded-full" />
      </div>
      <div className="absolute inset-3 rounded-full bg-white/5 ring-1 ring-white/10 animate-spin-reverse">
        <span className="absolute top-3 right-3 w-1 h-1 bg-accent-300 rounded-full" />
      </div>

      {/* Center logo with breathing + wiggle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-breathe">
          <div
            className="w-24 h-24 rounded-3xl bg-accent-500 shadow-phone flex items-center justify-center ring-4 ring-accent-400/30 animate-wiggle"
            style={{ animationDuration: '3.6s' }}
          >
            <GraduationCap size={48} className="text-brand-900" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Floating chips with stagger entrance + idle float */}
      <div
        className="absolute top-2 right-1 animate-slide-in-right"
        style={{ animationDelay: '0.3s' }}
      >
        <div className="animate-float">
          <Chip>
            <Star size={11} className="text-accent-400 animate-twinkle" /> {chips.rating}
          </Chip>
        </div>
      </div>
      <div
        className="absolute bottom-4 left-0 animate-slide-in-left"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="animate-float-slow">
          <Chip>
            <Users size={11} className="text-accent-400" /> {chips.users}
          </Chip>
        </div>
      </div>
      <div
        className="absolute top-12 -left-1 animate-slide-in-left"
        style={{ animationDelay: '0.7s' }}
      >
        <div className="animate-float-reverse">
          <Chip>
            <Zap
              size={11}
              className="text-accent-400 animate-twinkle"
              style={{ animationDelay: '0.4s' }}
            />{' '}
            {chips.smart}
          </Chip>
        </div>
      </div>
    </div>
  );
}

function CoursesVisual({ chips }) {
  return (
    <div className="relative w-56 h-56">
      {/* Stacked back cards (stagger fade-in) */}
      <div
        className="absolute top-8 left-2 right-10 h-24 rounded-2xl bg-white/10 backdrop-blur-sm ring-1 ring-white/15 rotate-[-8deg] shadow-soft animate-pop-in"
        style={{ animationDelay: '0.05s' }}
      />
      <div
        className="absolute top-4 left-6 right-4 h-24 rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20 rotate-[-3deg] shadow-soft animate-pop-in"
        style={{ animationDelay: '0.15s' }}
      />

      {/* Top course card with bounce-in + idle float */}
      <div
        className="absolute top-0 left-4 right-2 animate-bounce-in"
        style={{ animationDelay: '0.25s' }}
      >
        <div className="animate-float-slow">
          <div className="rounded-2xl bg-white text-brand-900 p-3 shadow-phone">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-xl animate-wiggle">
                🧪
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                  {chips.hscBatch}
                </p>
                <p className="text-xs font-extrabold leading-tight truncate">
                  {chips.courseTitle}
                </p>
              </div>
              <PlayCircle size={20} className="text-brand-700 animate-pulse-soft" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] inline-flex items-center gap-1 font-bold text-brand-700">
                <Star
                  size={10}
                  className="text-accent-500 fill-accent-500 animate-twinkle"
                />{' '}
                {chips.rating}
              </span>
              <span className="text-[11px] font-extrabold text-brand-800">
                {chips.coursePrice}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher chip — slides in from left, then floats */}
      <div
        className="absolute bottom-6 left-2 animate-slide-in-left"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="animate-float">
          <div className="bg-white text-brand-900 rounded-2xl shadow-phone px-2 py-1.5 inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-base animate-wiggle">
              👨‍🏫
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-extrabold">{chips.teacherName}</p>
              <p className="text-[9px] text-brand-700/70 font-semibold">
                {chips.teacherTag}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live badge — pops in, glows, pulses */}
      <div
        className="absolute top-12 right-0 animate-pop-in"
        style={{ animationDelay: '0.7s' }}
      >
        <div className="animate-float-reverse">
          <div className="bg-rose-500 text-white rounded-2xl shadow-soft px-2 py-1 text-[10px] font-extrabold inline-flex items-center gap-1 ring-2 ring-rose-300/60">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {chips.live}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressVisual({ chips }) {
  return (
    <div className="relative w-56 h-56">
      {/* Trophy hero with breathing + glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative animate-breathe">
          <div className="absolute inset-0 bg-accent-400/50 blur-3xl rounded-full animate-pulse-soft" />
          {/* bounce-in wrapper (one-time entrance) */}
          <div className="animate-bounce-in" style={{ animationDelay: '0.05s' }}>
            {/* glow wrapper (continuous) */}
            <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-accent-300 to-accent-500 flex items-center justify-center shadow-phone ring-4 ring-accent-400/40 animate-glow">
              <Trophy
                size={56}
                className="text-brand-900 animate-tada"
                strokeWidth={2.2}
                style={{ animationDelay: '0.3s' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Streak chip (top-left) */}
      <div
        className="absolute top-1 left-2 animate-slide-in-left"
        style={{ animationDelay: '0.35s' }}
      >
        <div className="animate-float-slow">
          <div className="bg-white text-brand-900 rounded-2xl shadow-phone px-2.5 py-1.5 inline-flex items-center gap-1.5">
            <Flame
              size={14}
              className="text-orange-500 animate-wiggle"
              style={{ animationDuration: '1.6s' }}
            />
            <div className="leading-none">
              <p className="text-[9px] font-bold text-brand-700/70 uppercase tracking-wide">
                {chips.streakLabel}
              </p>
              <p className="text-[12px] font-extrabold">{chips.streakValue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate chip (bottom-right) */}
      <div
        className="absolute bottom-2 right-0 animate-slide-in-right"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="animate-float-reverse">
          <div className="bg-white text-brand-900 rounded-2xl shadow-phone px-2.5 py-1.5 inline-flex items-center gap-1.5">
            <Award size={14} className="text-brand-700 animate-pulse-soft" />
            <div className="leading-none">
              <p className="text-[9px] font-bold text-brand-700/70 uppercase tracking-wide">
                {chips.certLabel}
              </p>
              <p className="text-[12px] font-extrabold">{chips.certValue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz chip (top-right) */}
      <div
        className="absolute top-12 right-1 animate-slide-in-right"
        style={{ animationDelay: '0.65s' }}
      >
        <div className="animate-float">
          <div className="bg-white text-brand-900 rounded-2xl shadow-phone px-2.5 py-1.5 inline-flex items-center gap-1.5">
            <BookOpenCheck
              size={14}
              className="text-emerald-600 animate-twinkle"
              style={{ animationDelay: '0.6s' }}
            />
            <div className="leading-none">
              <p className="text-[9px] font-bold text-brand-700/70 uppercase tracking-wide">
                {chips.quizLabel}
              </p>
              <p className="text-[12px] font-extrabold">{chips.quizValue}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small reusable glassy pill chip */
function Chip({ children }) {
  return (
    <div className="bg-white/15 backdrop-blur-md ring-1 ring-white/25 rounded-2xl px-2.5 py-1.5 text-[10px] font-bold inline-flex items-center gap-1 shadow-soft text-white">
      {children}
    </div>
  );
}
