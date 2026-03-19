# Security Policy

## DeenTrack Privacy & Security Guarantee

We understand that a spiritual journal is deeply personal. **DeenTrack** is built with a "Privacy-First" architecture to ensure your reflections and progress remain yours alone.

### Data Ownership
*   **No Third-Party Brokers:** Your data is never sold or shared with advertisers.
*   **Encrypted Authentication:** We utilize **Clerk** to handle identity management, ensuring session security and two-factor authentication (if enabled).

### Technical Safeguards
*   **User Isolation:** Every data request is forced through an authentication layer. All database queries are procedurally scoped to the `userId` of the active Clerk session. Cross-user data bleed is architecturally impossible.
*   **Encrypted Storage:** All data is stored in **Neon PostgreSQL**, utilizing SSL/TLS for all transit-level communication.
*   **Secrets Management:** Sensitive keys and API routes (Quran, Hadith) are strictly managed via environment variables (`.env`) and never committed to version control.

## Reporting a Vulnerability

If you discover a security vulnerability within DeenTrack, please send an e-mail to the Walon Foundation team. Please include a detailed technical description of the issue and steps to reproduce.

### Responsible Disclosure
We ask that you:
*   Give us reasonable time to investigate and mitigate the issue before making it public.
*   Avoid data privacy violations and service interruptions.
*   Do not access or modify data that does not belong to your test account.

## Supported Versions

Only the latest `main` branch of this repository is actively supported with security patches. We recommend all users keep their local deployments up to date with the upstream repository.
