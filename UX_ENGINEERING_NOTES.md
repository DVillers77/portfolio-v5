# UX Engineering: Logic & Interaction Rules

## 🛡️ Sacred Layout Rules (DO NOT MODIFY)

- **Slideshow Controls:** Controls must maintain specific 'Straddle' math:
  - Desktop: 50% on/50% off.
  - Mobile: 75% inside/25% off (using exactly `-18px` offset).
- **Safety Shelf:** The `.navbar::after` height (15px) and its 12px solid
  linear-gradient stop are critical to prevent "bracket bleed."
- **Feature Block Spacing:** Current vertical gaps are finalized; do not adjust
  margins/paddings between blocks.
- **Image Integrity:** Lock all feature images to `aspect-ratio: 1/1` and
  `object-fit: cover`.

## 🏗️ Phase 2: Contact Modal Refactor (Engineering Log)

### 1. Atmospheric HUD Design
* **The "Ink-Pool" Surface:** To avoid a "flat" pop-up feel, the background uses a `135deg` linear gradient (`#002d23` to `#121212`). This creates depth, making the top-left Pine tint feel illuminated by the global environment.
* **Backlit Neon Bloom:** The modal utilizes a triple-layered `box-shadow` system (10px, 25px, 50px) positioned *behind* a sharp 2px Pine border. This simulates the physics of neon light throwing a bloom onto a dark surface.
* **System Rail Anchor:** The modal header (H2) is anchored by a full-width Violet Rail with 5% to 95% transparency fades. This "Mirror Logic" ensures the modal shares the same visual DNA as the global navigation bars.

### 2. Interaction Geometry
* **Input Standardization:** All form fields (input, textarea) utilize a `0.5rem` (8px) border-radius. This aligns with the "Shape Language" of the primary CTA buttons, creating system-wide consistency.
* **HUD Field Styling:** Inputs use a tinted "Transparent Ink" (`rgba(255, 255, 255, 0.08)`) to maintain the atmospheric theme without the jarring contrast of traditional white boxes.

### 3. Accessibility & Visual Affordance
* **The 44px Exit Target:** The Floating Close-X was scaled to a **2.75rem (44px)** diameter to meet WCAG touch-target standards.
* **Visual Scale Boost:** The "X" stroke weight was increased to **4px** with a **25% scale increase** in length. This ensures the exit path is immediately obvious against the intense violet background bloom.
* **Center-Weight Offset:** The icon is positioned with a **4px inward shift** (`top/right: 0.0625rem`) to achieve perfect visual centering within the expanded 3rem/2.5rem modal padding zone.

## 🍔 Interaction & Cognitive Load

- **Hamburger Animation:** Restore the animation where the hamburger icon
  transforms into an 'X' when active.
- **Icon Consistency:** The 'X' in the navbar and the 'X' in the contact modal
  must share the same stroke weight (4px) and visual scale.
  - **Slideshow Dot Affordance:** Inactive dots utilize a `1.2x` scale and violet bloom on hover to provide visual affordance while maintaining the "active" magenta pill as the primary status indicator.
- **Accessibility:** Existing ARIA roles, focus-trapping in `script.js`, and Escape-key listeners are sacred and must be preserved.
- **Accessibility:** Existing ARIA roles, focus-trapping in `script.js`, and
  Escape-key listeners are sacred and must be preserved.

## 📱 Mobile Refinements

- **Button Stacking:** Keep 'Demo' and 'Code' buttons side-by-side on mobile to
  minimize vertical scroll length.
- **H3 Ordering:** On `index.html`, ensure the H3 "Jump to section" sits
  directly above the buttons (`order: 4`).