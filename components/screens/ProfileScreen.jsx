'use client';

import { useState } from 'react';
import {
  User as UserIcon,
  Mail,
  Phone,
  Edit3,
  LogOut,
  Trash2,
  Bell,
  Lock,
  HelpCircle,
  Globe,
  Moon,
  Sparkles,
  ChevronRight,
  Shield,
  CreditCard,
  Award,
  Flame,
  X,
  Check,
  BookOpen,
  BarChart3,
  MessageCircleQuestion,
  Info,
  Receipt,
  Bot,
  ShoppingBag,
  PlayCircle,
  FileText,
  Clock,
  Star,
  TrendingUp,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Send,
} from 'lucide-react';

import Header from '../ui/Header';
import SectionTitle from '../ui/SectionTitle';
import { user as userData, courses } from '../data';

const PROFILE_TABS = [
  { id: 'mycourses', label: 'My Courses', icon: BookOpen },
  { id: 'results', label: 'Results', icon: BarChart3 },
  { id: 'doubts', label: 'Doubts', icon: MessageCircleQuestion },
  { id: 'about', label: 'About', icon: Info },
  { id: 'invoices', label: 'Invoices', icon: Receipt },
  { id: 'chatai', label: 'Chat Ai', icon: Bot },
  { id: 'myorders', label: 'My Orders', icon: ShoppingBag },
];

export default function ProfileScreen({ onReplayOnboarding, onLogout, onOpenNotifications }) {
  const [user, setUser] = useState(userData);
  const [editing, setEditing] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toast, setToast] = useState(null);
  const [profileTab, setProfileTab] = useState('mycourses');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <div className="animate-fade-in">
      <Header title="Profile" subtitle="My account" showSearch={false} onNotificationClick={onOpenNotifications} />

      {/* Profile card */}
      <section className="px-5 mt-5 relative z-10">
        <div className="bg-white rounded-3xl shadow-card p-4 animate-bounce-in">
          <div className="flex items-center gap-3">
            <div className="group relative">
              <div
                className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-white text-2xl font-extrabold shadow-soft cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-glow overflow-hidden`}
              >
                {/* Shine sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                <span className="relative">
                  {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              {/* Online indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-base text-slate-900 truncate">{user.name}</h3>
              <p className="text-[12px] text-slate-500 truncate">{user.email}</p>
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md hover:bg-brand-100 transition-colors">
                <Award size={10} className="animate-twinkle" /> {user.level}
              </span>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="group w-10 h-10 rounded-xl bg-brand-50 hover:bg-brand-100 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center text-brand-600"
              aria-label="Edit profile"
            >
              <Edit3 size={16} className="group-hover:animate-wiggle" />
            </button>
          </div>
        </div>
      </section>

      {/* Horizontal tab menu */}
      <section className="mt-5 sticky top-0 z-10 bg-slate-50/95 backdrop-blur-md px-0">
        <div className="flex gap-1 overflow-x-auto no-scrollbar px-5 pb-1 pt-1">
          {PROFILE_TABS.map((t) => {
            const Icon = t.icon;
            const active = profileTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setProfileTab(t.id)}
                className={`relative shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-95 ${
                  active
                    ? 'text-brand-700 bg-white shadow-soft'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'
                }`}
              >
                <Icon size={14} strokeWidth={active ? 2.6 : 2} className={active ? 'animate-wiggle' : ''} />
                {t.label}
                {active && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-500 rounded-full animate-bounce-in" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Tab content */}
      <section className="px-5 mt-4 mb-6">
        {profileTab === 'mycourses' && <MyCoursesTab onEdit={() => setEditing(true)} />}
        {profileTab === 'results' && <ResultsTab user={user} />}
        {profileTab === 'doubts' && <DoubtsTab />}
        {profileTab === 'about' && <AboutTab />}
        {profileTab === 'invoices' && <InvoicesTab />}
        {profileTab === 'chatai' && <ChatAiTab />}
        {profileTab === 'myorders' && <MyOrdersTab />}
      </section>

      {/* Danger zone */}
      <section className="px-5 mt-6 mb-6 space-y-3">
        <button
          onClick={() => setConfirmLogout(true)}
          className="group w-full bg-white rounded-2xl shadow-card p-4 flex items-center justify-between hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center transition-all duration-300 group-hover:bg-amber-100 group-hover:scale-110 group-hover:rotate-6">
              <LogOut size={18} className="group-hover:animate-wiggle" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-slate-900 group-hover:text-brand-700 transition-colors">Logout</p>
              <p className="text-[11px] text-slate-500">Sign out of your account</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-600" />
        </button>

        <button
          onClick={() => setConfirmDelete(true)}
          className="group w-full bg-white rounded-2xl shadow-card p-4 flex items-center justify-between hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 border border-rose-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center transition-all duration-300 group-hover:bg-rose-100 group-hover:scale-110 group-hover:rotate-6">
              <Trash2 size={18} className="group-hover:animate-wiggle" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-rose-600">Delete Account</p>
              <p className="text-[11px] text-slate-500">
                Permanently delete your account and data
              </p>
            </div>
          </div>
          <ChevronRight size={16} className="text-rose-400 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p className="text-center text-[10px] text-slate-400 pt-2">
          iEducation v1.0.0 • Joined {user.joined}
        </p>
      </section>

      {/* Edit Profile modal */}
      {editing && (
        <Modal onClose={() => setEditing(false)} title="Edit Profile">
          <EditProfileForm
            user={user}
            onSave={(u) => {
              setUser(u);
              setEditing(false);
              showToast('Profile updated');
            }}
            onCancel={() => setEditing(false)}
          />
        </Modal>
      )}

      {/* Logout confirmation */}
      {confirmLogout && (
        <Modal onClose={() => setConfirmLogout(false)} title="Logout">
          <p className="text-sm text-slate-600">
            Are you sure you want to logout? You can sign back in anytime.
          </p>
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setConfirmLogout(false)}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setConfirmLogout(false);
                showToast('Logged out (demo)');
              }}
              className="flex-1 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-sm shadow-soft"
            >
              Logout
            </button>
          </div>
        </Modal>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <Modal onClose={() => setConfirmDelete(false)} title="Delete Account">
          <div className="bg-rose-50 text-rose-700 rounded-xl p-3 text-[12px] mb-3">
            This action is permanent. All your courses, progress, and data will be erased.
          </div>
          <p className="text-sm text-slate-600">
            Type <span className="font-bold text-rose-600">DELETE</span> to confirm.
          </p>
          <DeleteAccountConfirm
            onCancel={() => setConfirmDelete(false)}
            onConfirm={() => {
              setConfirmDelete(false);
              showToast('Account deletion requested (demo)');
            }}
          />
        </Modal>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-card z-40 animate-slide-up flex items-center gap-2">
          <Check size={14} className="text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

function Row({ icon: Icon, label, value, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-all duration-200 text-left active:scale-[0.99]"
    >
      <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-100 group-hover:scale-110 group-hover:rotate-6">
        <Icon size={16} className="group-hover:animate-wiggle" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
          {label}
        </p>
        {value && <p className="text-[11px] text-slate-500 truncate">{value}</p>}
      </div>
      {badge && (
        <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-md group-hover:bg-brand-100 group-hover:scale-105 transition-all">
          {badge}
        </span>
      )}
      <ChevronRight
        size={14}
        className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-600"
      />
    </button>
  );
}

function Modal({ children, onClose, title }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-5 shadow-card animate-slide-up max-h-[88%] overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-base text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function EditProfileForm({ user, onSave, onCancel }) {
  const [form, setForm] = useState(user);

  const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
      className="space-y-3"
    >
      <Field label="Full Name" value={form.name} onChange={change('name')} icon={UserIcon} />
      <Field label="Email" value={form.email} onChange={change('email')} icon={Mail} type="email" />
      <Field label="Phone" value={form.phone} onChange={change('phone')} icon={Phone} />
      <Field label="Class / Level" value={form.level} onChange={change('level')} icon={Award} />
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-700 to-brand-950 text-accent-400 font-extrabold text-sm shadow-soft ring-2 ring-accent-500/30"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, icon: Icon, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
      <div className="mt-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-brand-400 focus-within:bg-white transition">
        <Icon size={16} className="text-slate-400" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400"
        />
      </div>
    </label>
  );
}

function DeleteAccountConfirm({ onCancel, onConfirm }) {
  const [text, setText] = useState('');
  const ok = text === 'DELETE';
  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type DELETE"
        className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 outline-none text-sm focus:border-rose-400 focus:bg-white"
      />
      <div className="flex gap-2 mt-4">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={!ok}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition ${
            ok
              ? 'bg-rose-600 text-white shadow-soft'
              : 'bg-rose-100 text-rose-300 cursor-not-allowed'
          }`}
        >
          Delete Forever
        </button>
      </div>
    </div>
  );
}

/* ───────── Tab content components ───────── */

function MyCoursesTab({ onEdit }) {
  const enrolled = courses.slice(0, 3);
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-slate-900">Enrolled Courses</h3>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
          3 active
        </span>
      </div>
      {enrolled.map((c, idx) => (
        <div
          key={c.id}
          className="group bg-white rounded-2xl shadow-card p-3 flex items-center gap-3 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 cursor-pointer animate-slide-in-up"
          style={{ animationDelay: `${idx * 80}ms` }}
        >
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-2xl shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
          >
            <span className="group-hover:animate-wiggle">{c.emoji}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-slate-900 truncate group-hover:text-brand-700 transition-colors">
              {c.title}
            </p>
            <p className="text-[11px] text-slate-500">
              By {c.instructor} • {c.progress || '45'}% complete
            </p>
            <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-500 rounded-full transition-all duration-500"
                style={{ width: `${c.progress || 45}%` }}
              />
            </div>
          </div>
          <ChevronRight
            size={16}
            className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-600"
          />
        </div>
      ))}
      <button
        onClick={onEdit}
        className="w-full py-2.5 rounded-xl bg-white shadow-card text-xs font-bold text-brand-700 hover:shadow-md hover:bg-brand-50 transition-all active:scale-[0.99]"
      >
        + Enroll in more courses
      </button>
    </div>
  );
}

function ResultsTab({ user }) {
  const recent = [
    { subject: 'HSC Physics', score: 92, total: 100, date: '28 Apr', status: 'pass' },
    { subject: 'HSC Chemistry', score: 78, total: 100, date: '25 Apr', status: 'pass' },
    { subject: 'Admission Math', score: 64, total: 100, date: '22 Apr', status: 'review' },
    { subject: 'Weekly Quiz', score: 45, total: 50, date: '20 Apr', status: 'pass' },
  ];
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Stat cards like image 2 */}
      <div className="grid grid-cols-3 gap-2">
        <div className="group bg-gradient-to-br from-accent-400 to-accent-600 text-brand-900 rounded-2xl p-3 text-center shadow-soft cursor-pointer hover:shadow-glow hover:-translate-y-1 transition-all duration-300 animate-bounce-in">
          <Flame size={16} strokeWidth={2.5} className="mx-auto animate-wiggle" />
          <p className="text-lg font-extrabold mt-1 group-hover:scale-110 transition-transform">{user.streak}</p>
          <p className="text-[10px] font-semibold text-brand-900/80">Day Streak</p>
        </div>
        <div
          className="group bg-gradient-to-br from-brand-700 to-brand-950 text-white rounded-2xl p-3 text-center shadow-soft cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-bounce-in"
          style={{ animationDelay: '80ms' }}
        >
          <p className="text-lg font-extrabold text-accent-400 mt-1 group-hover:scale-110 transition-transform inline-block">
            {user.points}
          </p>
          <p className="text-[10px] text-white/85">XP Points</p>
        </div>
        <div
          className="group bg-gradient-to-br from-brand-500 to-brand-800 text-white rounded-2xl p-3 text-center shadow-soft cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-bounce-in"
          style={{ animationDelay: '160ms' }}
        >
          <p className="text-lg font-extrabold text-accent-400 mt-1 group-hover:scale-110 transition-transform inline-block">12</p>
          <p className="text-[10px] text-white/85">Courses</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-extrabold text-slate-900 mb-2">Recent Results</h3>
        <div className="space-y-2">
          {recent.map((r, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl shadow-card p-3 flex items-center gap-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-slide-in-left"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-soft shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  r.status === 'pass'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-amber-50 text-amber-600'
                }`}
              >
                {r.status === 'pass' ? (
                  <CheckCircle2 size={18} className="group-hover:animate-wiggle" />
                ) : (
                  <AlertCircle size={18} className="group-hover:animate-wiggle" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-900">{r.subject}</p>
                <p className="text-[11px] text-slate-500">
                  {r.score}/{r.total} • {r.date}
                </p>
              </div>
              <span
                className={`text-xs font-extrabold px-2 py-1 rounded-lg ${
                  r.status === 'pass'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {Math.round((r.score / r.total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DoubtsTab() {
  const doubts = [
    {
      id: 1,
      title: 'How to solve integration by parts?',
      subject: 'HSC Math',
      status: 'answered',
      replies: 3,
      time: '2h ago',
    },
    {
      id: 2,
      title: "Explain Newton's third law with real examples",
      subject: 'HSC Physics',
      status: 'pending',
      replies: 0,
      time: '5h ago',
    },
    {
      id: 3,
      title: 'Difference between SN1 and SN2 reactions',
      subject: 'HSC Chemistry',
      status: 'answered',
      replies: 5,
      time: '1d ago',
    },
  ];
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-slate-900">My Doubts</h3>
        <button className="text-[11px] font-bold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-xl hover:bg-brand-100 transition-colors active:scale-95">
          + Ask New
        </button>
      </div>
      {doubts.map((d, idx) => (
        <div
          key={d.id}
          className="group bg-white rounded-2xl shadow-card p-3 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 cursor-pointer animate-slide-in-up"
          style={{ animationDelay: `${idx * 70}ms` }}
        >
          <div className="flex items-start gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 ${
                d.status === 'answered'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-amber-50 text-amber-600'
              }`}
            >
              {d.status === 'answered' ? (
                <CheckCircle2 size={15} className="group-hover:animate-wiggle" />
              ) : (
                <Clock size={15} className="group-hover:animate-wiggle" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                {d.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded-md">
                  {d.subject}
                </span>
                <span className="text-[10px] text-slate-400">{d.time}</span>
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <MessageCircleQuestion size={11} className="text-slate-400" />
                <span className="text-[10px] text-slate-500">
                  {d.replies} {d.replies === 1 ? 'reply' : 'replies'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AboutTab() {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-card p-4 text-center animate-bounce-in">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 flex items-center justify-center text-accent-400 shadow-soft animate-glow">
          <Sparkles size={24} className="animate-wiggle" />
        </div>
        <h3 className="text-base font-extrabold text-slate-900 mt-3">iEducation</h3>
        <p className="text-[11px] text-slate-500 mt-1">Version 1.0.0</p>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-4 space-y-3 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">About Us</h4>
        <p className="text-[12px] text-slate-600 leading-relaxed">
          iEducation is Bangladesh's leading online learning platform for HSC, SSC, Admission, and
          skill-based courses. We bring top teachers, structured courses, and personalized learning
          to your pocket.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-4 space-y-3 animate-slide-in-up" style={{ animationDelay: '180ms' }}>
        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Contact</h4>
        <div className="space-y-2 text-[12px] text-slate-600">
          <p className="flex items-center gap-2">
            <Mail size={13} className="text-brand-600" /> support@ieducation.com
          </p>
          <p className="flex items-center gap-2">
            <Phone size={13} className="text-brand-600" /> 01600-123456
          </p>
          <p className="flex items-center gap-2">
            <Globe size={13} className="text-brand-600" /> www.ieducation.com
          </p>
        </div>
      </div>
    </div>
  );
}

function InvoicesTab() {
  const invoices = [
    { id: 'INV-240428', course: 'HSC Physics Crash Course', amount: 1299, date: '28 Apr 2024', status: 'paid' },
    { id: 'INV-240315', course: 'Admission Math Mastery', amount: 2499, date: '15 Mar 2024', status: 'paid' },
    { id: 'INV-240201', course: 'HSC Chemistry Pro', amount: 1599, date: '01 Feb 2024', status: 'paid' },
  ];
  return (
    <div className="space-y-3 animate-fade-in">
      <h3 className="text-sm font-extrabold text-slate-900">Invoices</h3>
      {invoices.map((inv, idx) => (
        <div
          key={inv.id}
          className="group bg-white rounded-2xl shadow-card p-3 flex items-center gap-3 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 cursor-pointer animate-slide-in-up"
          style={{ animationDelay: `${idx * 70}ms` }}
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Receipt size={18} className="group-hover:animate-wiggle" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-slate-900 group-hover:text-brand-700 transition-colors truncate">
              {inv.course}
            </p>
            <p className="text-[10px] text-slate-500">
              {inv.id} • {inv.date}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-extrabold text-slate-900">৳{inv.amount}</p>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              {inv.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatAiTab() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hello! I am iEdu AI. Ask me anything about your courses, doubts, or study tips.' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { from: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: 'ai',
          text: "That's a great question! Let me find the best explanation for you from your course materials.",
        },
      ]);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      <div className="bg-gradient-to-br from-brand-700 to-brand-950 rounded-2xl p-3 text-white flex items-center gap-3 shadow-card animate-bounce-in">
        <div className="w-10 h-10 rounded-xl bg-accent-500 text-brand-900 flex items-center justify-center shadow-soft">
          <Bot size={20} className="animate-wiggle" />
        </div>
        <div>
          <p className="font-bold text-sm">iEdu AI Assistant</p>
          <p className="text-[10px] text-white/80">Online • Ready to help</p>
        </div>
        <span className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} animate-pop-in`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-snug shadow-soft ${
                msg.from === 'user'
                  ? 'bg-brand-700 text-white rounded-br-md'
                  : 'bg-white text-slate-700 rounded-bl-md'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-white rounded-2xl shadow-card p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none px-2"
        />
        <button
          onClick={send}
          className="w-9 h-9 rounded-xl bg-accent-500 text-brand-900 flex items-center justify-center shadow-soft hover:shadow-glow hover:scale-110 active:scale-95 transition-all"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

function MyOrdersTab() {
  const orders = [
    { id: '#ORD-7842', item: 'HSC Physics Crash Course', price: 1299, date: '28 Apr 2024', status: 'completed' },
    { id: '#ORD-7651', item: 'Admission Math Mastery', price: 2499, date: '15 Mar 2024', status: 'completed' },
    { id: '#ORD-7103', item: 'SSC English Grammar Book', price: 349, date: '10 Feb 2024', status: 'completed' },
    { id: '#ORD-6902', item: 'HSC Chemistry Pro', price: 1599, date: '01 Jan 2024', status: 'completed' },
  ];
  return (
    <div className="space-y-3 animate-fade-in">
      <h3 className="text-sm font-extrabold text-slate-900">Order History</h3>
      {orders.map((o, idx) => (
        <div
          key={o.id}
          className="group bg-white rounded-2xl shadow-card p-3 flex items-center gap-3 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 animate-slide-in-up"
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          <div className="w-10 h-10 rounded-xl bg-accent-100 text-brand-700 flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <ShoppingBag size={18} className="group-hover:animate-wiggle" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-slate-900 group-hover:text-brand-700 transition-colors truncate">
              {o.item}
            </p>
            <p className="text-[10px] text-slate-500">
              {o.id} • {o.date}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-extrabold text-brand-800">৳{o.price}</p>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              {o.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
