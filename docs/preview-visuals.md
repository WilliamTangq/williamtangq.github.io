# Project interface studies

All five homepage covers and all fifteen case-study scenes use one shared renderer in `assets/preview-scenes.js`.

| Project | First scene | Second scene | Third scene |
| --- | --- | --- | --- |
| Agencia | Shared change-planning workspace | Guided onboarding | Action register |
| TanShift | Weekly roster | Leave/swap request review | Scheduling business rules |
| InnerLeaf | Reflection editor | Structured output contract | Access and acceptance scenarios |
| Database & SQL | Representative ERD | SQL and sample output | Integrity review |
| CS TAN | Operations board | Document workflow | Sample stock analysis |

## Design

Each project has a distinct accent and sidebar palette. Browser framing, spacing, tables, labels, typography and controls form a consistent system. Illustrations contain sample content and never imply captured client screens or measured project results.

Homepage covers are rendered in the HTML, so they remain available without JavaScript. Native dialog support enables five Preview visual buttons, each opening the complete three-scene gallery. Case pages also include a static first scene as a fallback.

## Interaction

- Tabs support Arrow Left/Right, Home and End.
- Previous/next controls wrap between scenes.
- Expand retains the active case-study scene.
- A reusable native dialog supplies modal focus containment and background inertness.
- Close button, Escape and backdrop dismissal restore focus to the originating trigger.
- Reduced-motion settings are respected.
- Mobile layouts keep every scene and process step. Wide tables and ERDs scroll within their preview area.

## Checks

Run:

```sh
node scripts/check-portfolio.mjs
node scripts/check-preview-visuals.mjs
```

The preview check covers 116 rendering and interaction assertions with DOM fixtures. Structural checks also cover the fifteen scenes and generated gallery markup. A browser execution environment was unavailable during implementation; real layout, native dialog behaviour and browser accessibility results have not been verified.
