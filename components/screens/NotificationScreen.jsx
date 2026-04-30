'use client';

import { useState } from 'react';
import { ArrowLeft, Bell, Trash2, CheckCircle2, Gift, BookOpen, Trophy, AlertCircle } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'promo',
    title: '50% Off All Courses!',
    message: 'Limited time offer — enroll in any HSC course at half price. Ends in 2 days!',
    time: '2 hours ago',
    read: false,
    icon: Gift,
    color: 'from-accent-500 to-accent-600',
    iconColor: 'text-brand-900',
  },
  {
    id: 2,
    type: 'course',
    title: 'New Course Available',
    message: 'Chemistry Masterclass by Dr. Rahman is now live. Check it out!',
    time: '5 hours ago',
    read: false,
    icon: BookOpen,
    color: 'from-brand-600 to-brand-800',
    iconColor: 'text-white',
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Weekly Badge Earned!',
    message: 'You completed 7-day check-in streak. Great discipline!',
    time: '1 day ago',
    read: true,
    icon: Trophy,
    color: 'from-amber-500 to-amber-600',
    iconColor: 'text-white',
  },
  {
    id: 4,
    type: 'alert',
    title: 'Live Class Starting Soon',
    message: 'Physics Live Session starts in 30 minutes. Don\'t miss it!',
    time: '1 day ago',
    read: true,
    icon: AlertCircle,
    color: 'from-rose-500 to-rose-600',
    iconColor: 'text-white',
  },
  {
    id: 5,
    type: 'system',
    title: 'Profile Updated',
    message: 'Your profile information was successfully updated.',
    time: '3 days ago',
    read: true,
    icon: CheckCircle2,
    color: 'from-emerald-500 to-emerald-600',
    iconColor: 'text-white',
  },
];

export default function NotificationScreen({ onBack }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // all | unread

  const filtered = filter === 'all' ? notifications : notifications.filter((n) => !n.read);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="animate-fade-in min-h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-br from-brand-700 via-brand-900 to-brand-950 text-white">
        <div className="px-5 pt-10 pb-4 sm:pt-7 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-extrabold">Notifications</h1>
            <p className="text-[11px] text-accent-300 font-semibold">{unreadCount} unread</p>
          </div>
          <button
            onClick={markAllRead}
            className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
            title="Mark all read"
          >
            <CheckCircle2 size={18} />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="px-5 pb-3 flex gap-2">
          {['all', 'unread'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[11px] font-extrabold px-3 py-1.5 rounded-xl transition-all duration-200 ${
                filter === f
                  ? 'bg-accent-500 text-brand-900 shadow-soft'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {f === 'all' ? `All (${notifications.length})` : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="px-5 mt-4 pb-8 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <Bell size={28} className="text-slate-300" />
            </div>
            <p className="text-sm font-extrabold text-slate-400">No notifications</p>
            <p className="text-[11px] text-slate-400 mt-1">
              {filter === 'unread' ? 'All caught up!' : 'Check back later for updates'}
            </p>
          </div>
        ) : (
          filtered.map((n) => {
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`w-full text-left group bg-white rounded-2xl p-3.5 shadow-card hover:shadow-lg transition-all duration-300 active:scale-[0.98] flex items-start gap-3 ${
                  !n.read ? 'ring-1 ring-brand-200' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${n.color} flex items-center justify-center shadow-soft shrink-0`}
                >
                  <Icon size={18} className={n.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`text-[13px] font-extrabold leading-tight ${!n.read ? 'text-slate-900' : 'text-slate-500'}`}>
                      {n.title}
                    </h4>
                    {!n.read && <span className="w-2 h-2 bg-accent-500 rounded-full shrink-0 mt-1 animate-pulse" />}
                  </div>
                  <p className={`text-[11px] mt-0.5 leading-snug ${!n.read ? 'text-slate-600' : 'text-slate-400'}`}>
                    {n.message}
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">{n.time}</p>
                </div>
              </button>
            );
          })
        )}

        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="w-full flex items-center justify-center gap-1.5 text-[11px] font-extrabold text-rose-500 hover:text-rose-600 py-2 mt-2 transition-colors"
          >
            <Trash2 size={14} />
            Clear All Notifications
          </button>
        )}
      </div>
    </div>
  );
}
