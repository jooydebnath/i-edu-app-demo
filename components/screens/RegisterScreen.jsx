'use client';
import { useState } from 'react';
import { Eye, EyeOff, Smartphone, Lock, User, Sparkles } from 'lucide-react';

export default function RegisterScreen({ onRegister, onGoLogin }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setErr('Name is required'); return; }
    if (!mobile || mobile.length < 10) { setErr('Valid mobile required'); return; }
    if (!password || password.length < 6) { setErr('Password must be 6+ chars'); return; }
    if (password !== confirm) { setErr('Passwords do not match'); return; }
    setErr(''); setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false); onRegister({ name, mobile });
  };

  return (
    <div className="animate-fade-in flex flex-col px-6 pt-10 pb-6 min-h-full">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 flex items-center justify-center shadow-soft">
          <Sparkles size={32} className="text-accent-400 animate-wiggle" />
        </div>
        <h1 className="text-2xl font-extrabold text-brand-800 mt-4">Create Account</h1>
        <p className="text-sm text-slate-500 mt-1">Join iEducation today</p>
      </div>

      <button className="group w-full flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-2xl py-3 shadow-card hover:shadow-md active:scale-[0.98] transition-all mb-6">
        <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
        <span className="text-sm font-bold text-slate-700">Sign up with Google</span>
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[11px] font-bold text-slate-400 uppercase">or</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <form onSubmit={submit} className="space-y-3.5">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Full Name</label>
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-card focus-within:ring-2 focus-within:ring-brand-300 focus-within:border-brand-400 transition-all">
            <User size={18} className="text-slate-400 shrink-0" />
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); setErr(''); }} placeholder="Your full name" className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400" />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Mobile Number</label>
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-card focus-within:ring-2 focus-within:ring-brand-300 focus-within:border-brand-400 transition-all">
            <Smartphone size={18} className="text-slate-400 shrink-0" />
            <input type="tel" inputMode="numeric" value={mobile} onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '').slice(0, 11)); setErr(''); }} placeholder="01XXXXXXXXX" className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400" />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Password</label>
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-card focus-within:ring-2 focus-within:ring-brand-300 focus-within:border-brand-400 transition-all">
            <Lock size={18} className="text-slate-400 shrink-0" />
            <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setErr(''); }} placeholder="Create password" className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400" />
            <button type="button" onClick={() => setShowPw((s) => !s)} className="text-slate-400 hover:text-brand-600 transition-colors">{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Confirm Password</label>
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-card focus-within:ring-2 focus-within:ring-brand-300 focus-within:border-brand-400 transition-all">
            <Lock size={18} className="text-slate-400 shrink-0" />
            <input type={showCf ? 'text' : 'password'} value={confirm} onChange={(e) => { setConfirm(e.target.value); setErr(''); }} placeholder="Re-enter password" className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400" />
            <button type="button" onClick={() => setShowCf((s) => !s)} className="text-slate-400 hover:text-brand-600 transition-colors">{showCf ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
        </div>
        {err && <p className="text-[11px] text-rose-600 text-center animate-pop-in">{err}</p>}
        <button type="submit" disabled={loading} className="w-full bg-gradient-to-br from-brand-700 to-brand-950 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-soft hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2">
          {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-xs text-slate-500 mt-6">
        Already have an account?{' '}
        <button onClick={onGoLogin} className="font-bold text-brand-700 hover:text-brand-900 transition-colors">Login</button>
      </p>
    </div>
  );
}
