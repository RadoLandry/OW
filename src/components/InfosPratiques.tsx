"use client";

import { motion } from "framer-motion";
import { Shirt, Car, Bed, Phone, Heart } from "lucide-react";

const infos = [
  {
    icon: Shirt,
    title: "Dress Code",
    description: "Tenue élégante — Couleurs claires recommandées. Évitez le blanc (réservé à la mariée).",
  },
  {
    icon: Car,
    title: "Parking",
    description: "Parking gratuit disponible à l'église et au domaine de réception.",
  },
  {
    icon: Bed,
    title: "Hébergement",
    description: "Hôtel Le Jardin — 5 min du lieu de réception. Code promo : MARIAGE2026.",
  },
  {
    icon: Phone,
    title: "Contact Témoins",
    description: "Sophie : 06 12 34 56 78 — Marc : 06 98 76 54 32",
  },
];

export default function InfosPratiques() {
  return (
    <section className="relative py-24 px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Background corner curves */}
      <div className="absolute top-0 left-0 w-64 h-64 border-t border-l border-weddingGold/20 rounded-tl-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-10 left-10 w-48 h-48 border-t border-l border-weddingGold/10 rounded-tl-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="absolute bottom-0 right-0 w-64 h-64 border-b border-r border-weddingGold/20 rounded-br-full translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border-b border-r border-weddingGold/10 rounded-br-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <motion.h2
        className="font-serif text-3xl md:text-5xl text-center text-gray-800 mb-6 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Infos Pratiques
      </motion.h2>

      {/* Decorative center frieze */}
      <motion.div 
        className="flex justify-center mb-16 opacity-70 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
      >
        <svg width="160" height="20" viewBox="0 0 160 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,10 C40,-5 40,25 80,10 C120,-5 120,25 150,10" stroke="#D4AF37" strokeWidth="1" fill="none" strokeDasharray="3 3"/>
          <path d="M75,10 L85,10 M80,5 L80,15" stroke="#D4AF37" strokeWidth="1"/>
        </svg>
      </motion.div>

      <motion.div 
        className="grid sm:grid-cols-2 gap-6 md:gap-10 relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
          hidden: {}
        }}
      >
        {infos.map((info, i) => (
          <motion.div
            key={info.title}
            className="p-8 border border-weddingGold/30 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl flex flex-col items-center text-center relative overflow-hidden group"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-weddingGold/5 rounded-bl-full transition-transform group-hover:scale-110" />
            
            <div className="text-weddingGold-dark mb-4 bg-weddingGold/10 w-16 h-16 flex items-center justify-center rounded-full shadow-inner">
              <info.icon className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl tracking-wide text-weddingGold-dark mb-3">{info.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{info.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="mt-24 text-center border-t border-weddingGold/20 pt-10 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="w-12 h-px bg-weddingGold absolute top-0 left-1/2 -translate-x-1/2" />
        <p className="font-serif text-weddingGold-dark text-xl italic drop-shadow-sm flex items-center justify-center gap-2">
          Avec tout notre amour <Heart className="w-5 h-5 text-weddingGold fill-weddingGold" />
        </p>
        <p className="text-gray-400 text-sm mt-3 tracking-widest uppercase">23 Août 2026</p>
      </motion.div>
    </section>
  );
}
