# Completion review: five selected project showcases

The existing main-branch custom cover artwork and five interactive experiences were retained. No homepage, Agencia, resume, contact, experience or other case content changed.

- Removed superseded browser-style interface galleries from TanShift, InnerLeaf and Database & SQL to avoid duplicated demonstrations.
- Added three selected, already-redacted RespiraCare UserDoc captures and two original governance coursework slides, with team/individual attribution.
- Increased small labels and body copy within the five case experiences.
- Cleared previous SQL results whenever the selected business question changes.
- Added a runnable fictional SQLite fixture; three displayed query recipes and a rejected foreign-key insert were checked against SQLite. The browser remains a JavaScript simulation.

Verification: `node scripts/check-portfolio.mjs` and `python scripts/check-case-experiences.py`. Browser review covers the five experiences at desktop and 340 CSS-pixel width, image enlargement and keyboard dismissal, blocked and accepted scheduling, published staff visibility, reflection choices, evidence-version invalidation and query changes.

Evidence sources: RespiraCare-Healthcare-Platform-BA-UX assets/screens (patient-dashboard, patient-booking-form, admin-dashboard); Daihatsu-IT-Strategy-Governance-Case-Study assets (governance-gap, technology-profile). Original image bytes are preserved.
