# Contributing to DeenTrack

Thank you for your interest in contributing to **DeenTrack** by the Walon Foundation! We're building a world-class spiritual tracker to help humans maintain knowledge and discipline in their daily practice.

## Development Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Aesthetics:** [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://framer.com/motion)
*   **Database:** [Drizzle ORM](https://orm.drizzle.team/) + [Neon PostgreSQL](https://neon.tech/)
*   **Auth:** [Clerk](https://clerk.com/)
*   **Tooling:** [Biome](https://biomejs.dev/) (Linting & Formatting)

## Getting Started

1.  **Fork** the repository and clone it to your machine.
2.  **Environment Setup**:
    *   Create a `.env` based on the `.env.example` (or existing `.env` provided).
    *   Ensure `DATABASE_URL` and `CLERK_SECRET_KEY` are defined.
3.  **Install Dependencies**:
    ```bash
    bun install
    # or
    npm install
    ```
4.  **Database Migration**:
    ```bash
    npm run db:push
    ```
5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Submitting a Pull Request

1.  **Create a Branch**: `git checkout -b feature/your-feature-name`
2.  **Code Quality**: Ensure your code passes linting and formatting.
    ```bash
    npm run lint
    npm run format
    ```
3.  **Commit with Context**: Use descriptive commit messages.
4.  **Open a PR**: Describe your changes in detail. Include screenshots or videos for UI-related changes.

## Architectural Principles

*   **Privacy First**: Never fetch or display data without an explicit `userId` filter.
*   **High Fidelity**: Maintain the "Pro" aesthetic with subtle animations, large typography, and high-contrast color palettes.
*   **Modular Layouts**: Keep global components (Navbar, Footer) in `components/layout` and manage route-specific logic via `AppLayoutWrapper.tsx`.
*   **Server Actions & API Routes**: Use the App Router's server-first approach for all data mutations and sensitive fetches.

---

Build with purpose. Build for the Ummah.
