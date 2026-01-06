# System Design: Tonal Tokens & Typography

## 🎨 Tonal Color Palette (Intent-Based)

All hex codes are being deprecated in favor of RGB Tonal Tokens to allow for
atmospheric layering.

| Role              | Token Name          | RGB Value      | Hex Equivalent    |
| :---------------- | :------------------ | :------------- | :---------------- |
| **Brand Base**    | `--sys-pine-rgb`    | `1, 98, 75`    | #01624b (Pine)    |
| **Brand Feel**    | `--sys-violet-rgb`  | `156, 39, 176` | #9c27b0 (Violet)  |
| **Action/Portal** | `--sys-magenta-rgb` | `255, 0, 255`  | #ff00ff (Magenta) |

## 📐 Material 3 Typography Scale (rem-based)

Base font size is 16px. All values must be implemented in `rem`.

- **Display (H1):** `3.5rem` | Line-height: 1.1 | Letter-spacing: -0.02em
- **Headline (H2):** `1.75rem` | Line-height: 1.2 | Letter-spacing: 0
- **Title/Label (H3):** `1.125rem` | Line-height: 1.4 | Letter-spacing: 0.01em
- **Body:** `1rem` | Line-height: 1.6 | Letter-spacing: 0.02em

## 🔘 Button Hierarchy

1. **Primary (View Live Demo):** Filled `--sys-pine-rgb`.
2. **Tonal (View Code):** Semi-transparent `--sys-pine-rgb` or Outlined Violet.
3. **Interactive Rule:** Hover states transition from Violet (Brand) to Magenta
   (Action).

## 🖼️ Component Refactor: The Atmospheric HUD Modal

The Contact Modal was transitioned from a standard "Glassmorphism" pop-up to a high-contrast **Atmospheric HUD** to solve legibility and brand-alignment issues.

### 1. The Transformation (Before vs. After)

| Feature | Original Implementation | Refactored HUD Implementation |
| :--- | :--- | :--- |
| **Surface** | Solid White or Semi-Transparent Glass | `135deg` Gradient (`#002d23` to `#121212`) |
| **Lighting** | Standard Drop Shadow | Triple-Layer Violet Bloom (10px, 25px, 50px) |
| **Border** | Subtle Grey Outline | 2px Sharp Pine Rim with "Backlit" Violet Glow |
| **Exit A11y** | Small 24px Circular Target | **44px (2.75rem)** Floating Hit Area |
| **Geometry** | Hard Edges / Mixed Radii | Unified `0.5rem` radii for all interactive fields |

### 2. The "System Rail" Anchor
To achieve "Mirror-Match" consistency with the global navigation bars, the modal header (H2) now incorporates the **System Rail**:
- **Logic:** A 4px height divider that bridges the brand colors.
- **Visuals:** `linear-gradient(to right, transparent 5%, var(--sys-color-secondary) 15%, var(--sys-color-secondary) 85%, transparent 95%)`.
- **Purpose:** Anchors the cognitive start of the form while mirroring the site's "Horizon Line" found in the header and footer.

### 3. Interaction Affordance
- **Stroke Weights:** Interaction icons (Close-X and Mobile Hamburger) are locked to a **4px** weight to maintain a "Heavy Interactive" feel against atmospheric glows.
- **Tinted HUD Fields:** Input backgrounds use `rgba(255, 255, 255, 0.08)` to reduce visual noise while maintaining the dark-mode aesthetic.