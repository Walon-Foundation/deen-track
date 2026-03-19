# Islamic Religion Tracker Application Plan

## 1. Overview
A mobile-first web application to track Islamic religious progress. The app will focus on a clean, modern, and premium User Experience (UX), featuring a dashboard that highlights weekly progress, specifically tracking Hadith readings, Duas, Quran progression, and customizable user goals.

## 2. Technology Stack
- **Framework:** Next.js (App Router, version 14+)
- **Styling:** Tailwind CSS + Vanilla CSS variables
- **UI Components:** shadcn/ui & daisyUI
- **Animations:** Framer Motion (for smooth micro-interactions, swipeable lists, page transitions)
- **Database/ORM:** PostgreSQL via Prisma ORM (or Drizzle)
- **Mobile Access:** Configured as a Progressive Web App (PWA) to allow "Add to Home Screen" functionality, mimicking a native mobile application.

## 3. Color Palette & Design Aesthetics
- **Primary (Base):** Pure White (`#FFFFFF`) for backgrounds, highlighting clean, spacious aesthetics.
- **Secondary (Accents):** Sky Blue (`#0EA5E9`, `#38BDF8`) for call-to-action buttons, active states, progress bars, and charts.
- **Tertiary (Text/Borders):** Elegant Greys (`#64748B`, `#94A3B8`, `#F1F5F9`) for primary/secondary text, subtle dividers, and component backgrounds.

## 4. Features & Pages Architecture
The interface will be heavily optimized for mobile usage, featuring a sticky bottom navigation bar.

1. **Dashboard Home (`/`)**:
   - Overview of weekly counts (Dua, Hadith, Quran).
   - Display of user-set progress goals (e.g., "7/10 Quranic Verses Read Today").
   - Quick action Floating Action Button (FAB) to instantly log new entries.
   - Recent activity feed.

2. **Goals Management (`/goals`)**:
   - A dedicated section for users to define and manage daily/weekly goals.
   - **Examples:** "Memorize 10 verses per day", "Read 2 Hadiths per week", "Make 3 specific Duas per day".

3. **Quran Tracker (`/quran`)**:
   - Track Surah name and Verse Range.
   - Toggles for reading language (Arabic, English, Both) and status (Read, Memorized).
   - Visual progress rings correlating with daily/weekly goals.

4. **Hadith Hub (`/hadith`)**:
   - Log Hadith name/number (e.g., "Sahih al-Bukhari 1").
   - Record the scholar/narrator.
   - Text area for the user's personal understanding and reflection.

5. **Dua Library (`/dua`)**:
   - Log Duas made with categorized purposes (e.g., Health, Wealth, Forgiveness).
   - Track total count per week.

6. **Weekly Reflection (`/reflection` or within Dashboard)**:
   - Dedicated flow to review the week’s progress.
   - Input fields for verses read, areas to improve, and useful insights.

## 5. Database Schema Design
We will structure the backend using relational tables, utilizing Clerk for authentication. The core `User` model will contain a `clerk_id` to link the external provider to an internal `id`, ensuring the `clerk_id` isn't passed around unnecessarily.

### Table 1: User
- `id` (UUID, PK) -> Used securely as local reference
- `clerk_id` (String, Unique) -> Used exclusively to link login sessions
- `created_at` (DateTime)

### Table 2: GoalTracker *(New)*
- `id` (UUID, PK)
- `user_id` (FK -> User)
- `goal_type` (Enum: `QURAN_VERSES`, `HADITH`, `DUA`)
- `target_count` (Integer)
- `frequency` (Enum: `DAILY`, `WEEKLY`)
- `created_at` (DateTime)

### Table 3: QuranEntry
- `id` (UUID, PK)
- `user_id` (FK -> User)
- `surah_name` (String)
- `verse_range` (String)
- `status` (Enum: `MEMORIZED`, `READ`)
- `language` (Enum: `ARABIC`, `ENGLISH`, `BOTH`)
- `logged_at` (DateTime)

### Table 4: HadithEntry
- `id` (UUID, PK)
- `user_id` (FK -> User)
- `scholar` (String)
- `hadith_name` (String)
- `understanding` (Text)
- `logged_at` (DateTime)

### Table 5: DuaEntry
- `id` (UUID, PK)
- `user_id` (FK -> User)
- `category` (String)
- `count` (Integer)
- `logged_at` (DateTime)

### Table 6: WeeklyReflection
- `id` (UUID, PK)
- `user_id` (FK -> User)
- `week_start_date` (Date)
- `verses_read_count` (Integer)
- `useful_insights` (Text)
- `areas_to_improve` (Text)
- `created_at` (DateTime)
