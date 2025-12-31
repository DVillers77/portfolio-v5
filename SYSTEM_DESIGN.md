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
