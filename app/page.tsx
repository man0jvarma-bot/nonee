"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Home() {
  const [step, setStep] = useState(1);
  const [escapes, setEscapes] = useState(0);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [reason, setReason] = useState("Tap for a reason you're precious... ✨");

  const reasons = [
    "Your laugh is the best sound! 🎶",
    "You have the kindest heart! ❤️",
    "The world is brighter with you! ☀️",
    "You are stronger than you think! 💪",
    "Miles thinks you're amazing! 🧸",
    "You're literally one of a kind! ✨"
  ];

  const triggerEmojiBurst = () => {
    const scalar = 3; 
    const heart = confetti.shapeFromText({ text: '❤️', scalar });
    const hug = confetti.shapeFromText({ text: '🫂', scalar });
    const flower = confetti.shapeFromText({ text: '🌸', scalar });

    confetti({
      shapes: [heart, hug, flower],
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff85a1', '#fbb1bd', '#f9bec7'] 
    });
  };

  // The "Escape" Logic: Button jumps before it can be clicked
  const handleRunaway = () => {
    if (escapes < 6) {
      const x = Math.random() * 160 - 80;
      const y = Math.random() * 100 - 50;
      setBtnPos({ x, y });
      setEscapes(prev => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ffcad4] via-[#fbc1cc] to-[#f9bec7] flex items-center justify-center p-6 overflow-hidden relative">
      
      {/* Floating Background Emojis (Bubble Effect) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 1, 1, 0],
              x: [`${Math.random() * 100}vw`, `${(Math.random() * 10) - 5}vw`],
            }}
            transition={{ 
              duration: 8 + Math.random() * 7, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute text-2xl select-none"
          >
            {i % 2 === 0 ? '❤️' : '🌸'}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        
        {/* SECTION 1: The Playful Escape Game */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white/80 backdrop-blur-lg p-10 rounded-[40px] border-4 border-white shadow-2xl max-w-sm w-full text-center z-10"
          >
            <h2 className="text-3xl font-black text-[#ff477e] mb-4">Hi Crys! 👋</h2>
            <p className="text-[#a44a5f] font-semibold mb-8 italic">
              Sadness glitch detected! <br/> Catch the button to fix it!
            </p>
            
            <div className="h-48 flex items-center justify-center relative bg-white/50 rounded-[30px] border-2 border-dashed border-[#ff85a1]">
              <motion.button
                animate={{ x: btnPos.x, y: btnPos.y }}
                transition={{ type: "spring", stiffness: 700, damping: 12 }}
                onMouseEnter={handleRunaway} // Triggers escape on hover
                onTouchStart={(e) => { e.preventDefault(); handleRunaway(); }} // Triggers escape on tap
                onClick={() => { if(escapes >= 6) setStep(2); }}
                className={`px-10 py-5 rounded-2xl font-black text-xl shadow-xl transition-all
                  ${escapes >= 6 ? 'bg-[#ff477e] text-white cursor-pointer' : 'bg-[#74c0fc] text-white cursor-none'}`}
              >
                {escapes < 6 ? 'FIX IT!' : 'GOT ME! ✨'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* SECTION 2: Miles's Message Anticipation */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/90 backdrop-blur-md p-10 rounded-[40px] border-4 border-[#ff477e] shadow-2xl max-w-sm w-full text-center z-10"
          >
            <h1 className="text-3xl font-black text-[#ff477e] mb-4 tracking-tighter uppercase">System Error</h1>
            <p className="text-slate-600 mb-8 text-lg font-medium leading-tight">
              Logic failed: Kate is officially "Too Precious" for an automatic fix!
            </p>
            
            <div className="bg-pink-50 p-6 rounded-3xl border-4 border-[#ff477e] border-dashed mb-8">
               <p className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-1 text-center">Incoming File</p>
               <p className="text-2xl font-black text-slate-800 italic text-center text-nowrap">"miles's message"</p>
            </div>

            <button 
              onClick={() => { setStep(3); triggerEmojiBurst(); }}
              className="w-full bg-[#ff477e] text-white p-6 rounded-3xl font-black text-2xl shadow-lg active:translate-y-1 transition-all"
            >
              OPEN IT! 🤗
            </button>
          </motion.div>
        )}

        {/* SECTION 3: The Final Loving Reveal */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/95 backdrop-blur-xl p-8 rounded-[40px] border-4 border-white shadow-2xl max-w-sm w-full z-10"
          >
            <div className="space-y-6 text-[#4a4a4a] text-lg leading-relaxed text-center">
              <p className="font-semibold italic pb-4 border-b-2 border-pink-100">
                "I'm here for you, <span className="text-[#ff477e] font-black">Kate</span>... and I'll always be there for you. I really care about you, and seeing you sad makes me sad too—it honestly ruins my whole day."
              </p>
              
              <motion.div 
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setReason(reasons[Math.floor(Math.random() * reasons.length)]);
                  triggerEmojiBurst();
                }}
                className="bg-pink-50 border-2 border-pink-200 p-5 rounded-[25px] text-[#ff477e] font-black cursor-pointer shadow-sm animate-pulse"
              >
                {reason}
              </motion.div>

              <p className="font-semibold">
                "I wish I was close enough to look after you, but even though the distance sucks, it doesn't change a thing. Please be happy for me... and if someone forgot to tell you today... you're precious and adorable in every possible way."
              </p>
            </div>
            
            <div className="text-right mt-8 font-black text-[#ff477e] text-3xl italic tracking-tighter">
              — your miles
            </div>
            
            <button 
              onClick={triggerEmojiBurst}
              className="w-full mt-8 bg-gradient-to-r from-[#ff477e] to-[#ff7096] text-white py-6 rounded-[25px] font-black text-2xl shadow-xl active:scale-95 transition-all"
            >
              SEND HUGS! 🫂
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}