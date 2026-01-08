# UX Engineering: Logic & Interaction Rules

## 🛡️ Sacred Layout Rules (DO NOT MODIFY)
- **The "Safety Shelf":** The `.navbar::after` (15px) and its 12px solid linear-gradient stop are critical. They prevent "bracket bleed" from the navigation links into the hero section.
- **Navbar Alignment:** Desktop MUST use `align-items: stretch`. This allows the "Chrome Tab" brackets of active links to bridge the gap to the background rig perfectly.
- **Slideshow Controls:** - Desktop: 50% on/50% off.
  - Mobile: 75% inside/25% off (exactly `-18px` offset).

## 🏗️ Architectural Refactor Logs
### 1. Typographic Hierarchy (V24)
* **Problem:** Mobile blockquotes (1.5rem) competed with H2 headers, causing cognitive load issues.
* **Solution:** Reduced Mobile Quote size to **1.1rem**. This restores a **20% visual gap**, ensuring H2s remain the primary anchor point.

### 2. Atmospheric HUD Design (Modals)
* **Surface:** Background uses a `135deg` gradient (`#002d23` to `#121212`) to create environmental depth.
* **Lighting:** A triple-layered `box-shadow` (10px, 25px, 50px) simulates neon throw.
* **Falloff:** Gradient extends to **115%** of container width to ensure soft-light dissipation on dark corners.

## 📱 Mobile & Tablet Interaction Rules
- **Vertical CTA Stacking:** Primary button MUST be on top of Secondary for all vertical layouts (Mobile).
- **CTA Pairing Registry:**
  - Home: [P] Projects | [S] My Story
  - About: [P] Contact Me | [S] LinkedIn
  - Projects: [P] Live Demo / Case Study | [S] Source Code
- **Micro-Interaction:** The Contact Modal 'Submit' button enters a `.button--success` state (Sent ✓) upon valid Formspree trigger.

## 🏗️ Architectural Refactor Logs
### 3. Grid Equilibrium (810px - 1000px)
- **Constraint:** Text columns in 2-col grids occasionally exceed image height.
- **Rule:** Prioritize "Reading Terminus" (CTA at bottom of text). Use `align-items: center` or fluid column ratios (e.g., 60/40) to maintain visual balance without fragmenting the action.