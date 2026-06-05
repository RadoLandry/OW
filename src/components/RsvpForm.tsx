"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Heart } from "lucide-react";

export default function RsvpForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [presenceChoice, setPresenceChoice] = useState<"present" | "absent" | "">("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const presence = String(form.get("presence") || "");
    const nom = String(form.get("nom") || "");
    const data = {
      nom: presence === "present" ? nom : "Invité",
      presence,
      accompagnants: presence === "present" ? Number(form.get("accompagnants") || 0) : 0,
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="rsvp" className="py-24 px-4 bg-gray-50/50 relative overflow-hidden">
      {/* Background Decorative Frieze */}
      <div className="absolute top-0 left-0 w-full h-12 opacity-30 pointer-events-none">
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20 T900,20 T1000,20" stroke="#D4AF37" strokeWidth="0.5" fill="none"/>
          <path d="M0,20 Q50,40 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20 T900,20 T1000,20" stroke="#D4AF37" strokeWidth="0.5" fill="none" strokeDasharray="2 2"/>
        </svg>
      </div>

      <motion.div 
        className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-weddingGold/10 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Subtle decorative corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-weddingGold/30 rounded-tl-3xl m-4 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-weddingGold/30 rounded-br-3xl m-4 pointer-events-none" />

        <motion.h2
          className="font-serif text-3xl md:text-4xl text-center text-gray-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Confirmer votre présence
        </motion.h2>
        <motion.p 
          className="text-center text-gray-500 text-sm mb-10 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Avant le 16 Juillet 2026
        </motion.p>

        {status === "success" ? (
          <motion.div
            className="text-center p-10 bg-weddingGold/5 border border-weddingGold/20 rounded-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="w-16 h-16 bg-weddingWhite text-weddingGold-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-weddingGold/30">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl text-weddingGold-dark mb-2">Merci !</h3>
            <p className="text-gray-600 font-light leading-relaxed">Votre réponse a bien été enregistrée. Nous avons hâte de célébrer avec vous.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-4 uppercase tracking-wider">Serez-vous présent ?</label>
              <div className="flex gap-4 flex-col sm:flex-row">
                {[
                  { value: "present", label: "Oui, avec joie", icon: CheckCircle },
                  { value: "absent", label: "Non, désolé", icon: XCircle },
                ].map(({ value, label, icon: Icon }) => (
                  <label key={value} className="flex-1">
                    <input
                      type="radio"
                      name="presence"
                      value={value}
                      required
                      onChange={() => setPresenceChoice(value as "present" | "absent")}
                      className="peer sr-only"
                    />
                    <div className="flex items-center justify-center gap-2 text-center py-3 px-4 border border-gray-200 rounded-xl cursor-pointer transition-all peer-checked:border-weddingGold peer-checked:bg-weddingGold/5 peer-checked:text-weddingGold-dark hover:border-weddingGold/40 text-sm font-medium text-gray-600">
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {presenceChoice === "present" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wider">Nom & Prénom</label>
                  <input
                    name="nom"
                    required={presenceChoice === "present"}
                    className="w-full bg-transparent border-b-2 border-gray-200 px-2 py-3 focus:outline-none focus:border-weddingGold transition-colors placeholder:font-light"
                    placeholder="Ex: Manitrarisoa Bakoly ou Famille Rakoto"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wider">Nombre de personnes</label>
                  <select
                    name="accompagnants"
                    defaultValue="0"
                    className="w-full bg-transparent border-b-2 border-gray-200 px-2 py-3 focus:outline-none focus:border-weddingGold transition-colors text-gray-700"
                  >
                    <option value="0">1</option>
                    <option value="1">2</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 mt-4 bg-weddingGold text-white font-medium uppercase tracking-[0.2em] text-sm hover:bg-weddingGold-dark hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none rounded-none"
            >
              {status === "loading" ? "Envoi en cours..." : "Envoyer ma réponse"}
            </button>

            {status === "error" && (
              <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">Une erreur est survenue. Veuillez réessayer.</p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}
