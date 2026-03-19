<div align="center">

  # DeenTrack Protocol.
  ### High-Fidelity Spiritual Operating System for the Modern Muslim.

  [![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-v0.45+-C5F74F?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)
  [![Clerk Auth](https://img.shields.io/badge/Clerk_Auth-Secure-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
  [![Neon DB](https://img.shields.io/badge/Neon_PostgreSQL-Serverless-00E599?style=for-the-badge&logo=neon)](https://neon.tech/)

  **DeenTrack** is a professional-grade, privacy-first platform designed to help Muslims track their spiritual progress — from daily Salah to Quranic study, Hadith reflection, and personal journaling — through a premium, immersive interface.

</div>

---

## 🚀 Key Features

### 1. **Command Center (Dashboard)**
A responsive, analytics-first overview of your spiritual journey.
*   **Activity Density Chart:** Visualize your consistency over 7 days, 30 days, or a full year with live Recharts analytics.
*   **Live Metrics:** Real-time counters for Quranic verses read, Hadith studied, Supplications made, and Knowledge points earned.
*   **Daily Discovery:** A cached, rotating "Insight of the Day" card serving Quran, Hadith, or Dua — with Arabic, English, and transliteration.
*   **Milestone Celebrations:** Confetti animations and motivational modals when you hit daily entry milestones.

### 2. **Salah Hub (Prayer Tracker)**
A dedicated calendar-based system for tracking your five daily prayers.
*   **Visual Calendar Grid:** Month-by-month heatmap showing prayer consistency at a glance. Color-coded — green for Jamaah, blue for individual, rose for missed.
*   **Detailed Day Modal:** Click any day to see a full breakdown of Fajr, Dhuhr, Asr, Maghrib, and Isha statuses.
*   **Sunnah & Night Prayers:** Track Sunnah prayers, Witr, Tahajjud, and Nafl units alongside your Fardh.
*   **Temporal Persistence Engine:** LocalStorage-based daily draft system that auto-saves your prayer selections throughout the day and resets at midnight.
*   **Upsert Sync:** Database-level `.onConflictDoUpdate()` ensures one clean record per day, whether you log once or update throughout the day.
*   **Smart Redirect:** "Initialize Protocol" button in the modal deep-links to the Entry page with the Salah tab pre-selected.
*   **Empty State Handling:** Days without records display an "Absolute Absence" state with conditional actions (initialize only for today).

### 3. **Unified Entry Portal**
A streamlined, tabbed interface to log your daily deeds in seconds.
*   **5 Entry Categories:** Quran, Hadith, Dua, Knowledge, and Salah — each with dedicated forms and validation.
*   **Quran Logging:** Select from all 114 Surahs, specify verse ranges, reading status, and language.
*   **Hadith Logging:** Log by scholar collection (with book counts for Bukhari, Muslim, Tirmidhi, etc.), book number, hadith number, and personal reflection.
*   **Dua Logging:** Categorized supplication tracking with count support.
*   **Knowledge Logging:** Free-form knowledge point entries with type classification, title, and notes.
*   **Deep Link Support:** URL query parameter `?tab=Salah` (or any category) auto-selects the correct tab on page load.
*   **Suspense Loading:** Premium animated loading screen with orbiting rings and pulsing indicators during hydration.

### 4. **Discovery Sanctuary (Public Hub)**
A public workspace for multilingual spiritual discovery.
*   **Bilingual Exploration:** View Quran and Hadith in their original **Arabic script**, **Transliteration**, and **English translation**.
*   **Direct-to-Log:** Integrated "Save to My Journey" buttons that pre-populate your entry forms from discovered content.
*   **Wisdom Sharing:** Native Web Share API integration for instant sharing to social apps.

### 5. **History Vault & Journal**
Your complete spiritual archive, searchable and paginated.
*   **Full History:** Browse all logged entries across every category with infinite scroll pagination.
*   **Journal View:** Dedicated filtered view for personal journal/reflection entries.
*   **Search:** Real-time search across titles and content.

### 6. **Privacy-First Protocol**
Designed for deep personal reflection.
*   **Strict Data Isolation:** Every database row is procedurally scoped to the authenticated owner via Clerk user ID.
*   **Encrypted Authentication:** Powered by **Clerk** for world-class session security with webhook-based user sync.

---

## 🛠 Tech Stack & Architecture

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, React 19, Server Components |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | End-to-end type safety |
| **Database** | [Neon PostgreSQL](https://neon.tech/) | Serverless Postgres |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) v0.45 | Type-safe queries, migrations, upserts |
| **Auth** | [Clerk](https://clerk.com/) | Authentication, session management, webhooks |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first responsive design |
| **Animations** | [Motion](https://motion.dev/) (Framer Motion) | Premium micro-animations and transitions |
| **Charts** | [Recharts](https://recharts.org/) | Activity density visualization |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) | Accessible, composable primitives |
| **Validation** | [Zod](https://zod.dev/) v4 | Runtime schema validation for API inputs |
| **Icons** | [Lucide React](https://lucide.dev/) | 1000+ consistent SVG icons |
| **Notifications** | [Sonner](https://sonner.emilkowal.dev/) | Toast notifications |
| **Linting** | [Biome](https://biomejs.dev/) | High-speed linting & formatting |
| **Package Manager** | [Bun](https://bun.sh/) / npm | Fast dependency management |

### External APIs (Free, No API Key Required)

| API | Base URL | Usage |
|---|---|---|
| **AlQuran Cloud** | `https://api.alquran.cloud/v1` | Quranic verses — Arabic, English, transliteration, surah metadata |
| **Hadith API** | `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1` | Hadith collections — Bukhari, Muslim, Tirmidhi, and 20+ more |

---

## 📁 Project Structure

```
religion-tracker/
├── app/
│   ├── api/
│   │   ├── dashboard/
│   │   │   ├── prayers/       # GET: Fetch prayer history
│   │   │   ├── stats/         # GET: Dashboard statistics & chart data
│   │   │   └── vault/         # GET: Paginated history vault
│   │   ├── discovery/
│   │   │   └── daily/         # GET: Random Quran/Hadith/Dua of the day
│   │   ├── entry/
│   │   │   ├── dua/           # POST: Log dua entry
│   │   │   ├── hadith/        # POST: Log hadith entry
│   │   │   ├── knowledge/     # POST: Log knowledge entry
│   │   │   ├── prayer/        # POST: Log/upsert daily prayer record
│   │   │   └── quran/         # POST: Log quran entry
│   │   ├── journal/           # POST: Log journal entry
│   │   └── webhook/           # POST: Clerk webhook for user sync
│   ├── dashboard/             # Dashboard page (Command Center)
│   ├── discovery/             # Public discovery page
│   ├── entry/                 # Entry portal (page + loading screen)
│   ├── howitworks/            # How It Works page
│   ├── privacy/               # Privacy policy page
│   ├── sign-in/               # Clerk sign-in page
│   ├── sign-up/               # Clerk sign-up page
│   ├── layout.tsx             # Root layout (Clerk provider, fonts, Sonner)
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles & Tailwind config
├── components/ui/             # shadcn/ui components (Avatar, Button, Input, etc.)
├── db/
│   └── schema.ts              # Drizzle schema (users, quran, hadith, dua, knowledge, prayer, journal)
├── lib/                       # Utilities (Clerk client, Drizzle client, cn helper)
├── validators/                # Zod schemas for API input validation
├── drizzle.config.ts          # Drizzle Kit configuration
├── biome.json                 # Biome linting/formatting config
└── package.json
```

---

## 📦 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v20+) or [Bun](https://bun.sh/)
*   A **Clerk** account for authentication
*   A **Neon** (or any PostgreSQL) database instance

### 1. Installation
```bash
git clone https://github.com/walon-foundation/deen-track.git
cd deen-track
bun install # or npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```bash
# Database
DATABASE_URL=your_neon_postgres_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret

# Optional: Override API base URLs (defaults are built-in)
QURAN_BASE_URL=https://api.alquran.cloud/v1
HADITH_BASE_URL=https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1
```

### 3. Initialize Database
```bash
npm run db:push    # Push schema to database
npm run db:studio  # Optional: Open Drizzle Studio to inspect data
```

### 4. Launch
```bash
npm run dev
```
Visit `http://localhost:3000` — your spiritual command center awaits. 🌙

---

## 🧪 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run Biome linter |
| `npm run format` | Auto-format code with Biome |
| `npm run db:push` | Push Drizzle schema to database |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Run Drizzle migrations |
| `npm run db:studio` | Open Drizzle Studio GUI |

---

## ⚖️ License & Guidelines

*   **License:** Distributed under the **MIT License**. See `LICENSE` for details.
*   **Security:** For data privacy concerns or vulnerability reporting, see `SECURITY.md`.
*   **Contribution:** We welcome contributions from the community. See `CONTRIBUTING.md` to get started.

---
