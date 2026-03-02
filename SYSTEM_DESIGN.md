# System Design: Tonal Tokens & Spacing Physics

## 🌌 Atmospheric Engine (V25 Rig)

The interface is powered by a high-fidelity "Steady Flood" lighting system utilizing CSS `@property` registrations to
eliminate color-banding.

| Property    | Initial Value | Role                                   |
| :---------- | :------------ | :------------------------------------- |
| `--sunX`    | `50%`         | Horizontal focal point (Inertia Shift) |
| `--sunY`    | `50%`         | Vertical focal point (Scroll-Synced)   |
| `--sunSize` | `400%`        | Hard-coded Illumination Constant       |

## 🎨 Tonal Color Palette (Pigment Profiles)

All hex codes are deprecated in favor of RGB Tonal Tokens to allow for the **Clean Edge Trick** and transparency control
within the "Steady Flood".

| Role              | Token Name            | RGB Value      | Hex Equivalent    |
| :---------------- | :-------------------- | :------------- | :---------------- |
| **Brand Base**    | `--sys-color-primary` | `1, 98, 75`    | #01624b (Pine)    |
| **Brand Feel**    | `--sys-color-accent`  | `156, 39, 176` | #9c27b0 (Violet)  |
| **Action/Portal** | `--sys-color-action`  | `255, 0, 255`  | #ff00ff (Magenta) |

## 📐 The Chrome-Tab Rig (Active State Logic)

The active navigation tab mimics the "Sovereignty" of a browser tab.

- **The Wedge Protocol:** Uses `:before` and `:after` pseudo-elements as "Orange Wedge" brackets.
- **Extruded Radii:** These brackets create a negative corner radius that blends the tab into the "Safety Shelf"
  (`.navbar::after`).
- **The Safety Shelf:** A 15px structural anchor that provides the landing pad for the wedges, ensuring zero light-leak
  during state transitions.

## 🖋️ Typography & Ink Weight (1.414 Harmonic)

We employ an **Augmented Fourth Scale** with a focus on **APCA-aware contrast**.

- **Phonic Volume Registry:** We use "Ink Weight" (Canvas Mixing) instead of static grays to ensure legibility across
  display types (OLED vs. LCD).
- **Muted Floor:** Set to a 20% canvas mix to maintain WCAG 2.1 AA compliance on non-Retina hardware.
