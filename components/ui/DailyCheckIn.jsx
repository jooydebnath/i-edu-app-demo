'use client';
import { useEffect, useState } from 'react';
import { Check, Award, X } from 'lucide-react';

const STORAGE_KEY = 'iedu.dailyCheck';
const WEEKLY_BADGE_KEY = 'iedu.weeklyBadge';
const LAST_SEEN_KEY = 'iedu.dailyCheckLastSeen';

function getWeekData() {
  try { const raw = window.localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : {}; }
  catch { return {}; }
}
function saveWeekData(data) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}
function getWeeklyBadges() {
  try { const raw = window.localStorage.getItem(WEEKLY_BADGE_KEY); return raw ? JSON.parse(raw) : []; }
  catch { return []; }
}
function saveWeeklyBadges(badges) {
  try { window.localStorage.setItem(WEEKLY_BADGE_KEY, JSON.stringify(badges)); } catch {}
}
function getWeekKey(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return `${d.getUTCFullYear()}-W${Math.ceil(((d - yearStart) / 86400000 + 1) / 7)}`;
}
function formatDateKey(date) { return date.toISOString().split('T')[0]; }

export default function DailyCheckInPopup({ onClose }) {
  const [weekData, setWeekData] = useState(() => getWeekData());
  const [showBadge, setShowBadge] = useState(false);
  const [autoChecked, setAutoChecked] = useState(false);

  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekKey = getWeekKey(today);
  const todayKey = formatDateKey(today);
  const currentWeek = weekData[weekKey] || {};
  const isTodayChecked = !!currentWeek[todayKey];

  useEffect(() => {
    const lastSeen = (() => { try { return window.localStorage.getItem(LAST_SEEN_KEY); } catch { return null; } })();
    if (lastSeen !== todayKey && !isTodayChecked) {
      doCheckIn();
      setAutoChecked(true);
    }
    try { window.localStorage.setItem(LAST_SEEN_KEY, todayKey); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return { label: dayNames[i], dateKey: formatDateKey(d), isToday: formatDateKey(d) === todayKey, checked: !!currentWeek[formatDateKey(d)] };
  });

  const checkedCount = days.filter((d) => d.checked).length;
  const weeklyBadges = getWeeklyBadges();
  const hasWeeklyBadge = weeklyBadges.includes(weekKey);

  function doCheckIn() {
    if (!!currentWeek[todayKey]) return;
    const updated = { ...weekData, [weekKey]: { ...currentWeek, [todayKey]: true } };
    setWeekData(updated);
    saveWeekData(updated);
    const newCount = checkedCount + 1;
    if (newCount === 7 && !hasWeeklyBadge) {
      saveWeeklyBadges([...weeklyBadges, weekKey]);
      setTimeout(() => setShowBadge(true), 400);
      setTimeout(() => setShowBadge(false), 3500);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:w-[380px] mx-4 mb-6 sm:mb-0 bg-white rounded-3xl shadow-2xl p-5 animate-slide-in-up">
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 hover:text-slate-700 transition-colors active:scale-95">
          <X size={16} strokeWidth={2.5} />
        </button>
        <div className="text-center mb-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 flex items-center justify-center shadow-soft mb-2">
            <Check size={28} strokeWidth={2.5} className="text-accent-400 animate-wiggle" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">Daily Check-in</h3>
          <p className="text-[12px] text-slate-500 mt-0.5">
            {autoChecked ? 'Auto checked in for today! 🎉' : isTodayChecked ? 'Already checked in today' : 'Mark your attendance'}
          </p>
        </div>
        <div className="flex items-center justify-between gap-1.5 mb-4">
          {days.map((d) => (
            <div key={d.dateKey} className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-300 ${d.isToday ? 'ring-2 ring-brand-300 scale-105' : ''} ${d.checked ? 'bg-brand-50 text-brand-700' : 'bg-slate-50 text-slate-400'}`}>
              <span className="text-[10px] font-bold">{d.label}</span>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${d.checked ? 'bg-brand-600 text-white shadow-soft' : 'bg-white border border-slate-200'}`}>
                {d.checked ? <Check size={14} strokeWidth={3} /> : new Date(d.dateKey).getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-brand-600 to-accent-500 rounded-full transition-all duration-500" style={{ width: `${(checkedCount / 7) * 100}%` }} /></div>
            <span className="text-[10px] font-bold text-slate-500">{checkedCount}/7</span>
          </div>
          {hasWeeklyBadge && <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-1 rounded-md flex items-center gap-1"><Award size={12} className="animate-wiggle" /> Weekly Badge</span>}
        </div>
        {!isTodayChecked && (
          <button onClick={() => doCheckIn()} className="w-full bg-accent-500 hover:bg-accent-400 text-brand-900 text-sm font-extrabold py-2.5 rounded-xl shadow-soft hover:shadow-glow active:scale-95 transition-all animate-bounce-in">Check In Now</button>
        )}
        {showBadge && (
          <div className="mt-3 bg-gradient-to-r from-accent-400 to-accent-600 text-brand-900 rounded-xl p-2.5 text-center animate-pop-in flex items-center justify-center gap-2 shadow-soft">
            <Award size={18} className="animate-wiggle" />
            <span className="text-xs font-extrabold">Weekly Mark Earned! 🎉</span>
          </div>
        )}
      </div>
    </div>
  );
}
