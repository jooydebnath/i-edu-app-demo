'use client';

import { BookOpen, Sparkles } from 'lucide-react';
import Header from '../ui/Header';
import SectionTitle from '../ui/SectionTitle';
import BookCard from '../ui/BookCard';
import { books } from '../data';

export default function BooksScreen({ onOpenNotifications }) {
  const featured = books[0];
  const rest = books.slice(1);

  return (
    <div className="animate-fade-in">
      <Header title="Our Books" subtitle="iEducation Press" onNotificationClick={onOpenNotifications} />

      {/* Featured book hero */}
      <section className="px-5 mt-4">
        <div
          className={`group relative rounded-3xl overflow-hidden shadow-card bg-gradient-to-br ${featured.gradient} bg-[length:200%_200%] animate-gradient-shift p-5 text-white animate-bounce-in hover:shadow-xl transition-shadow`}
        >
          {/* Shine sweep on hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full animate-breathe" />
          <div
            className="absolute -bottom-8 -left-4 w-24 h-24 bg-white/10 rounded-full animate-breathe"
            style={{ animationDelay: '1s' }}
          />
          <div className="flex items-center gap-4 relative">
            <div className="text-6xl drop-shadow-md animate-float-slow group-hover:animate-tada cursor-default">
              {featured.emoji}
            </div>
            <div className="flex-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                <Sparkles size={11} className="animate-twinkle" /> Featured
              </span>
              <h3 className="text-lg font-extrabold leading-tight mt-2">{featured.title}</h3>
              <p className="text-[12px] text-white/85">By {featured.author}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xl font-extrabold">৳{featured.price}</span>
                <span className="text-[11px] text-white/80 flex items-center gap-1">
                  <BookOpen size={11} className="group-hover:animate-wiggle" /> {featured.pages} pages
                </span>
              </div>
              <button className="mt-3 bg-accent-500 hover:bg-accent-400 text-brand-900 text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-soft hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-200">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-5 mt-6">
        <SectionTitle
          title="Browse by Category"
          subtitle="Books matched to every level"
        />
        <div className="grid grid-cols-3 gap-2">
          {['Admission', 'HSC', 'SSC', 'Class 8', 'Primary', 'English'].map((c, i) => (
            <button
              key={c}
              className="group bg-white rounded-2xl p-3 text-center shadow-card hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-300 ring-1 ring-transparent hover:ring-brand-200 animate-pop-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="text-xl inline-block transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">
                {['🎯', '📗', '📕', '📒', '🧮', '🔤'][i]}
              </div>
              <p className="text-[11px] font-bold text-slate-700 mt-1 group-hover:text-brand-700 transition-colors">
                {c}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* All books grid (cover style) */}
      <section className="px-5 mt-6">
        <SectionTitle title="All Published Books" subtitle="Hand-bound. Crafted for results." />
        <div className="grid grid-cols-2 gap-3">
          {books.map((b, idx) => (
            <div
              key={b.id}
              className="flex justify-center animate-slide-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <BookCard book={b} />
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers list */}
      <section className="px-5 mt-6 mb-6">
        <SectionTitle title="Bestsellers This Month" />
        <div className="space-y-3">
          {rest.map((b, idx) => (
            <div
              key={b.id}
              className="animate-slide-in-left"
              style={{ animationDelay: `${idx * 90}ms` }}
            >
              <BookCard book={b} variant="list" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
