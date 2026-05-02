'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Home as HomeIcon,
  GraduationCap,
  BookOpen,
  User,
  FileQuestion,
} from 'lucide-react';
import HomeScreen from './screens/HomeScreen';
import CoursesScreen from './screens/CoursesScreen';
import BooksScreen from './screens/BooksScreen';
import ProfileScreen from './screens/ProfileScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import CheckoutScreen, { SuccessOverlay } from './screens/CheckoutScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DailyCheckInPopup from './ui/DailyCheckIn';
import NotificationScreen from './screens/NotificationScreen';
import ExamScreen from './screens/ExamScreen';

const ONBOARDING_KEY = 'iedu.onboarded.v1';
const AUTH_KEY = 'iedu.auth.v1';

const TABS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'courses', label: 'Courses', icon: GraduationCap },
  { id: 'books', label: 'Books', icon: BookOpen },
  { id: 'exams', label: 'Exams', icon: FileQuestion },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function MobileApp() {
  const [tab, setTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  // view modes: null (tab content) | 'detail' | 'checkout'
  const [view, setView] = useState(null);
  const [orderResult, setOrderResult] = useState(null);
  // null = unknown (SSR/first paint), true = show onboarding, false = skip
  const [showOnboarding, setShowOnboarding] = useState(null);
  // auth: null = checking, false = not logged in, object = logged in user
  const [auth, setAuth] = useState(null);
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [inExam, setInExam] = useState(false);
  const scrollRef = useRef(null);

  // Determine onboarding + auth state (client-only, after mount)
  useEffect(() => {
    try {
      const seen = window.localStorage.getItem(ONBOARDING_KEY);
      setShowOnboarding(seen !== '1');
      const stored = window.localStorage.getItem(AUTH_KEY);
      setAuth(stored ? JSON.parse(stored) : false);
    } catch {
      setShowOnboarding(true);
      setAuth(false);
    }
  }, []);

  // Show daily check-in after onboarding is dismissed and user is logged in
  useEffect(() => {
    if (showOnboarding === false && auth && !showCheckIn) {
      const timer = setTimeout(() => setShowCheckIn(true), 600);
      return () => clearTimeout(timer);
    }
  }, [showOnboarding, auth]);

  const finishOnboarding = () => {
    try {
      window.localStorage.setItem(ONBOARDING_KEY, '1');
    } catch {}
    setShowOnboarding(false);
  };

  const replayOnboarding = () => {
    try {
      window.localStorage.removeItem(ONBOARDING_KEY);
    } catch {}
    setShowOnboarding(true);
  };

  const goTo = (id) => {
    setSelectedCourse(null);
    setView(null);
    setTab(id);
  };

  const openCourse = (course) => {
    setSelectedCourse(course);
    setView('detail');
  };

  const openCheckout = () => {
    if (selectedCourse) setView('checkout');
  };

  const closeView = () => {
    if (view === 'checkout') {
      setView('detail');
    } else {
      setView(null);
      setSelectedCourse(null);
    }
  };

  const handleOrderPlaced = (result) => {
    setOrderResult(result);
  };

  const handleLogin = (user) => {
    try {
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } catch {}
    setAuth(user);
  };

  const handleRegister = (user) => {
    try {
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } catch {}
    setAuth(user);
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem(AUTH_KEY);
    } catch {}
    setAuth(false);
    setTab('home');
    setView(null);
    setSelectedCourse(null);
  };

  const dismissSuccess = () => {
    setOrderResult(null);
    setView(null);
    setSelectedCourse(null);
    setTab('home');
  };

  // Reset scroll to top whenever the visible screen changes
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
  }, [tab, view, selectedCourse]);

  const showingDetail = view === 'detail';
  const showingCheckout = view === 'checkout';
  const showingNotifications = view === 'notifications';

  const openNotifications = () => setView('notifications');

  return (
    <div className="min-h-screen flex items-start justify-center px-0 sm:px-6 py-0 sm:py-8">
      {/* Phone frame */}
      <div className="relative w-full sm:w-[420px] sm:rounded-[40px] sm:shadow-phone bg-slate-50 overflow-hidden border border-transparent sm:border-slate-200">
        {/* Notch (visible only on desktop) */}
        <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 z-30 w-36 h-6 bg-slate-900 rounded-b-2xl items-center justify-center">
          <span className="w-2 h-2 bg-slate-700 rounded-full mr-2" />
          <span className="w-12 h-1.5 bg-slate-700 rounded-full" />
        </div>

        {/* Scrollable screen area */}
        <div
          ref={scrollRef}
          className="phone-scroll relative h-[100dvh] sm:h-[820px] overflow-y-auto pb-[88px] bg-slate-50"
        >
          {auth === null ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-2 border-brand-300 border-t-brand-700 rounded-full animate-spin" />
            </div>
          ) : !auth ? (
            authView === 'login' ? (
              <LoginScreen onLogin={handleLogin} onGoRegister={() => setAuthView('register')} />
            ) : (
              <RegisterScreen onRegister={handleRegister} onGoLogin={() => setAuthView('login')} />
            )
          ) : showingCheckout ? (
            <CheckoutScreen
              course={selectedCourse}
              onBack={closeView}
              onOrderPlaced={handleOrderPlaced}
            />
          ) : showingNotifications ? (
            <NotificationScreen onBack={closeView} />
          ) : showingDetail ? (
            <CourseDetailScreen course={selectedCourse} onBack={closeView} />
          ) : (
            <>
              {tab === 'home' && <HomeScreen onNavigate={goTo} onSelectCourse={openCourse} onOpenNotifications={openNotifications} />}
              {tab === 'courses' && <CoursesScreen onSelectCourse={openCourse} onOpenNotifications={openNotifications} />}
              {tab === 'books' && <BooksScreen onOpenNotifications={openNotifications} />}
              {tab === 'exams' && <ExamScreen onOpenNotifications={openNotifications} setInExam={setInExam} />}
              {tab === 'profile' && <ProfileScreen onReplayOnboarding={replayOnboarding} onLogout={handleLogout} onOpenNotifications={openNotifications} />}
            </>
          )}
        </div>

        {/* Sticky enroll bar (visible only on detail) */}
        {showingDetail && (
          <div className="absolute bottom-[68px] left-0 right-0 z-20 px-3 pb-1 animate-slide-in-up">
            <div className="bg-white rounded-2xl shadow-card p-2.5 flex items-center gap-3 ring-1 ring-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex-1 min-w-0 pl-1.5">
                <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">
                  Course Price
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-brand-800 animate-pulse-soft">
                    ৳{selectedCourse.price}
                  </span>
                  {selectedCourse.oldPrice && (
                    <span className="text-[11px] text-slate-400 line-through">
                      ৳{selectedCourse.oldPrice}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={openCheckout}
                className="group relative bg-accent-500 hover:bg-accent-400 text-brand-900 font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-soft hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden animate-glow"
              >
                {/* Shine sweep */}
                <span className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                  <span className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine" />
                </span>
                <span className="relative">Enroll Now</span>
              </button>
            </div>
          </div>
        )}

        {/* Success overlay (covers phone frame including bottom nav) */}
        {orderResult && (
          <SuccessOverlay
            course={orderResult.course}
            orderId={orderResult.orderId}
            total={orderResult.total}
            onDone={dismissSuccess}
          />
        )}

        {/* Onboarding (highest priority — first launch experience) */}
        {showOnboarding && <OnboardingScreen onDone={finishOnboarding} />}

        {/* Daily Check-in popup */}
        {showCheckIn && <DailyCheckInPopup onClose={() => setShowCheckIn(false)} />}

        {/* Bottom navigation (hidden when not logged in) */}
        {!!auth && !inExam && (
        <nav className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 pt-2 pb-2 bottom-safe">
          <ul className="flex items-end justify-between">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <li key={t.id} className="flex-1">
                  <button
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`group w-full flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-2xl transition-all duration-300 active:scale-90 ${
                      active ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    aria-label={t.label}
                  >
                    <span
                      className={`relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 ${
                        active
                          ? 'bg-gradient-to-br from-brand-700 to-brand-950 text-accent-400 shadow-soft scale-110 -translate-y-1 ring-2 ring-accent-400/40 animate-pop-in'
                          : 'bg-transparent group-hover:bg-slate-100 group-hover:scale-110'
                      }`}
                    >
                      {/* Active indicator pulse ring */}
                      {active && (
                        <span className="absolute inset-0 rounded-2xl ring-2 ring-accent-400/50 animate-ping opacity-75" />
                      )}
                      <Icon
                        size={20}
                        strokeWidth={active ? 2.4 : 2}
                        className={`relative transition-transform duration-300 ${
                          active ? 'animate-bounce-in' : 'group-hover:scale-110 group-hover:-rotate-6'
                        }`}
                      />
                    </span>
                    <span
                      className={`text-[10px] font-semibold transition-all duration-300 ${
                        active ? 'text-brand-800 scale-105 font-bold' : ''
                      }`}
                    >
                      {t.label}
                    </span>
                    {/* Active dot under label */}
                    {active && (
                      <span className="w-1 h-1 rounded-full bg-accent-500 animate-pulse" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        )}
      </div>
    </div>
  );
}
