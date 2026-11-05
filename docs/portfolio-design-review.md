# Portfolio design review — 6 November 2026

## Direction

An editorial portfolio for a Business Information Systems candidate who can connect business context with implementation. Retain a restrained light surface and blue accent, introduce a stronger type hierarchy and a single dark project spotlight, and move project evidence ahead of biography.

The goal is a clear answer to three questions: who is William, what work has he done, and what was his specific contribution?

## Reference study

These are selected references, not an exhaustive ranking. Accessible site content and public descriptions informed the analysis; no rendered browser or screenshot inspection was available in this session.

| Reference | What is useful | Application here |
| --- | --- | --- |
| [Brittany Chiang](https://brittanychiang.com/) | A specific professional introduction, experience and selected projects with routes to evidence | State William's business/systems focus immediately; give each project a role, context and case-study link |
| [Rauno Freiberg](https://rauno.me/) | A strong focus on craft, projects and interaction | Use restrained hover/focus feedback and precise layout; avoid adding motion without a visitor task |
| [Bruno Simon](https://bruno-simon.com/) | A portfolio interaction that directly demonstrates the creator's specialism | Make William's way of working visible through process diagrams and distinct project covers; keep the work easy to scan |
| [User-supplied David reference](https://david-portfolio-web.vercel.app/) | Exact site could not be retrieved after repeated attempts | No visual observations or design features are attributed to it; similarly named search results were excluded |

## Findings from the original repository

- The home page contained approximately 129 KB of combined markup, overlapping styles and scripts.
- The hero, profile and capabilities sections repeated broad positioning before the project evidence.
- Existing project case studies, source links and role-specific resumes provide a useful foundation.
- Mobile case-study navigation was hidden at the original narrow breakpoint.
- Three case-study pages were missing a closing wrapper element near the skills section.

## Implemented decisions

1. **Identity and hierarchy:** large headline, visible full name, a short description and direct work/resume actions.
2. **Project priority:** Agencia leads as a real client project, with personal contribution distinct from project context.
3. **Different visual treatments:** onboarding flow, roster, reflection cards, relational model and commercial document workflow. Covers remain explicitly illustrative.
4. **Evidence routes:** case study, source repository or official showcase, depending on what exists. No invented testimonials or performance figures.
5. **Project filtering:** five projects can be explored by business analysis, systems/product or data/operations. Without JavaScript all projects remain visible.
6. **A practical narrative:** selected work → approach → experience → background/toolkit → contact.
7. **Responsive navigation:** a native-button mobile menu, Escape dismissal, focus return and preserved case-study links.
8. **Accessible defaults:** skip links, visible focus indicators, live filter results, reduced-motion support and semantic headings.
9. **Maintainability:** the homepage now has dedicated CSS and JavaScript. The original case galleries and application documents remain available.
10. **Consistent case pages:** shared theme, source links near the header, return navigation and corrected HTML nesting.

## Validation

- Checked all 10 HTML pages and 93 local links/assets and fragments.
- Checked nesting of the revised homepage and five case studies.
- Parsed the homepage and existing gallery JavaScript.
- Passed 21 interaction assertions using DOM fixtures: filtering, exclusive pressed state, live result counts, menu closure, Escape/focus return, active section tracking and optional-feature fallback.
- Checked stylesheet delimiter balance and essential text/accent contrast pairs.
- A reusable dependency-free check is available with `node scripts/check-portfolio.mjs`.
- These checks do not establish rendered layout, actual keyboard behaviour, viewport overflow or browser accessibility results. A browser execution environment was unavailable.

## Content boundaries

Existing project and experience claims are based on the supplied repository. The industry project is not presented as solo work, TanShift remains a prototype, database work remains coursework, and no private client screenshots are implied by the illustrations.

## Rollback

The pre-redesign main commit is `6c73f5904781a3f39127c6e3c25abe0b2d7a6cb5`. Git history preserves the original site.
