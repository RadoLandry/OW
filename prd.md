# 💍 PRD — Site Web de Mariage (Invitation Digitale)

## 🎯 Objectif

Créer un site web élégant et fluide pour un mariage, servant d'invitation digitale interactive. Le but est d'aider les invités à avoir toutes les informations nécessaires en un seul endroit : lieu, programme, confirmation de présence et vœux.

---

## 🎨 Thème & Design

- **Couleurs :** Blanc cassé (#FAFAFA) & Doré métallique (#D4AF37)
- **Style :** Élégant, minimaliste, luxueux
- **Typographie :** Serif pour les titres (ex: Playfair Display), Sans-serif pour le corps
- **Animations :** Fluides et subtiles (fade-in, parallax léger, transitions douces)
- **Approche :** Mobile-first, Single Page Application avec scroll fluide

---

## ✨ Catalogue des Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Hero + Countdown** | Section d'accueil avec noms des mariés, date, et compte à rebours animé (jours, heures, minutes, secondes) |
| 2 | **Google Maps** | Deux cartes interactives : localisation de l'église (cérémonie) et de l'espace fête (réception) |
| 3 | **Programme Liturgie** | Slider Swiper affichant les étapes de la messe avec les chants catholiques associés et paroles |
| 4 | **RSVP (Confirmation)** | Formulaire avec radio boutons (Présent / Absent / Peut-être) + nombre d'accompagnants |
| 5 | **Vœux des invités** | Formulaire pour soumettre un message de vœux, ajouté automatiquement dans un slider Swiper auto-défilant |
| 6 | **Infos Pratiques** | Dress code, parking, hébergement, contact des témoins |
| 7 | **Galerie / Love Story** | Slider photos du couple avec timeline de leur histoire (optionnel) |

---

## 📋 Détail des Features

### 1. Hero + Countdown
- Fond blanc avec ornements dorés
- Noms des mariés en grande typographie serif
- Date & lieu du mariage
- Compte à rebours animé avec flip/fade animation
- Bouton CTA "Confirmer ma présence" (scroll vers RSVP)

### 2. Google Maps (Lieux)
- Carte interactive pour l'**Église** (cérémonie à 15h)
- Carte interactive pour l'**Espace Fête** (réception à 18h)
- Adresses écrites + boutons "Itinéraire" (ouvre Google Maps natif)

### 3. Programme Liturgie (Slider)
- Slider horizontal Swiper avec pagination dorée
- Chaque slide = une étape (heure, titre, chant, paroles/refrain)
- Étapes : Entrée → Lectures → Évangile → Échange des vœux → Offertoire → Communion → Sortie
- Paroles des chants catholiques affichées

### 4. RSVP (Confirmation de présence)
- Champ nom/prénom
- Radio boutons : ✅ Présent | ❌ Absent | 🤔 Peut-être
- Nombre d'accompagnants (select/input number)
- Soumission via API Route → écrit dans `rsvp.json`
- Message de confirmation animé après soumission

### 5. Vœux des Invités
- Formulaire : nom + message de vœux
- Soumission via API Route → append dans `voeux.json`
- Slider Swiper auto-play affichant tous les vœux existants (style carrousel de témoignages)
- Animation d'apparition du nouveau vœu après soumission

### 6. Infos Pratiques
- Cards avec icônes dorées
- Dress code, parking, hébergement recommandé, numéros utiles

---

## 🛠️ Spécifications Techniques & Architecture (Next.js + TypeScript)

### 1. Stack Technique

* **Framework :** Next.js 14+ (App Router)
* **Langage :** TypeScript (pour un code robuste et auto-complété)
* **Styles :** Tailwind CSS (facilite grandement l'intégration du thème Blanc & Doré)
* **Animations & Sliders :** * `swiper` (React components) pour tous les sliders fluides.
* `framer-motion` (recommandé pour Next.js) pour des animations d'apparition et de transition ultra-fluides.



### 2. Structure des données (Fichiers JSON)

Pour simuler la base de données, nous utiliserons deux fichiers JSON principaux situés dans un dossier de configuration (ex: `src/data/`).

#### 📅 `liturgie.json` (Données statiques)

Contient le déroulement de la messe et les chants associés.

```json
[
  {
    "id": "intro",
    "etape": "Entrée",
    "heure": "15:00",
    "titre_chant": "Jubilez, criez de joie",
    "paroles": "R. Jubilez ! Criez de joie ! Vantez la grandeur du Seigneur..."
  },
  {
    "id": "lecture",
    "etape": "Première Lecture",
    "heure": "15:15",
    "titre_chant": "Psaume de la Création",
    "paroles": "R. Mon Dieu, tu es grand, tu es beau..."
  }
]

```

#### ✍️ `voeux.json` & `rsvp.json` (Données dynamiques)

*Note : Comme Next.js s'exécute côté serveur, au début, vous pouvez lire ces fichiers directement. Pour ajouter dynamiquement un vœu ou une RSVP, vous créerez une **Route Handler API** Next.js (`/api/voeux` et `/api/rsvp`) qui viendra écrire (append) dans ces fichiers JSON.*

**Exemple de structure pour `voeux.json` :**

```json
[
  {
    "id": 1,
    "nom": "Marie & Jean",
    "message": "Tous nos vœux de bonheur pour cette nouvelle vie à deux ! ✨",
    "date": "2026-05-30T10:00:00Z"
  }
]

```

---

## 💻 Structure des Composants Next.js (Proposition)

Pour garantir la fluidité, le site sera une **Single Page Application (SPA)** découpée en composants réutilisables :

```text
src/
├── app/
│   ├── api/
│   │   ├── rsvp/route.ts       # API pour enregistrer la présence dans rsvp.json
│   │   └── voeux/route.ts      # API pour ajouter un voeu dans voeux.json
│   ├── layout.tsx
│   └── page.tsx                # Page principale (regroupe toutes les sections)
├── components/
│   ├── Hero.tsx                # Accueil + Compte à rebours
│   ├── Maps.tsx                # Google Maps (Église / Fête)
│   ├── Liturgie.tsx            # Programme + Chants (Slider Swiper)
│   ├── RsvpForm.tsx            # Formulaire de confirmation (Radio boutons)
│   └── VoeuxSlider.tsx         # Formulaire vœux + Slider Swiper automatique
├── data/
│   ├── liturgie.json
│   ├── rsvp.json
│   └── voeux.json

```

---

## 🎨 Intégration du thème (Tailwind CSS)

Pour appliquer facilement le thème Blanc et Doré de manière harmonieuse et fluide, vous pourrez configurer les couleurs dans votre fichier `tailwind.config.ts` :

```typescript
theme: {
  extend: {
    colors: {
      weddingGold: {
        light: '#F3E5AB', // Doré doux
        DEFAULT: '#D4AF37', // Doré métallique classique
        dark: '#AA7C11',
      },
      weddingWhite: '#FAFAFA', // Blanc cassé/épuré pour le fond
    },
  },
},

```

---

## 📱 UX / Principes

- **Bref & visuel** : peu de texte, beaucoup de visuel et d'animations
- **Scroll fluide** : navigation par scroll avec sections plein écran
- **Sliders partout** : Swiper pour liturgie, vœux, galerie (évite les pages longues)
- **Animations subtiles** : Framer Motion (fade-in au scroll, hover doré, transitions de page)
- **Mobile-first** : 80%+ des invités consulteront sur mobile

---

## 🚀 Prochaine étape

Créer le projet Next.js avec la structure définie et implémenter les composants un par un.