# UX Engineering: Handshake Protocols & Constraints

## 🛡️ Immutable Constraints (The Rig Integrity)

These rules are hard-coded to prevent "Bracket Bleed" and layout collapse. They must be maintained during all future
refactors.

- **The Safety Shelf Protocol:** The `.navbar::after` (15px) is a critical structural anchor. It provides the landing
  pad for the Nav Rig's **Orange Wedge** extrusions.
- **Wedge Alignment:** Desktop navigation MUST use `align-items: stretch`. This allows the `:before` and `:after`
  pseudo-brackets of the active tab to bridge the gap to the background rig with zero light-leak.
- **The Clean Edge Trick:** All `.feature-block` elements utilize `background-clip: padding-box`. This forces the white
  canvas to terminate at the inside edge of the 2px border, preventing color-bleed on high-DPI (Retina) displays.

## 🏗️ Interaction Handshakes (Kinetic Logic)

Interaction is treated as a physical event between the Pilot and the System.

### 1. The Kinetic Lift

Hovering a `.feature-block` triggers a `-4px` `translateY`.

- **Calibration:** In the `project-archive` context, this lift is framed by the **38.4px Atmospheric Gap**. This
  provides the necessary "Bloom" room for the Pine-pigmented shadows to expand without overlapping adjacent content.

### 2. The 400ms Modal Handshake

The `closeModal()` function in `script.js` is throttled to exactly 400ms.

- **Purpose:** This is not a delay; it is a registered kinetic fade-out. It provides the user with visual confirmation
  of system "Power-Down" before the DOM element is purged.

### 3. Phonic Volume Registry (Contrast Control)

We utilize "Ink Weight" to manage the user's focus hierarchy.

- **Redline:** 0% Dilution. Reserved for primary anchors and H1 display.
- **Talk:** 10% Canvas Mix. Standard narrative flow.
- **Muted Floor:** 20% Canvas Mix. Minimum floor for technical metadata to ensure **WCAG 2.1 AA** compliance on
  non-Retina hardware.

## 📱 Adaptive Physics (Mobile Constraints)

- **The 44px Protocol:** All interactive triggers (nav-links, buttons) are calibrated to a 44px minimum touch-target to
  accommodate human motor variance.
- **Shutter Compression:** Gaps are reduced to `23.04px` on mobile. This maintains the "Zig-Zag" rhythm while accounting
  for the reduced vertical real estate.
