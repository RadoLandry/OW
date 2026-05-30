"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-08-23T15:00:00");

interface TimeLeft {
  jours: number;
  heures: number;
  minutes: number;
  secondes: number;
}

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { jours: 0, heures: 0, minutes: 0, secondes: 0 };
  return {
    jours: Math.floor(diff / (1000 * 60 * 60 * 24)),
    heures: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    secondes: Math.floor((diff / 1000) % 60),
  };
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    setTimeout(() => setTimeLeft(getTimeLeft()), 0);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background avec image et overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=2070')" }}
      >
        <div className="absolute inset-0 bg-weddingWhite/85 backdrop-blur-[2px]" />
      </div>

      {/* Ornements dorés */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-weddingGold to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-weddingGold to-transparent z-10" />

      <motion.div
        className="z-10 relative bg-white/40 p-10 md:p-16 rounded-3xl shadow-[0_0_40px_rgba(212,175,55,0.1)] border border-weddingGold/20 backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p className="text-weddingGold-dark tracking-[0.4em] uppercase text-xs md:text-sm mb-6 font-semibold">
          Nous nous marions
        </p>
        <h1 className="font-serif text-6xl md:text-8xl text-gray-800 mb-4 drop-shadow-sm">
          Landry & Belfah
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-light mt-6 tracking-wide">
          23 Août 2026 • EKAR Vicent de Paul Ambatonilita
        </p>
        
        {/* Subtle decorative curve */}
        <div className="flex justify-center mt-6 opacity-60">
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,12 Q30,0 60,12 T110,12" stroke="#D4AF37" strokeWidth="1" fill="none"/>
            <circle cx="60" cy="12" r="3" fill="#D4AF37"/>
            <circle cx="10" cy="12" r="1.5" fill="#D4AF37"/>
            <circle cx="110" cy="12" r="1.5" fill="#D4AF37"/>
          </svg>
        </div>
      </motion.div>

      {/* Countdown */}
      <motion.div
        className="flex gap-8 md:gap-14 mt-16 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        {(["jours", "heures", "minutes", "secondes"] as const).map((label) => (
          <div key={label} className="flex flex-col items-center">
            <span className="font-serif text-4xl md:text-6xl text-weddingGold drop-shadow-sm">
              {timeLeft ? String(timeLeft[label]).padStart(2, "0") : "00"}
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 mt-2 font-medium">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.a
        href="#rsvp"
        className="mt-16 px-10 py-4 border border-weddingGold text-weddingGold-dark hover:bg-weddingGold hover:text-white transition-all duration-500 uppercase tracking-[0.2em] text-sm z-10 relative bg-white/50 backdrop-blur hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Confirmer ma présence
      </motion.a>
    </section>
  );
}
