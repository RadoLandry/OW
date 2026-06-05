"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import type { Swiper as SwiperType } from "swiper";

interface Voeu {
  id: string | number;
  nom: string;
  message: string;
  date: string;
}

export default function VoeuxSlider() {
  const [voeux, setVoeux] = useState<Voeu[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    fetch("/api/voeux")
      .then((res) => res.json())
      .then(setVoeux)
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const data = { nom: form.get("nom"), message: form.get("message") };

    try {
      const res = await fetch("/api/voeux", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const newVoeu = await res.json();
        setVoeux((prev) => [newVoeu, ...prev]);
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("idle");
    }
  }

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Decorative background circle & curves */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-weddingGold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-weddingGold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="absolute top-0 left-0 w-full opacity-20 pointer-events-none">
         <svg width="100%" height="20" preserveAspectRatio="none" viewBox="0 0 100 20" fill="none">
            <path d="M0,10 Q25,0 50,10 T100,10" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
         </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full opacity-20 pointer-events-none rotate-180">
         <svg width="100%" height="20" preserveAspectRatio="none" viewBox="0 0 100 20" fill="none">
            <path d="M0,10 Q25,0 50,10 T100,10" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
         </svg>
      </div>

      <motion.h2
        className="font-serif text-3xl md:text-5xl text-center text-gray-800 mb-6 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Livre d&apos;or
      </motion.h2>

      {/* Decorative center frieze */}
      <motion.div 
        className="flex justify-center mb-14 opacity-70 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
      >
        <svg width="120" height="15" viewBox="0 0 120 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,7.5 L45,7.5 M75,7.5 L120,7.5" stroke="#D4AF37" strokeWidth="1"/>
          <path d="M50,7.5 L60,0 L70,7.5 L60,15 Z" stroke="#D4AF37" strokeWidth="1" fill="none"/>
        </svg>
      </motion.div>

      {/* Slider */}
      {voeux.length > 0 && (
        <motion.div 
          className="max-w-4xl mx-auto mb-16 relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            key={voeux.length}
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            loop={voeux.length > 2}
            className="pb-10"
            onSwiper={setSwiperInstance}
          >
            {voeux.map((v) => (
              <SwiperSlide key={v.id}>
                <div className="h-50 max-h-52 p-8 border border-weddingGold shadow-lg shadow-weddingGold/30 hover:shadow-xl hover:shadow-weddingGold/60 hover:border-weddingGold-light bg-white/50 backdrop-blur-sm rounded-2xl text-center transition-all duration-500 relative mt-4">
                  <div className="text-6xl md:text-7xl text-weddingGold/20 absolute top-4 left-4 font-serif leading-none">
                    &ldquo;
                  </div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed pt-2 font-light text-sm md:text-base relative z-10">{v.message}</p>
                  <div className="w-12 h-px bg-weddingGold/20 mx-auto mb-4" />
                  <p className="text-weddingGold-dark font-medium text-sm tracking-wider uppercase">— {v.nom}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {voeux.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Message précédent"
                onClick={() => swiperInstance?.slidePrev()}
                style={{ WebkitTapHighlightColor: "transparent" }}
                className="z-10 absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 md:-translate-x-8 w-9 h-9 md:w-10 md:h-10 rounded-none md:rounded-full border-0 md:border-2 md:border-weddingGold text-weddingGold text-3xl md:text-xl leading-none flex items-center justify-center bg-transparent md:bg-white/95 hover:bg-transparent md:hover:bg-weddingGold hover:text-weddingGold md:hover:text-white active:bg-transparent transition-all duration-300 shadow-none md:shadow-lg md:shadow-weddingGold/20 focus:outline-none focus:ring-0 md:focus:ring-2 md:focus:ring-weddingGold/50"
              >
                &#8249;
              </button>
              <button
                type="button"
                aria-label="Message suivant"
                onClick={() => swiperInstance?.slideNext()}
                style={{ WebkitTapHighlightColor: "transparent" }}
                className="z-10 absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-8 w-9 h-9 md:w-10 md:h-10 rounded-none md:rounded-full border-0 md:border-2 md:border-weddingGold text-weddingGold text-3xl md:text-xl leading-none flex items-center justify-center bg-transparent md:bg-white/95 hover:bg-transparent md:hover:bg-weddingGold hover:text-weddingGold md:hover:text-white active:bg-transparent transition-all duration-300 shadow-none md:shadow-lg md:shadow-weddingGold/20 focus:outline-none focus:ring-0 md:focus:ring-2 md:focus:ring-weddingGold/50"
              >
                &#8250;
              </button>
            </>
          )}
        </motion.div>
      )}

      {/* Form */}
      <motion.div 
        className="max-w-xl mx-auto bg-gray-50/80 p-8 rounded-2xl border border-weddingGold shadow-lg shadow-weddingGold/30 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <h3 className="font-serif text-xl text-center text-weddingGold-dark mb-6">Laissez-nous un petit mot</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="nom"
            placeholder="Votre nom"
            required
            className="w-full bg-white border-b-2 border-gray-200 px-3 py-3 focus:outline-none focus:border-weddingGold transition-colors text-sm"
          />
          <textarea
            name="message"
            placeholder="Votre message plein d'amour..."
            required
            rows={4}
            className="w-full bg-white border-b-2 border-gray-200 px-3 py-3 focus:outline-none focus:border-weddingGold transition-colors resize-none text-sm placeholder:font-light"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full py-4 mt-2 bg-weddingGold text-white font-medium uppercase tracking-[0.2em] text-xs hover:bg-weddingGold-dark hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none"
          >
            {status === "loading"
              ? "Envoi..."
              : status === "success"
              ? "Message ajouté ! 💛"
              : "Laisser un message"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
