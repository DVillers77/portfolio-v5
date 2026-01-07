# System Design: Tonal Tokens & Typography

## 🌌 Atmospheric Engine (V24 Rig)
The site uses a dynamic "Atmospheric Pulse" powered by CSS `@property` registrations. This allows the background lighting to transition smoothly without performance lag.

| Property | Initial Value | Role |
| :--- | :--- | :--- |
| `--sunX` | `10%` | Horizontal focal point of the radial light |
| `--sunY` | `10%` | Vertical focal point of the radial light |
| `--sunSize` | `85%` | Spread of the illumination |

## 🎨 Tonal Color Palette (Intent-Based)
All hex codes are deprecated in favor of RGB Tonal Tokens to allow for atmospheric layering and transparency control.

| Role | Token Name | RGB Value | Hex Equivalent |
| :--- | :--- | :--- | :--- |
| **Brand Base** | `--sys-pine-rgb` | `1, 98, 75` | #01624b (Pine) |
| **Brand Feel** | `--sys-violet-rgb` | `156, 39, 176` | #9c27b0 (Violet) |
| **Action/Portal** | `--sys-magenta-rgb` | `255, 0, 255` | #ff00ff (Magenta) |

## 🏷️ Brand Architecture: The Syntax Signature
The logo `Dave's` serves as a functional brand anchor.
- **Base Color:** `var(--sys-color-surface)` (White) for high contrast on the Charcoal navbar.
- **Suffix Color:** `var(--sys-color-tertiary)` (Magenta) signaling "Developer/Action."
- **Interaction:** A "Neon Bloom" hover effect utilizing `text-shadow` and `filter: saturate()`.

## 📐 Typography Scale (rem-based)
Base font size is 16px. All values are implemented in `rem`.

- **Display (H1):** `3.5rem` | Line-height: 1.1 | Letter-spacing: -0.02em
- **Headline (H2):** `1.75rem` | Line-height: 1.2
- **Title/Label (H3):** `1.125rem` | Line-height: 1.4
- **Body:** `1rem` | Line-height: 1.6 (Inter)
- **Mobile Quote:** `1.1rem` (Refactored for H2 hierarchy)