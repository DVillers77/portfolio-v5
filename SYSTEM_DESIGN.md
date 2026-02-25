# System Design: Tonal Tokens & Spacing Physics

## 🌌 Atmospheric Engine (V25 Rig)

The interface is powered by a high-fidelity "Steady Flood" lighting system. Utilizing CSS `@property` registrations, the
engine eliminates color-banding and provides a living UI depth without performance regression.

| Property    | Initial Value | Role                                   |
| :---------- | :------------ | :------------------------------------- |
| `--sunX`    | `50%`         | Horizontal focal point (Inertia Shift) |
| `--sunY`    | `50%`         | Vertical focal point (Scroll-Synced)   |
| `--sunSize` | `400%`        | Hard-coded Illumination Constant       |

## 🎨 Tonal Color Palette (Pigment Profiles)

All hex codes are deprecated in favor of RGB Tonal Tokens to allow for the **Clean Edge Trick** and transparency control
within the "Steady Flood."

| Role              | Token Name            | RGB Value      | Hex Equivalent    |
| :---------------- | :-------------------- | :------------- | :---------------- |
| **Brand Base**    | `--sys-color-primary` | `1, 98, 75`    | #01624b (Pine)    |
| **Brand Feel**    | `--sys-color-accent`  | `156, 39, 176` | #9c27b0 (Violet)  |
| **Action/Portal** | `--sys-color-action`  | `255, 0, 255`  | #ff00ff (Magenta) |

## 🏷️ The Chrome-Tab Rig (Active State Logic)

The active navigation tab is engineered to mimic the "Sovereignty" of a browser tab.

- **The Wedge Protocol:** Uses `:before` and `:after` pseudo-elements as "Orange Wedge" brackets.
- **Extruded Radii:** These brackets create a negative corner radius that blends the tab into the "Safety Shelf"
  (`.navbar::after`).
- **Visual Result:** The active tab extrudes from the background, acting as a permanent page label while inactive tabs
  remain "submerged."

## 📐 Typography Scale (1.414 Harmonic)

Base font size is 16px. We employ an **Augmented Fourth Scale** to ensure non-melodic, high-tension hierarchy.

- **Display (H1):** `clamp(2.5rem, 10vw, 6rem)` | Line-height: 1.1 (Poppins)
- **Body:** `1rem` | Line-height: 1.6 (Inter)
- **Muted Floor:** `0.8rem` | 20% Canvas Mix | Minimum floor for technical metadata.
