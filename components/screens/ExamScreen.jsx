'use client';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { FileQuestion, Clock, BarChart3, CheckCircle2, PlayCircle, Filter, Award, ArrowLeft, ChevronLeft, ChevronRight, Flag, Check, X, Eye, RotateCcw, AlertTriangle, Trophy, HelpCircle, Zap, Star, Sparkles, Shield, Target, Flame, Crown, Gem, Lightbulb } from 'lucide-react';
import Header from '../ui/Header';
import { EXAM_QUESTIONS } from '../data/examQuestions';

const EXAM_META = [
  { id: 1, title: 'HSC Physics Mock Test 1', subject: 'hsc', subjectLabel: 'HSC', duration: 15, difficulty: 'Medium', attempts: 1240, bestScore: 8 },
  { id: 2, title: 'HSC Chemistry Final Prep', subject: 'hsc', subjectLabel: 'HSC', duration: 15, difficulty: 'Hard', attempts: 890, bestScore: 7 },
  { id: 3, title: 'SSC Math Revision Test', subject: 'ssc', subjectLabel: 'SSC', duration: 10, difficulty: 'Easy', attempts: 2100, bestScore: 4 },
  { id: 4, title: 'University Admission Physics', subject: 'admission', subjectLabel: 'Admission', duration: 20, difficulty: 'Hard', attempts: 560, bestScore: 7 },
  { id: 5, title: 'HSC Biology Quick Test', subject: 'hsc', subjectLabel: 'HSC', duration: 8, difficulty: 'Easy', attempts: 1560, bestScore: 4 },
  { id: 6, title: 'SSC English Grammar Test', subject: 'ssc', subjectLabel: 'SSC', duration: 8, difficulty: 'Medium', attempts: 3400, bestScore: 4 },
  { id: 7, title: 'Medical Admission Full Mock', subject: 'admission', subjectLabel: 'Admission', duration: 20, difficulty: 'Hard', attempts: 320, bestScore: 7 },
];

const SUBJECT_FILTERS = [{ id: 'all', label: 'All Exams' }, { id: 'hsc', label: 'HSC' }, { id: 'ssc', label: 'SSC' }, { id: 'admission', label: 'Admission' }];
const DIFF = { Easy: 'bg-emerald-100 text-emerald-700', Medium: 'bg-amber-100 text-amber-700', Hard: 'bg-rose-100 text-rose-700' };
const LABELS = ['A','B','C','D'];

function fmtTime(s){ return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; }
function getGrade(p){ if(p>=90)return{l:'A+',s:5,c:'text-emerald-600',bg:'bg-emerald-100'}; if(p>=80)return{l:'A',s:4,c:'text-emerald-500',bg:'bg-emerald-50'}; if(p>=70)return{l:'B',s:3,c:'text-amber-500',bg:'bg-amber-50'}; if(p>=60)return{l:'C',s:2,c:'text-amber-600',bg:'bg-amber-100'}; if(p>=40)return{l:'D',s:1,c:'text-orange-500',bg:'bg-orange-50'}; return{l:'F',s:0,c:'text-rose-600',bg:'bg-rose-50'}; }
function getRank(p){ if(p>=95)return{n:'Diamond',e:'💎',c:'from-cyan-400 to-blue-600'}; if(p>=85)return{n:'Gold',e:'🥇',c:'from-amber-300 to-amber-600'}; if(p>=70)return{n:'Silver',e:'🥈',c:'from-slate-300 to-slate-500'}; if(p>=50)return{n:'Bronze',e:'🥉',c:'from-orange-400 to-orange-700'}; return{n:'Rookie',e:'🌱',c:'from-emerald-400 to-emerald-600'}; }
function getReaction(p){ if(p>=90)return{emoji:'🤩',text:'Outstanding! You are a champion!',color:'text-emerald-600'}; if(p>=80)return{emoji:'😎',text:'Excellent work! Keep it up!',color:'text-emerald-500'}; if(p>=70)return{emoji:'😊',text:'Good job! You are improving!',color:'text-amber-500'}; if(p>=60)return{emoji:'🙂',text:'Not bad! Practice more!',color:'text-amber-600'}; if(p>=40)return{emoji:'😐',text:'Passing grade! Try harder!',color:'text-orange-500'}; return{emoji:'😓',text:'Do not give up! Study & retry!',color:'text-rose-500'}; }
function getBadges({c,w,u,t,time,pct,dur}){
  const b=[];
  if(pct===100)b.push({i:Crown,l:'Perfect Score',cls:'from-amber-300 to-amber-600',t:'text-amber-700'});
  if(pct>=90)b.push({i:Star,l:'Top Scorer',cls:'from-emerald-400 to-emerald-600',t:'text-emerald-700'});
  if(c>=3&&w===0)b.push({i:Flame,l:'On Fire',cls:'from-orange-400 to-red-500',t:'text-orange-700'});
  if(time<dur*60*0.5&&pct>=70)b.push({i:Zap,l:'Speedster',cls:'from-cyan-400 to-blue-500',t:'text-cyan-700'});
  if(u===0)b.push({i:Target,l:'Complete',cls:'from-brand-400 to-brand-600',t:'text-brand-700'});
  if(c>t*0.8)b.push({i:Gem,l:'Scholar',cls:'from-violet-400 to-violet-600',t:'text-violet-700'});
  if(b.length===0&&pct>=40)b.push({i:Shield,l:'Survivor',cls:'from-slate-400 to-slate-600',t:'text-slate-700'});
  return b;
}

function Confetti(){
  const p=useMemo(()=>Array.from({length:24},(_,i)=>({id:i,left:`${Math.random()*100}%`,delay:`${Math.random()*2}s`,dur:`${2+Math.random()*2}s`,c:['#22c55e','#f59e0b','#ef4444','#3b82f6','#8b5cf6','#ec4899'][Math.floor(Math.random()*6)],s:`${6+Math.random()*8}px`})),[]);
  return (<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">{p.map(x=><div key={x.id} className="absolute -top-4 rounded-full animate-confetti-fall" style={{left:x.left,width:x.s,height:x.s,backgroundColor:x.c,animationDelay:x.delay,animationDuration:x.dur}}/>)}</div>);
}
function MiniConfetti(){
  const p=useMemo(()=>Array.from({length:8},(_,i)=>({id:i,left:`${30+Math.random()*40}%`,top:`${40+Math.random()*20}%`,delay:`${Math.random()*0.3}s`,dur:`${1+Math.random()}s`,c:['#22c55e','#f59e0b','#3b82f6','#ec4899'][Math.floor(Math.random()*4)],s:`${4+Math.random()*6}px`})),[]);
  return (<div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">{p.map(x=><div key={x.id} className="absolute rounded-full animate-confetti-fall" style={{left:x.left,top:x.top,width:x.s,height:x.s,backgroundColor:x.c,animationDelay:x.delay,animationDuration:x.dur}}/>)}</div>);
}
function useAnimCount(target,dur=1500){
  const [v,setV]=useState(0);
  useEffect(()=>{let st=null,raf;const step=(ts)=>{if(!st)st=ts;const pr=Math.min((ts-st)/dur,1);setV(Math.floor(pr*target));if(pr<1)raf=requestAnimationFrame(step);};raf=requestAnimationFrame(step);return()=>cancelAnimationFrame(raf);},[target,dur]);
  return v;
}
function AnimNum({target,dur=1500,children}){
  const v=useAnimCount(target,dur);
  return children?v:null;
}

export default function ExamScreen({onOpenNotifications,setInExam}){
  const [screen,setScreen]=useState('list');
  const [selectedExam,setSelectedExam]=useState(null);
  const [currentQIndex,setCurrentQIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [flagged,setFlagged]=useState(new Set());
  const [timeRemaining,setTimeRemaining]=useState(0);
  const [showPalette,setShowPalette]=useState(false);
  const [showSubmitConfirm,setShowSubmitConfirm]=useState(false);
  const [resultData,setResultData]=useState(null);
  const [countdown,setCountdown]=useState(null);
  const [currentStreak,setCurrentStreak]=useState(0);
  const [maxStreak,setMaxStreak]=useState(0);
  const [eliminatedOpts,setEliminatedOpts]=useState({});
  const [hintsUsed,setHintsUsed]=useState(0);
  const [showHint,setShowHint]=useState(false);
  const [showConfetti,setShowConfetti]=useState(false);
  const [xpLevel,setXpLevel]=useState(()=>{try{return Number(localStorage.getItem('iedu.xp'))||0;}catch{return 0;}});
  const [qFeedback,setQFeedback]=useState(null);
  const [showMiniConfetti,setShowMiniConfetti]=useState(false);

  const EXAMS=useMemo(()=>EXAM_META.map(e=>({...e,questions:(EXAM_QUESTIONS[e.id]||[]).length,totalMarks:(EXAM_QUESTIONS[e.id]||[]).length})),[]);
  const [filter,setFilter]=useState('all');
  const filteredExams=useMemo(()=>filter==='all'?EXAMS:EXAMS.filter(e=>e.subject===filter),[filter,EXAMS]);
  const questions=selectedExam?(EXAM_QUESTIONS[selectedExam.id]||[]):[];
  const currentQ=questions[currentQIndex];

  useEffect(()=>{if(screen!=='question')return;const id=setInterval(()=>setTimeRemaining(t=>Math.max(0,t-1)),1000);return()=>clearInterval(id);},[screen]);
  useEffect(()=>{if(screen==='question'&&timeRemaining===0)finishExam(true);},[timeRemaining,screen]);
  useEffect(()=>{if(setInExam)setInExam(screen==='question');},[screen,setInExam]);
  useEffect(()=>{if(countdown===null)return;if(countdown<=0){setCountdown(null);setScreen('question');return;}const t=setTimeout(()=>setCountdown(c=>c-1),1000);return()=>clearTimeout(t);},[countdown]);
  useEffect(()=>{if(showHint){const t=setTimeout(()=>setShowHint(false),4000);return()=>clearTimeout(t);}},[showHint]);
  useEffect(()=>{if(showMiniConfetti){const t=setTimeout(()=>setShowMiniConfetti(false),1500);return()=>clearTimeout(t);}},[showMiniConfetti]);

  const selectOption=(i)=>{if(!currentQ||answers[currentQ.id]!==undefined)return;setAnswers(p=>({...p,[currentQ.id]:i}));const correct=i===currentQ.correctAnswer;setQFeedback(correct?'correct':'wrong');setShowMiniConfetti(correct);if(correct){setCurrentStreak(s=>s+1);}else{setCurrentStreak(0);}};
  const handleContinue=()=>{setQFeedback(null);setShowMiniConfetti(false);if(currentQIndex<questions.length-1){setCurrentQIndex(i=>i+1);}else{setShowSubmitConfirm(true);}};
  const toggleFlag=()=>{if(!currentQ)return;setFlagged(p=>{const n=new Set(p);n.has(currentQ.id)?n.delete(currentQ.id):n.add(currentQ.id);return n;});};
  const useFiftyFifty=()=>{if(!currentQ||eliminatedOpts[currentQ.id])return;const wrong=currentQ.options.map((_,i)=>i).filter(i=>i!==currentQ.correctAnswer);const rem=wrong.sort(()=>Math.random()-0.5).slice(0,2);setEliminatedOpts(p=>({...p,[currentQ.id]:new Set(rem)}));};
  const useHint=()=>{if(!currentQ)return;setHintsUsed(h=>h+1);setShowHint(true);};
  const goNext=()=>{setQFeedback(null);setShowMiniConfetti(false);if(currentQIndex<questions.length-1)setCurrentQIndex(i=>i+1);};
  const goPrev=()=>{setQFeedback(null);setShowMiniConfetti(false);if(currentQIndex>0)setCurrentQIndex(i=>i-1);};

  const finishExam=useCallback((auto=false)=>{
    if(!selectedExam)return;
    const qs=EXAM_QUESTIONS[selectedExam.id]||[];
    let correct=0,wrong=0,unattempted=0,curStreak=0,bestStreak=0;
    qs.forEach(q=>{const a=answers[q.id];if(a===undefined){unattempted++;curStreak=0;}else if(a===q.correctAnswer){correct++;curStreak++;bestStreak=Math.max(bestStreak,curStreak);}else{wrong++;curStreak=0;}});
    const t=qs.length;const taken=selectedExam.duration*60-timeRemaining;
    const pct=t>0?Math.round((correct/t)*100):0;
    const xpGain=Math.round(pct*1.2);
    setMaxStreak(bestStreak);
    setXpLevel(prev=>{const next=prev+xpGain;try{localStorage.setItem('iedu.xp',String(next));}catch{}return next;});
    setResultData({correct,wrong,unattempted,total:t,score:correct,timeTaken:taken,percentage:pct,passed:correct>=t*0.4,duration:selectedExam.duration,xpGain});
    setScreen('result');if(pct>=60)setShowConfetti(true);if(auto)setShowPalette(false);
  },[answers,selectedExam,timeRemaining]);

  const startExam=(exam)=>{setSelectedExam(exam);setAnswers({});setFlagged(new Set());setCurrentQIndex(0);setTimeRemaining(exam.duration*60);setResultData(null);setEliminatedOpts({});setHintsUsed(0);setCurrentStreak(0);setMaxStreak(0);setShowConfetti(false);setShowHint(false);setQFeedback(null);setShowMiniConfetti(false);setCountdown(3);};
  const backToList=()=>{setScreen('list');setSelectedExam(null);setResultData(null);};
  const retakeExam=()=>{if(!selectedExam)return;setAnswers({});setFlagged(new Set());setCurrentQIndex(0);setTimeRemaining(selectedExam.duration*60);setResultData(null);setEliminatedOpts({});setHintsUsed(0);setCurrentStreak(0);setMaxStreak(0);setShowConfetti(false);setShowHint(false);setQFeedback(null);setShowMiniConfetti(false);setCountdown(3);};

  const isFlagged=currentQ?flagged.has(currentQ.id):false;
  const answeredCount=Object.keys(answers).length;
  const totalQ=questions.length;

  if(countdown!==null){
    return (
      <div className="min-h-full flex flex-col items-center justify-center bg-slate-900 text-white animate-fade-in">
        <div className="text-center space-y-6">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Get Ready</p>
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-glow animate-bounce">
            <span className="text-6xl font-black text-brand-900">{countdown===0?'GO!':countdown}</span>
          </div>
          <p className="text-xs text-slate-400 font-semibold">Exam starts in {countdown}...</p>
        </div>
      </div>
    );
  }

  if(screen==='instructions'&&selectedExam){
    return (
      <div className="min-h-full bg-slate-50 animate-fade-in">
        <div className="sticky top-0 z-20 bg-gradient-to-br from-brand-700 via-brand-900 to-brand-950 text-white px-5 pt-10 pb-4 sm:pt-7 flex items-center justify-between">
          <button onClick={()=>{setScreen('list');setSelectedExam(null);}} className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20 hover:bg-white/20 transition-all active:scale-95"><ArrowLeft size={20}/></button>
          <h1 className="text-lg font-extrabold">Instructions</h1>
          <div className="w-10"/>
        </div>
        <div className="px-5 mt-5 space-y-4 pb-8">
          <div className="bg-white rounded-2xl shadow-card p-5 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900">{selectedExam.title}</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-3 text-center"><p className="text-lg font-extrabold text-brand-700">{selectedExam.duration}</p><p className="text-[10px] font-bold text-slate-500">Minutes</p></div>
              <div className="bg-slate-50 rounded-xl p-3 text-center"><p className="text-lg font-extrabold text-brand-700">{totalQ}</p><p className="text-[10px] font-bold text-slate-500">Questions</p></div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 font-semibold">
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Answer all questions before time runs out.</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> You can flag questions to review later.</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Use 50-50 to remove two wrong options.</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Hints are available but cost streak bonus.</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5"/> Passing score: 40%.</li>
            </ul>
            <button onClick={()=>setCountdown(3)} className="w-full bg-accent-500 hover:bg-accent-400 text-brand-900 text-sm font-extrabold py-3 rounded-xl shadow-soft hover:shadow-glow active:scale-95 transition-all flex items-center justify-center gap-2"><PlayCircle size={18}/> Start Exam</button>
          </div>
        </div>
      </div>
    );
  }

  if(screen==='list'){
    return (
      <div className="min-h-full bg-slate-50">
        <Header title="Exams" onNotificationClick={onOpenNotifications}/>
        <div className="px-5 pt-4 space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {SUBJECT_FILTERS.map(f=>(<button key={f.id} onClick={()=>setFilter(f.id)} className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-extrabold transition-all active:scale-95 ${filter===f.id?'bg-brand-700 text-white shadow-soft':'bg-white text-slate-600 shadow-card hover:bg-slate-50'}`}>{f.label}</button>))}
          </div>
          <div className="space-y-3">
            {filteredExams.map(exam=>{
              const diffColor=DIFF[exam.difficulty];
              return (
                <div key={exam.id} className="bg-white rounded-2xl shadow-card p-4 space-y-3 transition-transform active:scale-[0.98]">
                  <div className="flex items-center justify-between"><span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg ${diffColor}`}>{exam.difficulty}</span><span className="text-[10px] font-bold text-slate-400">{exam.questions} Qs</span></div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{exam.title}</h3>
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={12}/> {exam.duration} min</span>
                    <span className="flex items-center gap-1"><BarChart3 size={12}/> {exam.attempts.toLocaleString()} attempts</span>
                    <span className="flex items-center gap-1"><Award size={12}/> Best: {exam.bestScore}</span>
                  </div>
                  <button onClick={()=>startExam(exam)} className="w-full bg-accent-500 hover:bg-accent-400 text-brand-900 text-xs font-extrabold py-2.5 rounded-xl shadow-soft hover:shadow-glow active:scale-95 transition-all flex items-center justify-center gap-2"><PlayCircle size={16}/> Start Exam</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if(screen==='question'&&currentQ){
    const elim=eliminatedOpts[currentQ.id]||new Set();
    return (
      <div className="min-h-full bg-slate-50 animate-fade-in flex flex-col">
        <div className="sticky top-0 z-20 bg-gradient-to-br from-brand-700 via-brand-900 to-brand-950 text-white px-5 pt-10 pb-3 sm:pt-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={()=>setShowPalette(true)} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm ring-1 ring-white/20 px-3 py-1.5 rounded-lg text-[11px] font-extrabold hover:bg-white/20 transition-all active:scale-95"><FileQuestion size={14}/> {currentQIndex+1}/{totalQ}</button>
            <button onClick={()=>setShowSubmitConfirm(true)} className="bg-white/10 backdrop-blur-sm ring-1 ring-white/20 px-3 py-1.5 rounded-lg text-[11px] font-extrabold hover:bg-white/20 transition-all active:scale-95">Finish</button>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold bg-white/10 backdrop-blur-sm ring-1 ring-white/20 px-3 py-1.5 rounded-lg">
            <Clock size={14} className={timeRemaining<=60?'text-red-300 animate-pulse':'text-accent-300'}/> {fmtTime(timeRemaining)}
          </div>
        </div>
        <div className="px-5 pt-3 pb-1"><div className="h-2.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700" style={{width:`${((currentQIndex)/totalQ)*100}%`}}/></div></div>
        <div className="px-5 py-2 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentStreak>=2&&(<div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2.5 py-1 rounded-lg text-[10px] font-extrabold animate-pulse"><Flame size={12}/> {currentStreak}x Streak</div>)}
            {showHint&&currentQ&&(<div className="bg-brand-100 text-brand-700 px-3 py-1 rounded-lg text-[10px] font-extrabold animate-fade-in">{currentQ.explanation.slice(0,55)}...</div>)}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={useFiftyFifty} disabled={elim.size>0} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all active:scale-95 ${elim.size>0?'bg-slate-200 text-slate-400 cursor-not-allowed':'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}><Zap size={12}/> 50-50</button>
            <button onClick={useHint} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all active:scale-95"><Lightbulb size={12}/> Hint</button>
          </div>
        </div>
        <div className="flex-1 px-5 pt-4 pb-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-extrabold bg-brand-100 text-brand-700 px-2.5 py-1 rounded-lg">Question {currentQIndex+1}</span>
              <span className="text-[10px] font-extrabold text-slate-400">{currentQ.marks} mark{currentQ.marks>1?'s':''}</span>
            </div>
            <div className="flex items-start gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-xl shrink-0 shadow-soft">🦉</div>
              <p className="text-[17px] font-extrabold text-slate-900 leading-snug pt-1">{currentQ.text}</p>
            </div>
            <div className="space-y-3">
              {currentQ.options.map((opt,idx)=>{
                const isElim=elim.has(idx);
                const isSelected=answers[currentQ.id]===idx;
                const isCorrectOpt=qFeedback&&idx===currentQ.correctAnswer;
                const isWrongOpt=qFeedback==='wrong'&&isSelected;
                return (
                  <button key={idx} onClick={()=>{if(!isElim&&!qFeedback)selectOption(idx);}} disabled={isElim||!!qFeedback} className={`w-full text-left p-4 rounded-2xl text-base font-extrabold transition-all active:scale-[0.98] flex items-center gap-3 border-2 ${isElim?'opacity-30 line-through bg-slate-50 text-slate-400 cursor-not-allowed border-transparent':isCorrectOpt?'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-md':isWrongOpt?'bg-rose-50 border-rose-400 text-rose-800 shadow-md':isSelected?'bg-brand-50 border-brand-300 text-brand-900 shadow-soft':'bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-brand-50/50'}`}>
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${isCorrectOpt?'bg-emerald-500 text-white':isWrongOpt?'bg-rose-500 text-white':isSelected?'bg-brand-500 text-white':'bg-slate-100 text-slate-500'}`}>{isCorrectOpt?'✓':isWrongOpt?'✗':LABELS[idx]}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {qFeedback==='correct'&&(
              <div className="relative mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center animate-pop-in">
                {showMiniConfetti&&<MiniConfetti/>}
                <div className="text-4xl mb-1">🎉</div>
                <p className="text-sm font-extrabold text-emerald-700">Correct! Great job!</p>
              </div>
            )}
            {qFeedback==='wrong'&&(
              <div className="mt-4 bg-rose-50 border border-rose-200 rounded-xl p-4 text-center animate-pop-in">
                <div className="text-4xl mb-1">😅</div>
                <p className="text-sm font-extrabold text-rose-700">Oops! Not quite right.</p>
                <p className="text-xs text-rose-600 mt-1 font-semibold">Correct: {currentQ.options[currentQ.correctAnswer]}</p>
              </div>
            )}
          </div>
        </div>
        <div className="px-5 pb-5 pt-2 bg-slate-50">
          <div className="flex items-center gap-3">
            {qFeedback?(
              <button onClick={handleContinue} className={`flex-[3] flex items-center justify-center gap-2 text-brand-900 font-extrabold text-base py-3.5 rounded-2xl shadow-soft active:scale-95 transition-all animate-pop-in ${qFeedback==='correct'?'bg-emerald-400 hover:bg-emerald-300':'bg-rose-400 hover:bg-rose-300'}`}>
                {qFeedback==='correct'?<><Check size={20}/> Continue</>:<><ChevronRight size={20}/> Continue</>}
              </button>
            ):(
              <>
                <button onClick={goPrev} disabled={currentQIndex===0} className="flex-1 flex items-center justify-center gap-1 bg-white text-slate-700 font-extrabold text-sm py-3 rounded-xl shadow-card hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"><ChevronLeft size={16}/> Prev</button>
                <button onClick={toggleFlag} className={`flex items-center justify-center gap-1 px-4 py-3 rounded-xl shadow-card font-extrabold text-sm transition-all active:scale-95 ${isFlagged?'bg-amber-100 text-amber-700':'bg-white text-slate-700 hover:bg-slate-50'}`}><Flag size={16} className={isFlagged?'fill-amber-500':''}/></button>
                {currentQIndex===totalQ-1?(
                  <button onClick={()=>setShowSubmitConfirm(true)} className="flex-[2] flex items-center justify-center gap-1 bg-accent-500 hover:bg-accent-400 text-brand-900 font-extrabold text-sm py-3 rounded-xl shadow-soft hover:shadow-glow active:scale-95 transition-all"><Check size={16}/> Submit</button>
                ):(
                  <button onClick={goNext} className="flex-[2] flex items-center justify-center gap-1 bg-white text-slate-700 font-extrabold text-sm py-3 rounded-xl shadow-card hover:bg-slate-50 active:scale-95 transition-all">Next <ChevronRight size={16}/></button>
                )}
              </>
            )}
          </div>
        </div>
        {showPalette&&(
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-fade-in" onClick={()=>setShowPalette(false)}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
            <div className="relative w-full sm:w-[380px] mx-4 mb-6 sm:mb-0 bg-white rounded-3xl shadow-2xl p-5 animate-slide-in-up" onClick={e=>e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h3 className="text-base font-extrabold text-slate-900">Question Palette</h3><button onClick={()=>setShowPalette(false)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"><X size={16}/></button></div>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {questions.map((q,i)=>{
                  const isAns=answers[q.id]!==undefined;
                  const isF=flagged.has(q.id);
                  const isCur=i===currentQIndex;
                  return (<button key={q.id} onClick={()=>{setCurrentQIndex(i);setShowPalette(false);}} className={`h-10 rounded-xl text-sm font-extrabold transition-all active:scale-95 ${isCur?'ring-2 ring-brand-500 scale-105':''} ${isAns?'bg-emerald-100 text-emerald-700':isF?'bg-amber-100 text-amber-700':'bg-slate-100 text-slate-500'}`}>{i+1}</button>);
                })}
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-100"/> Answered ({answeredCount})</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-100"/> Flagged ({flagged.size})</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-slate-100"/> Unattempted ({totalQ-answeredCount})</span>
              </div>
            </div>
          </div>
        )}
        {showSubmitConfirm&&(
          <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in" onClick={()=>setShowSubmitConfirm(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"/>
            <div className="relative w-full sm:w-[340px] mx-4 bg-white rounded-3xl shadow-2xl p-6 animate-pop-in" onClick={e=>e.stopPropagation()}>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 flex items-center justify-center mb-3"><AlertTriangle size={28} className="text-amber-600"/></div>
              <h3 className="text-lg font-extrabold text-slate-900 text-center">Submit Exam?</h3>
              <p className="text-[12px] text-slate-500 text-center mt-1">{answeredCount<totalQ?`You answered ${answeredCount} of ${totalQ} questions.`:`All questions answered!`}{flagged.size>0?` ${flagged.size} flagged.`:` `}</p>
              <div className="flex gap-3 mt-5">
                <button onClick={()=>setShowSubmitConfirm(false)} className="flex-1 py-2.5 rounded-xl text-sm font-extrabold text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all">Cancel</button>
                <button onClick={()=>{setShowSubmitConfirm(false);finishExam();}} className="flex-1 py-2.5 rounded-xl text-sm font-extrabold text-brand-900 bg-accent-500 hover:bg-accent-400 shadow-soft active:scale-95 transition-all">Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if(screen==='result'&&resultData){
    const grade=getGrade(resultData.percentage);
    const rank=getRank(resultData.percentage);
    const reaction=getReaction(resultData.percentage);
    const badges=getBadges({c:resultData.correct,w:resultData.wrong,u:resultData.unattempted,t:resultData.total,time:resultData.timeTaken,pct:resultData.percentage,dur:resultData.duration});
    return (
      <div className="min-h-full bg-slate-50 animate-fade-in">
        {showConfetti&&<Confetti/>}
        <div className="sticky top-0 z-20 bg-gradient-to-br from-brand-700 via-brand-900 to-brand-950 text-white px-5 pt-10 pb-4 sm:pt-7 flex items-center justify-between">
          <button onClick={backToList} className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20 hover:bg-white/20 transition-all active:scale-95"><ArrowLeft size={20}/></button>
          <h1 className="text-lg font-extrabold">Result</h1>
          <div className="w-10"/>
        </div>
        <div className="px-5 pt-5 space-y-4 pb-8">
          <div className="bg-white rounded-2xl shadow-card p-6 text-center space-y-3">
            <div className={`text-5xl font-black ${grade.c}`}>{grade.l}</div>
            <div className="flex justify-center gap-1">
              {Array.from({length:5},(_,i)=>(<Star key={i} size={24} className={i<grade.s?'text-amber-400 fill-amber-400':'text-slate-200'} strokeWidth={1.5}/>))}
            </div>
            <p className={`text-sm font-bold ${reaction.color}`}>{reaction.emoji} {reaction.text}</p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${rank.c} text-white text-xs font-extrabold shadow-soft`}>
              <span className="text-base">{rank.e}</span> {rank.n} Rank
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl shadow-card p-4 text-center">
              <p className="text-2xl font-black text-brand-700"><AnimNum target={resultData.score}>{v=>v}</AnimNum><span className="text-sm font-bold text-slate-400">/{resultData.total}</span></p>
              <p className="text-[10px] font-bold text-slate-500">Score</p>
            </div>
            <div className="bg-white rounded-2xl shadow-card p-4 text-center">
              <p className="text-2xl font-black text-emerald-600"><AnimNum target={resultData.percentage}>{v=>v}</AnimNum><span className="text-sm font-bold text-slate-400">%</span></p>
              <p className="text-[10px] font-bold text-slate-500">Percentage</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 rounded-xl p-3 text-center"><p className="text-lg font-extrabold text-emerald-600">{resultData.correct}</p><p className="text-[10px] font-bold text-emerald-700">Correct</p></div>
            <div className="bg-rose-50 rounded-xl p-3 text-center"><p className="text-lg font-extrabold text-rose-600">{resultData.wrong}</p><p className="text-[10px] font-bold text-rose-700">Wrong</p></div>
            <div className="bg-slate-50 rounded-xl p-3 text-center"><p className="text-lg font-extrabold text-slate-600">{resultData.unattempted}</p><p className="text-[10px] font-bold text-slate-500">Skipped</p></div>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-4 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600"><span>Time Taken</span><span>{fmtTime(resultData.timeTaken)}</span></div>
            <div className="flex justify-between text-xs font-bold text-slate-600"><span>Max Streak</span><span>{maxStreak}x</span></div>
            <div className="flex justify-between text-xs font-bold text-slate-600"><span>Hints Used</span><span>{hintsUsed}</span></div>
            <div className="flex justify-between text-xs font-bold text-slate-600"><span>XP Gained</span><span className="text-brand-700">+<AnimNum target={resultData.xpGain}>{v=>v}</AnimNum> XP</span></div>
            <div className="flex justify-between text-xs font-bold text-slate-600"><span>Total XP</span><span className="text-brand-700">{xpLevel} XP</span></div>
          </div>
          {badges.length>0&&(
            <div className="bg-white rounded-2xl shadow-card p-4">
              <h3 className="text-xs font-extrabold text-slate-900 mb-3">Badges Earned</h3>
              <div className="flex flex-wrap gap-2">
                {badges.map((b,i)=>{
                  const Icon=b.i;
                  return (<div key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-extrabold bg-gradient-to-r ${b.cls} ${b.t}`}><Icon size={12}/> {b.l}</div>);
                })}
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={()=>setScreen('review')} className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-700 font-extrabold text-sm py-3 rounded-xl shadow-card hover:bg-slate-50 active:scale-95 transition-all"><Eye size={16}/> Review</button>
            <button onClick={retakeExam} className="flex-1 flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-400 text-brand-900 font-extrabold text-sm py-3 rounded-xl shadow-soft hover:shadow-glow active:scale-95 transition-all"><RotateCcw size={16}/> Retake</button>
          </div>
          <button onClick={backToList} className="w-full flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-extrabold text-sm py-3 rounded-xl shadow-soft active:scale-95 transition-all"><ArrowLeft size={16}/> Back to Exams</button>
        </div>
      </div>
    );
  }

  if(screen==='review'&&selectedExam){
    const qs=EXAM_QUESTIONS[selectedExam.id]||[];
    return (
      <div className="min-h-full bg-slate-50 animate-fade-in">
        <div className="sticky top-0 z-20 bg-gradient-to-br from-brand-700 via-brand-900 to-brand-950 text-white px-5 pt-10 pb-4 sm:pt-7 flex items-center justify-between">
          <button onClick={()=>setScreen('result')} className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20 hover:bg-white/20 transition-all active:scale-95"><ArrowLeft size={20}/></button>
          <h1 className="text-lg font-extrabold">Review</h1>
          <div className="w-10"/>
        </div>
        <div className="px-5 pt-5 pb-8 space-y-4">
          {qs.map((q,i)=>{
            const a=answers[q.id];
            const isCorrect=a===q.correctAnswer;
            const isUnanswered=a===undefined;
            return (
              <div key={q.id} className="bg-white rounded-2xl shadow-card p-4 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold bg-brand-100 text-brand-700 px-2.5 py-1 rounded-lg">Q{i+1}</span>
                  {isCorrect?(<span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg"><Check size={12}/> Correct</span>):isUnanswered?(<span className="flex items-center gap-1 text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">Skipped</span>):(<span className="flex items-center gap-1 text-[10px] font-extrabold text-rose-700 bg-rose-100 px-2 py-1 rounded-lg"><X size={12}/> Wrong</span>)}
                </div>
                <p className="text-sm font-extrabold text-slate-900 leading-snug">{q.text}</p>
                <div className="space-y-2">
                  {q.options.map((opt,idx)=>{
                    const isSelected=a===idx;
                    const isCorrectOpt=idx===q.correctAnswer;
                    return (
                      <div key={idx} className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-extrabold ${isCorrectOpt?'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200':isSelected?'bg-rose-50 text-rose-800 ring-1 ring-rose-200':'bg-slate-50 text-slate-500'}`}>
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${isCorrectOpt?'bg-emerald-500 text-white':isSelected?'bg-rose-500 text-white':'bg-white text-slate-400 ring-1 ring-slate-200'}`}>{LABELS[idx]}</span>
                        {opt}
                        {isCorrectOpt&&<Check size={14} className="ml-auto text-emerald-500"/>}
                        {isSelected&&!isCorrectOpt&&<X size={14} className="ml-auto text-rose-500"/>}
                      </div>
                    );
                  })}
                </div>
                <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-600 font-semibold leading-snug">
                  <span className="font-extrabold text-brand-700">Explanation: </span>{q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
