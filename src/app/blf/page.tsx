"use client";

import { useEffect, useState } from "react";
import { Trash2, Users, MessageSquare, AlertTriangle } from "lucide-react";

type Rsvp = {
  id: string | number;
  nom: string;
  presence: string;
  accompagnants: number;
  date: string;
};

type Voeu = {
  id: string | number;
  nom: string;
  message: string;
  date: string;
};

type ConfirmModal = {
  open: boolean;
  message: string;
  onConfirm: () => void;
};

function Modal({ modal, onClose }: { modal: ConfirmModal; onClose: () => void }) {
  if (!modal.open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle size={24} className="text-red-600" />
        </div>
        <p className="text-gray-700 text-center font-medium">{modal.message}</p>
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => { modal.onConfirm(); onClose(); }}
            className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"rsvp" | "voeux">("rsvp");
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [voeux, setVoeux] = useState<Voeu[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ConfirmModal>({ open: false, message: "", onConfirm: () => {} });
  const [rsvpPage, setRsvpPage] = useState(1);
  const [voeuxPage, setVoeuxPage] = useState(1);
  const PAGE_SIZE = 5;

  const fetchRsvps = async () => {
    try {
      const res = await fetch("/api/rsvp");
      const data = await res.json();
      setRsvps(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchVoeux = async () => {
    try {
      const res = await fetch("/api/voeux");
      const data = await res.json();
      setVoeux(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetch("/api/rsvp").then(r => r.json()),
      fetch("/api/voeux").then(r => r.json())
    ]).then(([rsvpData, voeuxData]) => {
      if (mounted) {
        setRsvps(rsvpData);
        setVoeux(voeuxData);
        setLoading(false);
      }
    }).catch(console.error);
    return () => { mounted = false; };
  }, []);

  const deleteRsvp = (id: string | number) => {
    setModal({
      open: true,
      message: "Voulez-vous vraiment supprimer cette réservation ?",
      onConfirm: async () => {
        await fetch(`/api/rsvp?id=${id}`, { method: "DELETE" });
        fetchRsvps();
      },
    });
  };

  const deleteVoeu = (id: string | number) => {
    setModal({
      open: true,
      message: "Voulez-vous vraiment supprimer ce voeu ?",
      onConfirm: async () => {
        await fetch(`/api/voeux?id=${id}`, { method: "DELETE" });
        fetchVoeux();
      },
    });
  };

  if (loading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <Modal modal={modal} onClose={() => setModal(m => ({ ...m, open: false }))} />
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-linear-to-r from-teal-500 to-teal-700 p-6 text-white text-center">
          <h1 className="text-3xl font-serif">Tableau de bord</h1>
          <p className="opacity-80 mt-2">Gestion des présences et des voeux</p>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => { setActiveTab("rsvp"); setRsvpPage(1); }}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
              activeTab === "rsvp" ? "border-b-2 border-teal-800 text-teal-800 bg-teal-50/50" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Users size={20} />
            Présences ({rsvps.length})
          </button>
          <button
            onClick={() => { setActiveTab("voeux"); setVoeuxPage(1); }}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
              activeTab === "voeux" ? "border-b-2 border-teal-800 text-teal-800 bg-teal-50/50" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <MessageSquare size={20} />
            Voeux ({voeux.length})
          </button>
        </div>

        <div className="p-6">
          {activeTab === "rsvp" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="p-3 border-b">Nom</th>
                    <th className="p-3 border-b">Présence</th>
                    <th className="p-3 border-b">Date</th>
                    <th className="p-3 border-b text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.slice((rsvpPage - 1) * PAGE_SIZE, rsvpPage * PAGE_SIZE).map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-gray-50/50 border-b last:border-0 transition-colors">
                      <td className="p-3 font-medium">{rsvp.nom}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${rsvp.presence === "present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {rsvp.presence === "present" ? "Présent(e)" : "Absent(e)"}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500 text-sm">
                        {new Date(rsvp.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })} {new Date(rsvp.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-2 text-gray-400">
                          <button onClick={() => deleteRsvp(rsvp.id)} className="p-1.5 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors" title="Supprimer">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {rsvps.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">
                        Aucun RSVP pour le moment.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {rsvps.length > PAGE_SIZE && (
                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <span>Page {rsvpPage} / {Math.ceil(rsvps.length / PAGE_SIZE)}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRsvpPage(p => Math.max(1, p - 1))}
                      disabled={rsvpPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      ← Précédent
                    </button>
                    <button
                      onClick={() => setRsvpPage(p => Math.min(Math.ceil(rsvps.length / PAGE_SIZE), p + 1))}
                      disabled={rsvpPage === Math.ceil(rsvps.length / PAGE_SIZE)}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Suivant →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="p-3 border-b">Nom</th>
                    <th className="p-3 border-b w-1/2">Message</th>
                    <th className="p-3 border-b">Date</th>
                    <th className="p-3 border-b text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {voeux.slice((voeuxPage - 1) * PAGE_SIZE, voeuxPage * PAGE_SIZE).map((voeu) => (
                    <tr key={voeu.id} className="hover:bg-gray-50/50 border-b last:border-0 transition-colors">
                      <td className="p-3 font-medium">{voeu.nom}</td>
                      <td className="p-3 text-gray-700 italic">&quot;{voeu.message}&quot;</td>
                      <td className="p-3 text-gray-500 text-sm">
                        {new Date(voeu.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })} {new Date(voeu.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-2 text-gray-400">
                          <button onClick={() => deleteVoeu(voeu.id)} className="p-1.5 hover:bg-red-100 hover:text-red-600 rounded-md transition-colors" title="Supprimer">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {voeux.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">
                        Aucun voeu pour le moment.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {voeux.length > PAGE_SIZE && (
                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <span>Page {voeuxPage} / {Math.ceil(voeux.length / PAGE_SIZE)}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setVoeuxPage(p => Math.max(1, p - 1))}
                      disabled={voeuxPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      ← Précédent
                    </button>
                    <button
                      onClick={() => setVoeuxPage(p => Math.min(Math.ceil(voeux.length / PAGE_SIZE), p + 1))}
                      disabled={voeuxPage === Math.ceil(voeux.length / PAGE_SIZE)}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Suivant →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}