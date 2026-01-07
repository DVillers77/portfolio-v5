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

## 📱 Mobile Interaction Rules
- **Button Stacking:** 'Demo' and 'Code' buttons must remain side-by-side to minimize vertical scroll length.
- **Touch Targets:** All interactive elements (Close-X, Dots, Links) maintain a minimum **44px (2.75rem)** hit area for WCAG compliance.
- **Center-Weight Offset:** Modal "X" icons use a 4px inward shift to achieve perfect visual centering within the 3rem padding zone.