<div align="center">
  <img src="https://github.com/walon-foundation/deen-track/raw/main/public/logo-placeholder.png" alt="DeenTrack Logo" width="120" height="120" />
  
  # DeenTrack Protocol.
  ### High-Fidelity Spiritual Tracker for the Modern Muslim.
  
  [![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-v0.45+-C5F74F?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)
  [![Clerk Auth](https://img.shields.io/badge/Clerk_Auth-Secure-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
  [![Neon DB](https://img.shields.io/badge/Neon_PostgreSQL-Serverless-00E599?style=for-the-badge&logo=neon)](https://neon.tech/)

  **DeenTrack** is a professional-grade, privacy-first platform designed to help Muslims track their spiritual progress, log daily reflections, and discover sacred wisdom through a high-contrast, immersive interface.
</div>

---

## 🚀 Key Features

### 1. **Command Center (Dashboard)**
A responsive, analytics-first overview of your spiritual journey.
*   **Activity Density Heatmap:** Visualize your consistency over 7 days, 30 days, or a year.
*   **Live Metrics:** Real-time counters for Quranic verses, Hadith studies, and Supplications.
*   **Daily Discovery:** A cached, rotating "Insight of the Day" card with built-in multi-lingual logic.

### 2. **Unified Entry Portal**
A streamlined interface to log your daily deeds in seconds.
*   **Multi-Category Logging:** Support for Quran, Hadith, Duas, and general Knowledge points.
*   **Detailed Metadata:** Log surah names, verse ranges, scholars, and personal reflections with ease.

### 3. **Discovery Sanctuary (Public Hub)**
A public workspace for multilingual spiritual discovery.
*   **Bilingual Exploration:** View Quran and Hadith in their original **Arabic script**, **Transliteration**, and **English translation**.
*   **Direct-to-Log:** Integrated "Save to My Journey" buttons that pre-populate your entry forms from discovered verses.
*   **Wisdom Sharing:** Native Web Share API integration for instant, high-fidelity sharing to social apps.

### 4. **Privacy-First Protocol**
Designed for deep personal reflection.
*   **Strict Data Isolation:** Every database row is procedurally scoped to the authenticated owner.
*   **Encrypted Authentication:** Powered by **Clerk** for world-class session security.

---

## 🛠 Tech Stack & Architecture

*   **Frontend Architecture:** [Next.js](https://nextjs.org/) App Router (React 19, Server Components).
*   **Database & Persistence:** [Drizzle ORM](https://orm.drizzle.team/) with **Neon PostgreSQL** (Serverless).
*   **State & Logic:** Framer Motion for premium animations, Lucide for iconography, and Recharts for data visualization.
*   **Development Workflow:** [Biome](https://biomejs.dev/) for high-speed linting/formatting and [Bun](https://bun.sh/) for package management.

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
# Database & Auth
DATABASE_URL=your_postgres_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key

# Public Spiritual APIs
QURAN_BASE_URL=https://api.alquran.cloud/v1
HADITH_BASE_URL=https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1
```

### 3. Initialize Database
```bash
npm run db:push
```

### 4. Launch
```bash
npm run dev
```

---

## ⚖️ License & Guidelines

*   **License:** Distributed under the **MIT License**. See `LICENSE` for details.
*   **Security:** For data privacy concerns or vulnerability reporting, see `SECURITY.md`.
*   **Contribution:** We welcome contributions from the community. See `CONTRIBUTING.md` to get started.

---
