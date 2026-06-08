"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import liturgieData from "@/data/liturgie.json";

export default function Liturgie() {
  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <motion.h2
        className="font-serif text-3xl md:text-5xl text-center text-gray-800 mb-6 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Programme de la Cérémonie
      </motion.h2>

      {/* Decorative center frieze */}
      <motion.div 
        className="flex justify-center mb-12 opacity-70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
      >
        <svg width="200" height="24" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,12 Q50,-5 100,12 T190,12" stroke="#D4AF37" strokeWidth="1" fill="none"/>
          <path d="M10,16 Q50,33 100,16 T190,16" stroke="#D4AF37" strokeWidth="1" fill="none" strokeDasharray="4 4"/>
          <circle cx="100" cy="14" r="4" fill="#D4AF37"/>
          <path d="M96,14 L104,14 M100,10 L100,18" stroke="white" strokeWidth="1"/>
        </svg>
      </motion.div>

      <motion.div 
        className="max-w-4xl mx-auto relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* Décoration d'arrière plan (frieze aux coins) */}
        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-weddingGold opacity-40 rounded-tl-full pointer-events-none hidden md:block" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-weddingGold opacity-40 rounded-br-full pointer-events-none hidden md:block" />
        <div className="absolute inset-0 border border-weddingGold/20 rounded-2xl md:scale-105 pointer-events-none hidden md:block" />

        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
          navigation
          spaceBetween={30}
          className="pb-16 pt-8 bg-white md:bg-transparent rounded-2xl shadow-sm md:shadow-none"
        >
          {liturgieData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center text-center px-4 sm:px-10 py-10 md:py-12 bg-white md:border md:border-weddingGold/10 md:rounded-2xl h-full">
                {/* <span className="text-weddingGold text-sm font-semibold uppercase tracking-[0.15em] bg-weddingGold/10 px-4 py-1 rounded-full mb-4">
                  {item.heure}
                </span> */}
                <h3 className="font-serif text-3xl text-gray-800 mt-2 mb-2 pb-4 border-b border-weddingGold/30 relative">
                  {item.etape}
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-weddingGold rounded-full rotate-45" />
                </h3>
                <p className="text-weddingGold-dark font-medium mb-6 italic text-lg opacity-90 mt-4">
                  ♪ {item.titre_chant}
                </p>
                <div className="bg-gray-50/50 p-6 rounded-lg w-full max-w-lg border border-gray-100 max-h-40 overflow-y-scroll">  
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed text-sm md:text-base font-light italic">
                    {item.paroles}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination-custom flex justify-center gap-2 mt-4" />
      </motion.div>
    </section>
  );
}
