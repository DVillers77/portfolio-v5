# Antigravity Migration Instruction (Refactor Log)

## 🏁 Current Milestone: V26 High-Fidelity Rig Integration

### 1. Spacing & Spines

- [x] Implement **Spinal Tap Gauge Engine** (80px/48px base).
- [x] Calibrate **Archive Shutter** (38.4px gap) for `.project-archive`.
- [x] Verify shadow-clearance (30px shadow vs 38.4px margin).

### 2. Interaction & Brackets

- [x] Implement **Orange Wedge** pseudo-brackets for active nav states.
- [x] **Constraint:** Maintain `align-items: stretch` on navbar to preserve wedge-to-shelf integrity.
- [x] Register `-4px` kinetic lift on `.feature-block` hover.

### 3. Tonal Calibration

- [x] Refactor out all M3/Material Design tokens.
- [x] Register **Phonic Type System** (Redline, Talk, Muted, Whisper).
- [x] **AA Safety Audit:** Set `--sys-color-type-muted` to 20% mix floor for legibility.

# Refactor History (Archived)

## 🏁 Milestone: V26.2 Semantic Handshake

- [x] Refactored site-wide alt text into functional headlines.
- [x] Standardized "Preview Rig" for slideshow images to eliminate description redundancy.
- [x] Registered `@property` variables for CSS Houdini transitions.
- [x] **Syntax Branding:** Logo `Dave's` injected and stable across all pages.
- [x] Resolved Chrome-tab bracket bleed via `.navbar::after` safety shelf.

## 🏁 Milestone: V26.2 Diagnostic Hardening (Resolved)

- [x] Stabilized Slideshow Hitbox via `::after` (Restored Pill vs. 44px Protocol).
- [x] Resolved "Ghost Contrast" via explicit `--sys-color-primary` rgb 1, 98, 75; fallback on `.main-container`.
- [x] Re-sequenced Project Titles to `<h2>` to satisfy Semantic Hierarchy requirements.
- [x] Deployed Unique Meta Descriptions for Index, About, and Projects (SEO 100).

## 🏁 Milestone: V26.3 Performance & Asset Hardening (COMPLETE)

### 🚀 Network & Resource Orchestration

- [x] Implemented `rel="preload"` for FontAwesome 4.7 to bypass CSS discovery delay.
- [x] Optimized `<head>` sequence: `preconnect` → `preload` → `stylesheet` → `script defer`.
- [x] Verified `&display=swap` integration across all Google Font strings to eliminate FOIT.

### 🖼️ Image Architecture & Visual Physics

- [x] Established **500px "Universal Rail"** width for all feature and project assets.
- [x] Standardized Square Assets to **500x500** (1:1 Ratio) for Dain Miller and Todo App.
- [x] Standardized Portrait Assets to **500x625** (4:5 Ratio) for Main Portrait, API Fun Center, Tic-Tac-Toe, and
      Meta-Study.
- [x] Mapped intrinsic `width` and `height` attributes to all `<img>` tags to anchor the browser pre-parser.
- [x] Confirmed `aspect-ratio: 4/5` CSS override is active and synchronized with physical file dimensions.
- [x] Resolved "Ghost Box" layout stability, achieving **0.00 CLS** (Cumulative Layout Shift).

### ⚡ Critical Path & Loading Logic

- [x] Assigned `fetchpriority="high"` to "Above the Fold" Hero assets (Slide 1 and Index Hero).
- [x] Deployed Native Lazy Loading (`loading="lazy"`) for all off-screen storyteller blocks.
- [x] Applied `decoding="async"` to non-critical imagery to reduce main-thread execution time.
- [x] Segmented Slideshow fetch logic (Priority for Slide 1 / Deferred for Slides 2+).

### 🛠️ Structural & Semantic Hardening

- [x] Fixed semantic typo in Project Slideshow (Corrected `h2` / `h3` mismatch).
- [x] Purged nested HTML comments from `<img>` tags to restore syntax highlighting and parser speed.
- [x] Verified 44px Touch Target compliance and `aria-describedby` links for 100/100 Accessibility.

---

### 📝 Logic Note: The 500px Baseline

Standardizing on a **500px width** for both square and portrait assets creates a unified vertical anchor. This
"Universal Rail" provides the necessary visual weight to balance text-heavy columns while ensuring a predictable scaling
behavior across mobile and desktop viewports.

## 🏁 Milestone: V26.3.1 Link Integrity & Routing (COMPLETE)

### 🔗 Routing & Project Connectivity

- [x] Audited all external Live Demo and Repository links on the Projects page.
- [x] Resolved widespread 404 errors by updating URL paths to match the new repository naming conventions.
- [x] Verified successful handshakes for the following project routes:
  - Modern Tic-Tac-Toe
  - API Fun Center
  - Interactive To-Do App
- [x] Confirmed `target="_blank"` and `rel="noopener noreferrer"` attributes are present for all outbound engineering
      links.

### 4. Accessibility & Semantic Rig

- [x] Implement `.visually-hidden` utility for high-fidelity narrative offloading.
- [x] Standardize image metadata to clear **WAVE Audit** character limits (<125 chars).
- [x] Audit and link all "Transcendental" imagery via `aria-describedby` IDs.
- [x] Verified 100% WCAG AA compliance across Index, About, and Projects via the WAVE engine.
