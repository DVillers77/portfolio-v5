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

## 🍔 Interaction & Cognitive Load

- **Hamburger Animation:** Restore the animation where the hamburger icon
  transforms into an 'X' when active.
- **Icon Consistency:** The 'X' in the navbar and the 'X' in the contact modal
  must share the same stroke weight and visual scale.
- **Accessibility:** Existing ARIA roles, focus-trapping in `script.js`, and
  Escape-key listeners are sacred and must be preserved.

## 📱 Mobile Refinements

- **Button Stacking:** Keep 'Demo' and 'Code' buttons side-by-side on mobile to
  minimize vertical scroll length.
- **H3 Ordering:** On `index.html`, ensure the H3 "Jump to section" sits
  directly above the buttons (`order: 4`).
