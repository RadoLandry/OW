"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Church,
  Wine,
  Leaf,
  MapPin,
  Navigation,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const locations = [
  {
    title: "Cérémonie — Église",
    address: "EKAR Vicent de Paul Ambatonilita, Isoraka-Antananarivo",
    time: "10h00",
    icon: Church,
    mapSrc:
      "https://www.google.com/maps?q=EKAR+Ambatonilita,-18.9109535,47.5216453&z=17&output=embed",
    directions: "https://maps.google.com/?q=EKAR+Vicent+de+Paul+Ambatonilita+Antananarivo",
    photos: [
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527580791834-4c8e2538f5b1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "Réception — Espace fête",
    address: "Espace Ravaka, Tanjombato, Antananarivo",
    time: "13h00",
    icon: Wine,
    mapSrc:
      "https://www.google.com/maps?q=Ravaka+Espace+Tanjombato,-18.9643687,47.5290971&z=17&output=embed",
    directions:
      "https://www.google.com/maps/place/Ravaka+Espace+Tanjombato/@-18.9643687,47.5290971,705m/data=!3m2!1e3!4b1!4m6!3m5!1s0x21f07d1f6dd5d0bd:0x948b22d00a9ad617!8m2!3d-18.9643687!4d47.5290971!16s%2Fg%2F11h_d78778?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
    photos: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

export default function Maps() {
  const [activeLocationIndex, setActiveLocationIndex] = useState<number | null>(
    null,
  );
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const isModalOpen = activeLocationIndex !== null;
  const activeLocation =
    activeLocationIndex !== null ? locations[activeLocationIndex] : null;
  const activePhotos = activeLocation?.photos ?? [];

  useEffect(() => {
    if (!isModalOpen || activePhotos.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % activePhotos.length);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [isModalOpen, activePhotos.length]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveLocationIndex(null);
        setCurrentPhotoIndex(0);
      }
      if (event.key === "ArrowLeft") {
        setCurrentPhotoIndex(
          (prev) => (prev - 1 + activePhotos.length) % activePhotos.length,
        );
      }
      if (event.key === "ArrowRight") {
        setCurrentPhotoIndex((prev) => (prev + 1) % activePhotos.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, activePhotos.length]);

  const openGallery = (locationIndex: number) => {
    setActiveLocationIndex(locationIndex);
    setCurrentPhotoIndex(0);
  };

  const closeGallery = () => {
    setActiveLocationIndex(null);
    setCurrentPhotoIndex(0);
  };

  const goToPreviousPhoto = () => {
    if (activePhotos.length === 0) {
      return;
    }
    setCurrentPhotoIndex(
      (prev) => (prev - 1 + activePhotos.length) % activePhotos.length,
    );
  };

  const goToNextPhoto = () => {
    if (activePhotos.length === 0) {
      return;
    }
    setCurrentPhotoIndex((prev) => (prev + 1) % activePhotos.length);
  };

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Background floral/leaf decorations */}
      <div className="absolute top-0 left-0 text-weddingGold/5 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
        <Leaf className="w-64 h-64 rotate-45" strokeWidth={0.5} />
      </div>
      <div className="absolute bottom-0 right-0 text-weddingGold/5 pointer-events-none transform translate-x-1/4 translate-y-1/3">
        <Leaf className="w-80 h-80 -rotate-12" strokeWidth={0.5} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          className="font-serif text-3xl md:text-5xl text-center text-gray-800 mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Les Lieux
        </motion.h2>

        {/* Elegant Divider */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px w-16 md:w-24 bg-linear-to-r from-transparent to-weddingGold/60" />
          <MapPin className="w-5 h-5 text-weddingGold/70" strokeWidth={1.5} />
          <div className="h-px w-16 md:w-24 bg-linear-to-l from-transparent to-weddingGold/60" />
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-10 md:gap-14"
          initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
          hidden: {}
        }}
      >
        {locations.map((loc, index) => (
          <motion.div
            key={loc.title}
            className="group relative flex flex-col bg-white p-8 rounded-3xl shadow-xs border border-weddingGold/15 hover:shadow-xl transition-all duration-500 overflow-hidden"
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            {/* Very subtle corner decorations */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-weddingGold/20 rounded-tl-3xl m-2 opacity-50 transition-opacity group-hover:opacity-100" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-weddingGold/20 rounded-tr-3xl m-2 opacity-50 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-weddingGold/20 rounded-bl-3xl m-2 opacity-50 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-weddingGold/20 rounded-br-3xl m-2 opacity-50 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10 flex items-center gap-4 mb-4">
              <span className="w-12 h-12 rounded-full bg-weddingGold/10 flex items-center justify-center text-weddingGold-dark shadow-inner group-hover:scale-110 transition-transform duration-500">
                <loc.icon className="w-6 h-6" strokeWidth={1.2} />
              </span>
              <div>
                <h3 className="font-serif text-2xl text-gray-800 mb-1 group-hover:text-weddingGold-dark transition-colors duration-300">
                  {loc.title}
                </h3>
                <p className="inline-block px-3 py-1 bg-weddingGold/10 text-weddingGold-dark text-xs font-semibold tracking-widest rounded-full uppercase">
                  {loc.time}
                </p>
              </div>
            </div>
            
            <p className="relative z-10 text-gray-500 text-sm mb-6 pl-16 leading-relaxed">
              {loc.address}
            </p>

            <div className="relative z-10 w-full h-64 rounded-xl overflow-hidden border border-weddingGold/20 shadow-inner group-hover:border-weddingGold/40 transition-colors duration-500">
              <iframe
                src={loc.mapSrc}
                className="w-full h-full grayscale-30 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={loc.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-6 inline-flex items-center justify-center gap-3 py-3 px-6 rounded-full border border-weddingGold/50 text-sm text-weddingGold-dark hover:bg-weddingGold hover:text-white transition-all mx-auto tracking-widest uppercase w-full md:w-auto overflow-hidden group/btn"
            >
              <span className="relative z-10">Ouvrir dans Maps</span>
              <Navigation className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" strokeWidth={1.5} />
            </a>
            <button
              type="button"
              onClick={() => openGallery(index)}
              className="relative z-10 mt-3 inline-flex items-center justify-center py-3 px-6 rounded-full border border-weddingGold/30 text-sm text-gray-700 hover:bg-weddingGold/10 transition-all mx-auto tracking-widest uppercase w-full md:w-auto"
            >
              Voir photos
            </button>
          </motion.div>
        ))}
      </motion.div>
      </div>

      {isModalOpen && activeLocation && activePhotos.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={closeGallery}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeGallery}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center"
              aria-label="Fermer la galerie"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative bg-black w-full h-[55vh] md:h-[65vh]">
              <Image
                src={activePhotos[currentPhotoIndex]}
                alt={`${activeLocation.title} photo ${currentPhotoIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1024px"
                priority
              />

              <button
                type="button"
                onClick={goToPreviousPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center"
                aria-label="Photo précédente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={goToNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center"
                aria-label="Photo suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="px-5 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-700 font-medium">{activeLocation.title}</p>
              <p className="text-xs text-gray-500 tracking-widest uppercase">
                {currentPhotoIndex + 1} / {activePhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
