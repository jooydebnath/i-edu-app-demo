'use client';

import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Tag,
  User as UserIcon,
  Mail,
  Phone,
  Check,
  ShieldCheck,
  CreditCard,
  Building2,
  Sparkles,
  X,
  Lock,
  PartyPopper,
} from 'lucide-react';

import { user as defaultUser } from '../data';

const PAYMENT_METHODS = [
  {
    id: 'bkash',
    name: 'bKash',
    sub: 'Pay with your bKash account',
    color: 'from-pink-500 to-rose-600',
    text: 'bKash',
  },
  {
    id: 'nagad',
    name: 'Nagad',
    sub: 'Mobile financial service',
    color: 'from-orange-500 to-red-600',
    text: 'Nagad',
  },
  {
    id: 'rocket',
    name: 'Rocket',
    sub: 'Dutch-Bangla Bank Rocket',
    color: 'from-fuchsia-600 to-purple-700',
    text: 'Rocket',
  },
  {
    id: 'card',
    name: 'Credit / Debit Card',
    sub: 'Visa, Mastercard, Amex',
    color: 'from-brand-700 to-brand-950',
    icon: CreditCard,
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    sub: 'Direct bank transfer',
    color: 'from-slate-700 to-slate-900',
    icon: Building2,
  },
];

const VALID_PROMOS = {
  FIRST20: { off: 0.2, label: '20% off your first order' },
  IEDU500: { flat: 500, label: '৳500 off' },
  HSC26: { off: 0.15, label: '15% off HSC 26 batches' },
};

export default function CheckoutScreen({ course, onBack, onOrderPlaced }) {
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [agreed, setAgreed] = useState(true);
  const [name, setName] = useState(defaultUser.name);
  const [email, setEmail] = useState(defaultUser.email);
  const [phone, setPhone] = useState(defaultUser.phone);
  const [placing, setPlacing] = useState(false);

  const totals = useMemo(() => {
    const subtotal = course.oldPrice || course.price;
    const courseDiscount = course.oldPrice ? course.oldPrice - course.price : 0;
    let promoDiscount = 0;
    if (promo) {
      const data = VALID_PROMOS[promo];
      if (data) {
        promoDiscount = data.flat ? data.flat : Math.round(course.price * data.off);
      }
    }
    const tax = 0; // no tax for digital courses
    const total = Math.max(0, course.price - promoDiscount + tax);
    return { subtotal, courseDiscount, promoDiscount, tax, total };
  }, [course, promo]);

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (VALID_PROMOS[code]) {
      setPromo(code);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromo(null);
    }
  };

  const removePromo = () => {
    setPromo(null);
    setPromoInput('');
    setPromoError('');
  };

  const placeOrder = () => {
    if (!agreed) return;
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      const orderId = `IEDU-${Math.floor(100000 + Math.random() * 900000)}`;
      onOrderPlaced?.({
        orderId,
        total: totals.total,
        course,
        paymentMethod,
      });
    }, 900);
  };

  return (
    <div className="animate-fade-in pb-32 relative">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-br from-brand-700 via-brand-900 to-brand-950 text-white px-5 pt-10 pb-5 sm:pt-7 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-500/15 rounded-full blur-2xl" />
        <div className="flex items-center gap-3 relative">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center hover:bg-white/25 transition"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-wider font-bold text-accent-300">
              Step 2 of 2
            </p>
            <h1 className="text-lg font-extrabold">Checkout</h1>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-accent-500 text-brand-900 px-2 py-1 rounded-full shadow-soft">
            <Lock size={10} /> Secure
          </span>
        </div>
      </div>

      {/* Order summary */}
      <section className="px-5 mt-4">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Order Summary
        </h2>
        <div className="bg-white rounded-2xl shadow-card p-3 flex gap-3">
          <div
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-3xl shadow-soft shrink-0`}
          >
            {course.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm text-slate-900 leading-tight line-clamp-2">
              {course.title}
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">By {course.instructor}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-base font-extrabold text-brand-800">৳{course.price}</span>
              {course.oldPrice && (
                <span className="text-[11px] text-slate-400 line-through">৳{course.oldPrice}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Promo code */}
      <section className="px-5 mt-5">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Promo Code
        </h2>
        {promo ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
              <Check size={16} strokeWidth={3} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm text-emerald-700">{promo} applied</p>
              <p className="text-[11px] text-emerald-600">{VALID_PROMOS[promo].label}</p>
            </div>
            <button
              onClick={removePromo}
              className="w-8 h-8 rounded-full bg-white text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition"
              aria-label="Remove promo"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-card p-1.5 flex items-center gap-2">
              <span className="pl-2 text-slate-400">
                <Tag size={16} />
              </span>
              <input
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                placeholder="Try FIRST20, IEDU500 or HSC26"
                className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none py-2"
              />
              <button
                onClick={applyPromo}
                className="bg-gradient-to-r from-brand-700 to-brand-950 text-accent-400 text-xs font-extrabold px-4 py-2 rounded-xl shadow-soft"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-[11px] text-rose-600 mt-1.5 ml-1 font-semibold">{promoError}</p>
            )}
          </>
        )}
      </section>

      {/* Customer info */}
      <section className="px-5 mt-5">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Customer Information
        </h2>
        <div className="bg-white rounded-2xl shadow-card p-3 space-y-2.5">
          <Field icon={UserIcon} value={name} onChange={setName} placeholder="Full name" />
          <Field icon={Mail} value={email} onChange={setEmail} placeholder="Email address" type="email" />
          <Field icon={Phone} value={phone} onChange={setPhone} placeholder="Phone number" />
        </div>
      </section>

      {/* Payment method */}
      <section className="px-5 mt-5">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Payment Method
        </h2>
        <div className="space-y-2">
          {PAYMENT_METHODS.map((m, idx) => {
            const active = paymentMethod === m.id;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`group w-full flex items-center gap-3 p-3 rounded-2xl shadow-card transition-all duration-300 text-left active:scale-[0.99] animate-slide-in-up ${
                  active
                    ? 'bg-white ring-2 ring-brand-700 scale-[1.02] shadow-lg'
                    : 'bg-white hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md'
                }`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white shadow-soft shrink-0 transition-transform duration-300 ${
                    active ? 'scale-110 rotate-6 shadow-glow' : 'group-hover:scale-110 group-hover:rotate-6'
                  }`}
                >
                  {Icon ? (
                    <Icon size={20} className={active ? 'animate-wiggle' : 'group-hover:animate-wiggle'} />
                  ) : (
                    <span className="text-[11px] font-extrabold tracking-tight">{m.text}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm truncate transition-colors ${active ? 'text-brand-700' : 'text-slate-900'}`}>
                    {m.name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{m.sub}</p>
                </div>
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                    active
                      ? 'border-brand-700 bg-brand-700 scale-110'
                      : 'border-slate-300 bg-white group-hover:border-brand-400'
                  }`}
                >
                  {active && (
                    <Check size={12} className="text-accent-400 animate-bounce-in" strokeWidth={3} />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Bill summary */}
      <section className="px-5 mt-5">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Bill Details
        </h2>
        <div className="bg-white rounded-2xl shadow-card p-4 space-y-2">
          <Row label="Subtotal" value={`৳${totals.subtotal.toLocaleString()}`} />
          {totals.courseDiscount > 0 && (
            <Row
              label="Course discount"
              value={`-৳${totals.courseDiscount.toLocaleString()}`}
              valueClass="text-emerald-600 font-bold"
            />
          )}
          {totals.promoDiscount > 0 && (
            <Row
              label={`Promo (${promo})`}
              value={`-৳${totals.promoDiscount.toLocaleString()}`}
              valueClass="text-emerald-600 font-bold"
            />
          )}
          <div className="border-t border-dashed border-slate-200 my-2" />
          <Row
            label="Total"
            value={`৳${totals.total.toLocaleString()}`}
            labelClass="font-extrabold text-slate-900 text-base"
            valueClass="font-extrabold text-brand-800 text-lg"
          />
        </div>
      </section>

      {/* Trust banner */}
      <section className="px-5 mt-4">
        <div className="group bg-brand-50 rounded-2xl p-3 flex items-center gap-3 hover:bg-brand-100 transition-colors animate-slide-in-up">
          <div className="w-10 h-10 rounded-xl bg-brand-700 text-accent-400 flex items-center justify-center shadow-soft animate-glow">
            <ShieldCheck size={18} className="animate-pulse-soft" />
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-bold text-brand-900">100% Secure Payment</p>
            <p className="text-[10px] text-brand-700/80">
              SSL encrypted. 7 days money-back guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="px-5 mt-4">
        <label className="flex items-start gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="sr-only peer"
          />
          <span
            className={`w-5 h-5 rounded-md border-2 mt-0.5 flex items-center justify-center transition shrink-0 ${
              agreed ? 'bg-brand-700 border-brand-700' : 'bg-white border-slate-300'
            }`}
          >
            {agreed && <Check size={12} className="text-accent-400" strokeWidth={3} />}
          </span>
          <span className="text-[12px] text-slate-600 leading-snug">
            I agree to the{' '}
            <span className="font-bold text-brand-700">Terms & Conditions</span> and{' '}
            <span className="font-bold text-brand-700">Refund Policy</span> of iEducation.
          </span>
        </label>
      </section>

      {/* Place order bar (sticky) */}
      <div className="sticky bottom-[78px] z-10 mx-3 mt-5">
        <div className="bg-white rounded-2xl shadow-card p-2.5 flex items-center gap-3 ring-1 ring-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex-1 min-w-0 pl-1.5">
            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">
              Total Payable
            </p>
            <span className="text-lg font-extrabold text-brand-800">
              ৳{totals.total.toLocaleString()}
            </span>
          </div>
          <button
            onClick={placeOrder}
            disabled={!agreed || placing}
            className={`group relative text-sm font-extrabold px-5 py-2.5 rounded-xl shadow-soft transition-all duration-200 overflow-hidden ${
              agreed && !placing
                ? 'bg-accent-500 hover:bg-accent-400 text-brand-900 hover:shadow-glow hover:scale-105 active:scale-95 animate-glow'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {agreed && !placing && (
              <span className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <span className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine" />
              </span>
            )}
            <span className="relative inline-flex items-center gap-1.5">
              {placing && (
                <span className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              )}
              {placing ? 'Processing…' : 'Place Order'}
            </span>
          </button>
        </div>
      </div>

    </div>
  );
}

function Field({ icon: Icon, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-brand-400 focus-within:bg-white transition">
      <Icon size={16} className="text-slate-400" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400"
      />
    </div>
  );
}

function Row({ label, value, labelClass = '', valueClass = '' }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={`text-slate-600 ${labelClass}`}>{label}</span>
      <span className={`font-semibold text-slate-800 ${valueClass}`}>{value}</span>
    </div>
  );
}

export function SuccessOverlay({ course, orderId, total, onDone }) {
  return (
    <div className="absolute inset-0 z-30 bg-white animate-fade-in flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-12">
        <div className="relative">
          <div className="absolute inset-0 bg-accent-300/40 blur-2xl rounded-full" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-brand-700 to-brand-950 text-accent-400 flex items-center justify-center shadow-phone animate-slide-up">
            <Check size={48} strokeWidth={3} />
          </div>
        </div>
        <PartyPopper className="text-accent-500 mt-4" size={28} />
        <h2 className="text-xl font-extrabold text-brand-900 mt-2">Payment Successful!</h2>
        <p className="text-sm text-slate-600 mt-1 max-w-[260px]">
          Welcome aboard! Your access to{' '}
          <span className="font-bold text-brand-800">{course.title}</span> is unlocked.
        </p>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-card p-4 w-full max-w-xs mt-6 text-left">
          <div className="flex items-center justify-between text-[11px] text-slate-500 uppercase tracking-wider font-bold">
            <span>Order ID</span>
            <span className="text-brand-700">{orderId}</span>
          </div>
          <div className="border-t border-dashed border-slate-200 my-3" />
          <div className="flex items-center gap-2.5">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-2xl shrink-0`}
            >
              {course.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-slate-900 truncate">{course.title}</p>
              <p className="text-[11px] text-slate-500">By {course.instructor}</p>
            </div>
          </div>
          <div className="border-t border-dashed border-slate-200 my-3" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Total Paid</span>
            <span className="font-extrabold text-brand-800">৳{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 mt-4 inline-flex items-center gap-1">
          <Sparkles size={12} className="text-accent-500" /> Confirmation email sent to your inbox
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-5 pb-[88px] pt-3 space-y-2">
        <button
          onClick={onDone}
          className="w-full bg-accent-500 hover:bg-accent-400 text-brand-900 font-extrabold text-sm py-3 rounded-2xl shadow-soft transition"
        >
          Start Learning Now →
        </button>
        <button
          onClick={onDone}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3 rounded-2xl transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
