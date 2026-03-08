# UX Engineering: Handshake Protocols & Constraints

## 🛡️ Immutable Constraints (The Rig Integrity)

- **The Safety Shelf Protocol:** The `.navbar::after` is a critical structural anchor. It provides the landing pad for
  the Nav Rig's **Orange Wedge** extrusions.
- **Wedge Alignment:** Desktop navigation MUST use `align-items: stretch`. This allows the pseudo-brackets to bridge the
  gap to the background rig with zero light-leak.
- **The Clean Edge Trick:** All `.feature-block` elements utilize `background-clip: padding-box` to force the canvas to
  terminate at the inside edge of the 2px border, preventing sub-pixel color-bleed.

## 🏗️ Interaction Handshakes (Kinetic Logic)

### 1. The Kinetic Lift & Atmospheric Gap

Hovering a `.feature-block` triggers a `-4px` `translateY`. In the archive context, this is framed by a **38.4px
Atmospheric Gap**, providing the necessary "Bloom" room for Pine-pigmented shadows to expand without overlapping
adjacent content.

### 2. The 400ms Kinetic Power-Down

The `closeModal()` sequence is throttled to exactly 400ms. This is a registered "Power-Down" sequence that provides
visual confirmation of system closure before the DOM element is natively purged.

### 3. Singleton Performance Logic

Global interactive components (like the contact portal) are engineered as **Singletons**. The system maintains a
persistent reference after the initial fetch, preventing redundant network requests and reducing DOM overhead during the
session.

## 📱 Adaptive Physics (Mobile Constraints)

- **The 44px Protocol:** All interactive triggers are calibrated to a 44px minimum touch-target to accommodate human
  motor variance.
- **Shutter Compression:** Gaps are reduced to `23.04px` on mobile to maintain rhythm on reduced vertical real estate.

## ♿ A11y Handshake Protocols (WCAG AA)

### 1. The Narrative Bypass (aria-describedby)

To maintain high-fidelity visual storytelling without triggering WAVE (Web Accessibility Evaluation Tool) "Long Alt
Text" errors, the Rig utilizes a **Linked Description Rig**:

- **Constraint:** `alt` attributes are strictly functional (max 125 characters) to provide immediate context and clear
  the WAVE character ceiling.
- **Protocol:** Extended poetic or technical narratives are housed in a `.visually-hidden` buffer and linked via
  `aria-describedby`.
- **Naming Convention:** IDs follow a `desc-[page]-[context]` pattern to prevent global scope collisions.

### 2. The Visually-Hidden Utility

The system utilizes a non-destructive CSS clip-path to ensure diagnostic narratives remain available to screen readers
while maintaining the "Steady Flood" visual cleanliness.
